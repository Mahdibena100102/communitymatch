import express, { Request, Response } from 'express';
import { pass_table } from '../database/db_index';

const router = express.Router();

// Record a pass
router.post('/', async (req: Request, res: Response) => {
    try {
        const { user_id_passing, user_id_passed } = req.body;
        const result: any = await pass_table.createPassEntry(user_id_passing, user_id_passed);
        res.status(201).json({ message: 'Pass recorded', id: result.insertId });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get all passes by a user
router.get('/by/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const passes = await pass_table.getPassesByUser(Number(id));
        res.json(passes);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
