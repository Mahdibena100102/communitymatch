import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
    id: number;
    email: string;
    name: string;
    role: 'user' | 'admin';
    mosque_id: number;
}

interface AuthRequest extends Request {
    user?: JwtPayload;
}

export type { AuthRequest };

const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    console.log("Authenticating...");

    if (!token) {
        return res.status(401).json({ error: 'Access forbidden: No token provided' });
    }

    console.log("Passed token check.");

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ error: 'Access forbidden: Invalid token' });
    }
};

export { isAuth };