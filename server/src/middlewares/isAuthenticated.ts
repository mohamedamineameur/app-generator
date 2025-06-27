import User from '../models/user.model'
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();
// secret key for JWT
const secretKey = process.env.JWT_SECRET;

// Middleware to check if the user is authenticated from the JWT token wrapped in cookie
export async function isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new Error('JWT_SECRET is not defined');
      }
  
      const token = req.cookies.token;
      if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return; // ✅ ne retourne pas la Response elle-même
      }
  
      const decoded = jsonwebtoken.verify(token, secretKey) as { id: string };
      const user = await User.findByPk(decoded.id);
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      (req as any).user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: error instanceof Error ? error.message : 'Invalid token' });
      return;
    }
  }
  
  export async function me(req: Request, res: Response): Promise<void> {
    try {
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new Error('JWT_SECRET is not defined');
      }
  
      const token = req.cookies.token;
      if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return; // ✅ ne retourne pas la Response elle-même
      }
  
      const decoded = jsonwebtoken.verify(token, secretKey) as { id: string };
      const user = await User.findByPk(decoded.id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      res.status(401).json({ error: error instanceof Error ? error.message : 'Invalid token' });
      return;
    }
  }