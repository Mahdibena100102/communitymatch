import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { user_table, admin_user_table } from '../database/db_index';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const non_admin = await user_table.getUserByEmail(email);
        let user: any = null;
        let role: 'user' | 'admin' | null = null;

        if (non_admin) {
            const isMatch = await bcrypt.compare(password, non_admin.password);
            if (!isMatch) return res.status(401).json({ message: 'Incorrect password.' });
            if (!non_admin.email_verified) return res.status(401).json({ message: 'Email not yet verified.' });

            user = non_admin;
            role = 'user';
        } else {
            const admin = await admin_user_table.getAdminByEmail(email);
            if (!admin) return res.status(404).json({ message: 'No account exists with this email.' });

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(401).json({ message: 'Incorrect password.' });

            user = admin;
            role = 'admin';
        }

        const secret = process.env.JWT_SECRET as string;

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.first_name || user.name || '',
                role: role,
                mosque_id: user.mosque_id,
            },
            secret,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        if (role === 'user') {
            return res.json({
                message: 'Login successful',
                user_first_name: user.first_name,
                user_id: user.id,
                gender: user.gender,
                role,
            });
        } else {
            return res.json({ message: 'Login successful', admin_id: user.id, role });
        }
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export default router;