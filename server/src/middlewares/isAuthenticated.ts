import User from '../models/user.model'
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();
// secret key for JWT
const secretKey = process.env.JWT_SECRET;

// Middleware to check if the user is authenticated from the JWT token wrapped in cookie
export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    // Get the token from the cookie
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the token
    const decoded = jsonwebtoken.verify(token, secretKey) as { id: string };
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    next(); // User is authenticated, proceed to the next middleware or route handler
    
   
  } catch (error) {
    res.status(401).json({ error: error instanceof Error ? error.message : 'Invalid token' });
  }
}