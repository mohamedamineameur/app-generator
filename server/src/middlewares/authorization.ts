import Role from "../models/role.model";
import Permission from "../models/permission.model";
import Route from "../models/route.model";
import User from "../models/user.model";
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";



dotenv.config();
// Middleware pour vérifier l'autorisation de l'utilisateur
const JWT_SECRET = process.env.JWT_SECRET 

interface CustomRequest extends Request {
    body: Record<string, any>; 
}

export async function isAuthorized(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = await jsonwebtoken.verify(token, JWT_SECRET as string);
            const userId = (decoded as { id: string }).id;
            const user = await User.findByPk(userId);
            const role= await Role.findByPk(user?.roleId);
           
            const permissions = await Permission.findAll({
                where: {
                    roleId: role?.id
                }}
            );
           
            const route = await Route.findOne({
                where: { 
                    id: permissions.map(p => p.routeId), // c'est `id` et non `pemissionId`
                    name: req.originalUrl,
                    description: req.method 
                }
            });
            
            if (route) {
                next(); // Autorisation réussie, passe au handler suivant
            } else {
                res.status(403).json({ message: 'Accès interdit' }); // Pas d'autorisation pour cette route
            }
        } catch (error) {
            console.error('Erreur de vérification du token:', error);
            res.status(401).json({ message: 'Token invalide ou expiré' }); // Token invalide ou expiré
        }
    }
}