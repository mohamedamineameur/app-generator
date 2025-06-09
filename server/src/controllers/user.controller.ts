import User from "../models/user.model";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import { userSchema } from "../schemas/user.schemas";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

interface RegistrationRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export function registration(req: { body: RegistrationRequestBody }, res: any): void {
    const { firstName, lastName, email, password, passwordConfirmation } = req.body
    try{
        userSchema(req.body).registerSchema()
    const passwordRegexAlphaNumericUperCaseLowerCaseSpecialChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
        res.status(400).json({ error: "All fields are required." });
        return;
    }
    if (password !== passwordConfirmation) {
        res.status(400).json({ error: "Passwords do not match." });
        return;
    }
    if (!passwordRegexAlphaNumericUperCaseLowerCaseSpecialChar.test(password)) {
        res.status(400).json({
            error: "Password must be at least 12 characters long, contain uppercase and lowercase letters, numbers, and special characters."
        });
        return;
    }
    User.create({
        firstName,
        lastName,
        email,
        password, // Note: Password should be hashed before saving in production
    })
        .then((user) => {
            res.status(201).json({
                message: "User registered successfully.",
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
            });
        }
        )
        .catch((error) => {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "An error occurred while registering the user." });
        }
        );
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(400).json({ error: (error instanceof Error) ? error.message : "An unknown error occurred." });
    }
}

export function login(req: { body: { email: string; password: string } }, res: any): void {
    // wrap the token inside a cookie
    const { email, password } = req.body;
    try {
        userSchema(req.body).loginSchema();
   
    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required." });
        return;
    }

    User.findOne({ where: { email } })
        .then((user) => {
            if (!user) {
                res.status(401).json({ error: "Invalid email or password." });
                return;
            }
            // Note: Password should be hashed and compared in production
            if (user.password !== password) {
                res.status(401).json({ error: "Invalid email or password." });
                return;
            }
            if (!JWT_SECRET) {
                res.status(500).json({ error: "JWT secret is not configured." });
                return;
            }
            const token = jsonwebtoken.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                sameSite: "Strict", // Adjust as necessary
                maxAge: 3600000*24, // 1 day in milliseconds
            });
            res.status(200).json({
                message: "Login successful.",
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                }}
            );
        }
        )
        .catch((error) => {
            console.error("Error logging in user:", error);
            res.status(500).json({ error: "An error occurred while logging in the user." });
        }
        );
    } catch (error) {
        console.error("Error in login:", error);
        res.status(400).json({ error: (error instanceof Error) ? error.message : "An unknown error occurred." });
        return;
    }
}

export function me (req: any, res: any): void {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: "Unauthorized. No token provided." });
        return;
    }
    if (!JWT_SECRET) {
        res.status(500).json({ error: "JWT secret is not configured." });
        return;
    }
    jsonwebtoken.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            res.status(401).json({ error: "Unauthorized. Invalid token." });
            return;
        }
        User.findByPk(decoded.id)
            .then((user) => {
                if (!user) {
                    res.status(404).json({ error: "User not found." });
                    return;
                }
                res.status(200).json({
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                    },
                });
            }
            )
            .catch((error) => {
                console.error("Error fetching user:", error);
                res.status(500).json({ error: "An error occurred while fetching the user." });
            }
            );
    });
}

export function logout(req: any, res: any): void {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful." });
}

export function checkAuth(req: any, res: any): void {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: "Unauthorized. No token provided." });
        return;
    }
    if (!JWT_SECRET) {
        res.status(500).json({ error: "JWT secret is not configured." });
        return;
    }
    jsonwebtoken.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            res.status(401).json({ error: "Unauthorized. Invalid token." });
            return;
        }
        res.status(200).json({ message: "Authenticated successfully.", userId: decoded.id });
    });
}
export function refreshToken(req: any, res: any): void {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: "Unauthorized. No token provided." });
        return;
    }
    if (!JWT_SECRET) {
        res.status(500).json({ error: "JWT secret is not configured." });
        return;
    }
    jsonwebtoken.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            res.status(401).json({ error: "Unauthorized. Invalid token." });
            return;
        }
        // Generate a new token
        const newToken = jsonwebtoken.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "Strict", // Adjust as necessary
            maxAge: 3600000*24, // 1 day in milliseconds
        });
        res.status(200).json({ message: "Token refreshed successfully." });
    }
    );
}
export function deleteUser(req: any, res: any): void {
    // Ensure the user is authenticated
    // Ensure the user is given the right password before deletion
    const { password } = req.body;
    if (!password) {
        res.status(400).json({ error: "Password is required for deletion." });
        return;
    }
    // Verify the token
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: "Unauthorized. No token provided." });
        return;
    }
    if (!JWT_SECRET) {
        res.status(500).json({ error : "JWT secret is not configured." });
        return;
    }
    jsonwebtoken.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            res.status(401).json({ error: "Unauthorized. Invalid token." });
            return;
        }
        const userId = decoded.id;
        User.findByPk(userId)
            .then((user) => {
                if (!user) {
                    res.status(404).json({ error: "User not found." });
                    return;
                }
                // Check if the password matches
                if (user.password !== password) {
                    res.status(401).json({ error: "Invalid password." });
                    return;
                }
                // Delete the user
                return user.destroy();
            })
            .then(() => {
                res.clearCookie("token");
                res.status(200).json({ message: "User deleted successfully." });
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
                res.status(500).json({ error: "An error occurred while deleting the user." });
            });
    });
}
export function updateUserPartialyOrCompletely(req: any, res: any): void {
    const { firstName, lastName, email, oldPassword, newPassword, passwordConfirmation } = req.body;
    try {
        userSchema(req.body).updatePartialyOrCompletlySchema();
    
    // Ensure the user is authenticated
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: "Unauthorized. No token provided." });
        return;
    }
    if (!JWT_SECRET) {
        res.status(500).json({ error:" JWT secret is not configured." });
        return;
    }
    jsonwebtoken.verify(token, JWT_SECRET, (err: any, decoded: any) => {    
        if (err) {
            res.status(401).json({ error: "Unauthorized. Invalid token." });
            return;
        }
        const userId = decoded.id;
        User.findByPk(userId)
            .then((user) => {
                if (!user) {
                    res.status(404).json({ error: "User not found." });
                    return;
                }
                // Check if the old password matches if a new password is provided
                if (newPassword && user.password !== oldPassword) {
                    res.status(401).json({ error: "Invalid old password." });
                    return;
                }
                // Validate new password and confirmation
                if (newPassword && newPassword !== passwordConfirmation) {
                    res.status(400).json({ error: "New passwords do not match." });
                    return;
                }
                // Update user fields
                user.firstName = firstName || user.firstName;
                user.lastName = lastName || user.lastName;
                user.email = email || user.email;
                if (newPassword) {
                    user.password = newPassword; // Note: Password should be hashed before saving in production
                }
                return user.save();
            })
            .then((updatedUser) => {
                res.status(200).json({
                    message: "User updated successfully.",
                    user: {
                        id: updatedUser?.id,
                        firstName: updatedUser?.firstName,
                        lastName: updatedUser?.lastName,
                        email: updatedUser?.email,
                    },
                });
            })
            .catch((error) => {
                console.error("Error updating user:", error);
                res.status(500).json({ error: "An error occurred while updating the user." });
            });
    }
    );
}
    catch (error) {
        console.error("Error in updateUserPartialyOrCompletely:", error);
        res.status(400).json({ error: (error instanceof Error) ? error.message : "An unknown error occurred." });
        return;
    }
}

export function deleteUserById(req: any, res: any): void {
    const userId = req.params.id;
    try {
        userSchema(req.body).updateByIdSchema();
    
    // Ensure the user is authenticated
    if (!userId) {
        res.status(400).json({ error: "User ID is required." });
        return;
    }
    User.findByPk(userId)
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: "User not found." });
                return;
            }
            return user.destroy();
        })
        .then(() => {
            res.status(200).json({ message: "User deleted successfully." });
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: "An error occurred while deleting the user." });
        });
    }
    catch (error) {
        console.error("Error in deleteUserById:", error);
        res.status(400).json({ error: (error instanceof Error) ? error.message : "An unknown error occurred." });
        return;
    }
}