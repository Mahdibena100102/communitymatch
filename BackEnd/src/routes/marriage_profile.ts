import express, { Request, Response } from 'express';
import { marriage_profile_table } from '../database/db_index'

const router = express.Router();

// Add marriage profile
router.post('/', async (req: Request, res: Response) => {
    try {
        const marriage_profile: any = req.body;
        console.log(req.body);

        const result: any = await marriage_profile_table.createMarriageProfile(marriage_profile);
        res.status(201).json({ message: 'Marriage profile created added', id: result.insertId });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Get all marriage profiles
router.get('/', async (req: Request, res: Response) => {
    try {
        const marriage_profiles = await marriage_profile_table.getAllMarriageProfiles();
        res.json(marriage_profiles);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Get marriage profile by user id
router.get('/user/:user_id', async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        const marriage_profile = await marriage_profile_table.getMarriageProfileByUser(Number(user_id));

        if (!marriage_profile) {
            return res.status(404).json({ message: 'Marriage profile not found' });
        }

        res.json(marriage_profile);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Update marriage profile
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const marriage_profile: any = req.body;

        const result: any = await marriage_profile_table.updateMarriageProfile(Number(id), marriage_profile);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Marriage not found' });
        }

        res.json({ message: 'Marriage profile updated' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});


export default router;