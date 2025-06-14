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
    const schema = userSchema(req.body).login();
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

    // Generate a JWT token
    const token = jsonwebtoken.sign({ id: user.id }, secretKey, { expiresIn: "1h" });

    // Respond with the user data and token
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}