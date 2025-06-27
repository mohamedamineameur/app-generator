import User from "../models/user.model";
import { userSchema } from "../schemas/user.schema";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { validateSchema } from "../utils/validateSchema";
import bcrypt from "bcrypt";

dotenv.config();

// secret key for JWT
const secretKey = process.env.JWT_SECRET;


// login function by username and password
export async function login(req: any, res: any) {
  try {
    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
      }
    const schema = userSchema().login();
    validateSchema(schema, req.body);

    // Find the user by username
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a jwt in cookie
    const token = jsonwebtoken.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 3600000 // 1 hour
    });
    res.status(200).json({ message: "Login successful", user: { id: user.id, username: user.username } });
    
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}

export async function logout(req: any, res: any) {
  try {
    // Clear the cookie by setting its maxAge to 0
    res.cookie("token", "", { maxAge: 0, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}