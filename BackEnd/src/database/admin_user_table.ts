import pool from './pool'

// Get an admin by email
async function getAdminByEmail(email: string): Promise<any> {
    const query = `SELECT * FROM admin_user WHERE email = ?`;
    const [rows]: any = await pool.query(query, [email]);
    return rows[0];
}

export {
    getAdminByEmail,
};
