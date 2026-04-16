import pool from './pool';

// Create report
async function createReport(report: any): Promise<any> {
    const query = `INSERT INTO report (reporter_id, reported_id, reason) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(query, [
        report.reporter_id,
        report.reported_id,
        report.reason
    ]);
    console.log(result);
    return result;
}

// Get all reports
async function getAllReports(): Promise<any> {
    const query = `SELECT * FROM report`;
    const [rows]: any = await pool.query(query);
    return rows;
}

// Delete report
async function deleteReport(id: number): Promise<any> {
    const query = `DELETE FROM report WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result;
}

export {
    createReport,
    getAllReports,
    deleteReport
};
