import pool from './pool';

// Get all Mosques
async function getAllMosques(): Promise<any> {
    const query = `SELECT * FROM mosque`;
    const [rows]: any = await pool.query(query);
    return rows;
}

// Get a mosque
async function getMosque(id: number): Promise<any> {
    const query = `SELECT * FROM mosque WHERE id = ?`;
    const [rows]: any = await pool.query(query, [id]);
    return rows[0];
}

export {
    getAllMosques,
    getMosque,
};
