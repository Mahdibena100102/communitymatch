import express, { Request, Response } from 'express';
import { isAuth, AuthRequest } from '../util/authentication';
import { match_table } from '../database/db_index';

const router = express.Router();

// Create match
router.post('/', async (req: Request, res: Response) => {
    try {
        const { male_id, female_id } = req.body;
        console.log(req.body);

        const result: any = await match_table.createMatchEntry(male_id, female_id);
        res.status(201).json({ message: 'Match created', id: result.insertId });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Get all matches
router.get('/all', async (req: Request, res: Response) => {
    try {
        const matches = await match_table.getAllMatches();
        res.json(matches);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get all matches from a mosque
router.get('/mosque', isAuth, async (req: AuthRequest, res: Response) => {
    try {
        const mosque_id = req.user!.mosque_id;
        const matches = await match_table.getAllMatchesByMosque(mosque_id);
        res.json(matches);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
})

// Get matches for a user
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const matches = await match_table.getMatchesByUser(Number(id));
        res.json(matches);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Resolve match (admin)
router.put('/:id/resolve', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result: any = await match_table.resolveMatch(Number(id));

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Match not found' });
        }

        res.json({ message: 'Match resolved' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
