import express, { Request, Response } from 'express';
import { interest_expressed_table, match_table, user_table } from '../database/db_index';

const router = express.Router();

// Express interest
router.post('/', async (req: Request, res: Response) => {
    try {
        const { user_id_expressing_interest, interest_expressed_towards_id } = req.body;
        console.log(req.body);

        const result: any = await interest_expressed_table.createInterestEntry(user_id_expressing_interest, interest_expressed_towards_id);

        // Check for mutual interest and create a match
        const mutual = await interest_expressed_table.checkMutualInterest(user_id_expressing_interest, interest_expressed_towards_id);
        if (mutual) {
            const [userA, userB] = await Promise.all([
                user_table.getUserById(Number(user_id_expressing_interest)),
                user_table.getUserById(Number(interest_expressed_towards_id))
            ]);
            const male_id = userA?.gender === 'male' ? user_id_expressing_interest : interest_expressed_towards_id;
            const female_id = userA?.gender === 'female' ? user_id_expressing_interest : interest_expressed_towards_id;
            await match_table.createMatchEntry(Number(male_id), Number(female_id));
            console.log(`Match created between users ${male_id} and ${female_id}`);
        }

        res.status(201).json({ message: 'Interest expressed', id: result.insertId });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Get all interests expressed by a user
router.get('/by/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const interests = await interest_expressed_table.getExpressorID(Number(id));
        res.json(interests);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get all interests expressed towards a user
router.get('/towards/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const interests = await interest_expressed_table.getAllByExpressedTowardsID(Number(id));
        res.json(interests);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a single interest entry by its id
router.delete('/entry/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result: any = await interest_expressed_table.deleteEntryById(Number(id));

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Interest entry not found' });
        }

        res.json({ message: 'Interest entry deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Delete interest entry
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result: any = await interest_expressed_table.deleteEntryByExpressorID(Number(id));

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Interest entry not found' });
        }

        res.json({ message: 'Interest entry deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
