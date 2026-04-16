import pool from './pool';

async function createPassEntry(user_id_passing: number, user_id_passed: number): Promise<any> {
    const query = `INSERT INTO pass (user_id_passing, user_id_passed) VALUES (?, ?)`;
    const [result] = await pool.execute(query, [user_id_passing, user_id_passed]);
    return result;
}

async function getPassesByUser(user_id_passing: number): Promise<any> {
    const query = `SELECT * FROM pass WHERE user_id_passing = ?`;
    const [rows]: any = await pool.query(query, [user_id_passing]);
    return rows;
}

export { createPassEntry, getPassesByUser };
