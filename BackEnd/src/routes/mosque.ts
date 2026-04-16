import express, { Request, Response } from 'express';
import { mosque_table } from '../database/db_index'

const router = express.Router();

// Get mosque
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const mosque = await mosque_table.getMosque(Number(id));

        if (!mosque) {
            return res.status(404).json({ message: 'Mosque not found' });
        }

        res.json(mosque);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get all mosques
router.get('/', async (req: Request, res: Response) => {
    try {
        const mosques = await mosque_table.getAllMosques();
        res.json(mosques);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
