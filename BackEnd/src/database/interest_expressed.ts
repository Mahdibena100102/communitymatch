import pool from './pool';

// Create interest entry
async function createInterestEntry(user_id_expressing_interest: number, interest_expressed_towards_id: number): Promise<any> {
    const query = `INSERT INTO interest_expressed (user_id_expressing_interest, interest_expressed_towards_id) VALUES (?, ?)`;
    const [result] = await pool.execute(query, [
        user_id_expressing_interest,
        interest_expressed_towards_id
    ]);
    console.log(result);
    return result;
}

// Get all users a specific user is interested in
async function getExpressorID(user_id_expressing_interest: number): Promise<any> {
    const query = `SELECT * FROM interest_expressed WHERE user_id_expressing_interest = ?`;
    const [rows]: any = await pool.query(query, [user_id_expressing_interest]);
    return rows;
}

// Get all user interested in a specific user
async function getAllByExpressedTowardsID(interest_expressed_towards_id: number): Promise<any> {
    const query = `SELECT * FROM interest_expressed WHERE interest_expressed_towards_id = ?`;
    const [rows]: any = await pool.query(query, [interest_expressed_towards_id]);
    return rows[0];
}

// Check if B has already expressed interest towards A
async function checkMutualInterest(user_a: number, user_b: number): Promise<boolean> {
    const query = `SELECT id FROM interest_expressed WHERE user_id_expressing_interest = ? AND interest_expressed_towards_id = ? LIMIT 1`;
    const [rows]: any = await pool.query(query, [user_b, user_a]);
    return rows.length > 0;
}

// Delete by expressor user id
async function deleteEntryByExpressorID(user_id_expressing_interest: number): Promise<any> {
    const query = `DELETE FROM interest_expressed WHERE user_id_expressing_interest = ?`;
    const [result] = await pool.execute(query, [user_id_expressing_interest]);
    return result;
}

// Delete single interest entry by its id
async function deleteEntryById(id: number): Promise<any> {
    const query = `DELETE FROM interest_expressed WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result;
}

export {
    createInterestEntry,
    getExpressorID,
    getAllByExpressedTowardsID,
    checkMutualInterest,
    deleteEntryByExpressorID,
    deleteEntryById
};
