import pool from './pool';

// Create matches entry
async function createMatchEntry(male_id: number, female_id: number): Promise<any> {
    const query = `INSERT INTO matches (male_id, female_id) VALUES (?, ?)`;
    const [result] = await pool.execute(query, [
        male_id,
        female_id
    ]);
    console.log(result);
    return result;
}

// Get all matches for a user
async function getMatchesByUser(user_id: number): Promise<any> {
    const query = `SELECT * FROM matches WHERE male_id = ? OR female_id = ?`;
    const [rows]: any = await pool.query(query, [user_id, user_id]);
    return rows;
}

// Get all unresolved matches
async function getAllMatches(): Promise<any> {
    const query = `SELECT * FROM matches WHERE resolved = false`;
    const [rows]: any = await pool.query(query);
    return rows;
}

// Mark match as resolved
async function resolveMatch(id: number): Promise<any> {
    const query = `UPDATE matches SET resolved = true WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result;
}

export {
    createMatchEntry,
    getMatchesByUser,
    getAllMatches,
    resolveMatch,
};
