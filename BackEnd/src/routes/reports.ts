import express, { Request, Response } from 'express';
import { report_table } from '../database/db_index';

const router = express.Router();

// Create report
router.post('/', async (req: Request, res: Response) => {
    try {
        const report: any = req.body;
        console.log(req.body);

        const result: any = await report_table.createReport(report);
        res.status(201).json({ message: 'Report created', id: result.insertId });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Get all reports
router.get('/', async (req: Request, res: Response) => {
    try {
        const reports = await report_table.getAllReports();
        res.json(reports);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Delete report
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result: any = await report_table.deleteReport(Number(id));

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.json({ message: 'Report deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
