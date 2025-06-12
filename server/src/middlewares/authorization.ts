import Role from "../models/role.model";
import Permission from "../models/permission.model";
import Route from "../models/route.model";
import User from "../models/user.model";
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

dotenv.config();
// Middleware to check user authorization
const JWT_SECRET = process.env.JWT_SECRET;

interface CustomRequest extends Request {
    body: Record<string, any>;
}

export async function isAdmin(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = await jsonwebtoken.verify(token, JWT_SECRET as string);
            const userId = (decoded as { id: string }).id;
            const user = await User.findByPk(userId);
            if (user) {
                const role = await Role.findByPk(user.roleId);
                if (role && role.name === 'admin') {
                    next();
                } else {
                    res.status(403).json({ message: 'Access forbidden' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Token verification error:', error);
            res.status(401).json({ message: 'Invalid or expired token' });
        }
    } else {
        res.status(401).json({ message: 'Token missing' });
    }
    return;
}

export async function isAuthorized(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = await jsonwebtoken.verify(token, JWT_SECRET as string);
            const userId = (decoded as { id: string }).id;
            const user = await User.findByPk(userId);
            const role = await Role.findByPk(user?.roleId);

            const permissions = await Permission.findAll({
                where: {
                    roleId: role?.id
                }
            });

            const route = await Route.findOne({
                where: {
                    id: permissions.map(p => p.routeId),
                    name: req.originalUrl,
                    description: req.method
                }
            });

            if (route) {
                next(); // Authorization successful, proceed to the next handler
            } else {
                res.status(403).json({ message: 'Access forbidden' }); // No authorization for this route
            }
        } catch (error) {
            console.error('Token verification error:', error);
            res.status(401).json({ message: 'Invalid or expired token' }); // Invalid or expired token
        }
    }
}
