import User from "../models/user.model";
import { userSchema } from "../schemas/user.schema";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { validateSchema } from "../utils/validateSchema";
import bcrypt from "bcrypt";

dotenv.config();

const secretKey = process.env.JWT_SECRET;
const isProduction = process.env.NODE_ENV === "production";

// 🔐 login function by username and password
export async function login(req: any, res: any) {
  try {
    if (!secretKey) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const schema = userSchema().login();
    validateSchema(schema, req.body);

    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jsonwebtoken.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    // ✅ Cookie config compatible local & production
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax", // 💡 Important pour CORS
      secure: isProduction,                   // ✅ true uniquement en HTTPS
      maxAge: 3600000                         // 1h
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, username: user.username }
    });

  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "An unknown error occurred"
    });
  }
}

export async function logout(req: any, res: any) {
  try {
    // ❗ Même fix à appliquer ici
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "An unknown error occurred"
    });
  }
}
