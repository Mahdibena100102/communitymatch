import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });

    res.json({ message: 'Logged out' });
});

export default router;