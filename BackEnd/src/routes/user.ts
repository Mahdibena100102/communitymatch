import express, { Request, Response } from 'express';
import { user_table } from '../database/db_index';
import { isAuth, AuthRequest } from '../util/authentication';
import { sendEmail } from '../util/mailing';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const userRouter = express.Router();

// POST create new user
userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user: any = req.body;
        console.log(req.body);

        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
        user.verification_token = crypto.randomBytes(32).toString('hex');

        const result: any = await user_table.addUser(user);

        const verification_link = `${process.env.FRONTEND_URL}/verify-email?token=${user.verification_token}`;
        await sendEmail(
            user.email,
            'Verify your email',
            `<p>Thank you for registering. Please verify your email address by clicking the link below.</p><p><a href="${verification_link}">${verification_link}</a></p>`
        );

        res.status(201).json({ message: 'User added', id: result.insertId });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// GET verify email
userRouter.get('/verify/:token', async (req: Request, res: Response) => {
    try {
        const { token } = req.params;

        const user = await user_table.getUserByVerificationToken(token as string);

        if (!user) {
            return res.status(404).json({ message: 'Invalid verification token.' });
        }

        await user_table.verifyUserEmail(token as string);
        res.json({ message: 'Email verified successfully.' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get all users
userRouter.get('/all', isAuth, async (req: AuthRequest, res: Response) => {
    try {
        const mosque_id = req.user!.mosque_id;
        const users = await user_table.getAllUsersByMosque(mosque_id);
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get all approved users by gender
userRouter.get('/approved/:gender', isAuth, async (req: AuthRequest, res: Response) => {
    try {
        const { gender } = req.params;
        const mosque_id = req.user!.mosque_id;
        const users = await user_table.getAllApprovedUsersByGenderAndMosque(gender as string, mosque_id);
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get all approved users
userRouter.get('/approved', async (req: Request, res: Response) => {
    try {
        const users = await user_table.getAllApprovedUsers();
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get all pending users (awaiting admin approval)
userRouter.get('/pending', isAuth, async (req: AuthRequest, res: Response) => {
    try {
        const mosque_id = req.user!.mosque_id;
        const users = await user_table.getAllPendingUsersByMosque(mosque_id);
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get user by id
userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await user_table.getUserById(Number(id));

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update user details
userRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: any = req.body;

        const result: any = await user_table.updateUser(Number(id), user);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update user guardian details
userRouter.put('/:id/guardian', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const guardian_details: any = req.body;

        const result: any = await user_table.updateUserGuardian(Number(id), guardian_details);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// PUT approve user (admin)
userRouter.put('/:id/approve', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: any = await user_table.approveChanges(Number(id));

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User approved' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// PUT reject user by admin deletes the user
userRouter.put('/:id/reject', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result: any = await user_table.deleteUser(Number(id));

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User rejected' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE user
userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result: any = await user_table.deleteUser(Number(id));

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default userRouter;
