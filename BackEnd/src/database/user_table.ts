import pool from './pool';

// Add user
async function addUser(user: any): Promise<any> {
    console.log(user);
    const query = `INSERT INTO user (first_name, surname, email, password, phone_number, gender, date_of_birth, mosque_id, verification_token, email_verified, pending_admin_verification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, false, true)`;
    const [result] = await pool.execute(query, [
        user.first_name,
        user.surname,
        user.email,
        user.password,
        user.phone_number,
        user.gender,
        user.date_of_birth,
        user.mosque_id,
        user.verification_token
    ]);
    console.log(result);
    return result;
}

// Get all users by mosque
async function getAllUsersByMosque(mosque_id: number): Promise<any> {
    const query = `SELECT * FROM user WHERE mosque_id = ?`;
    const [rows]: any = await pool.query(query, [mosque_id]);
    return rows;
}

// Get all approved users
async function getAllApprovedUsers(): Promise<any> {
    const query = `SELECT * FROM user WHERE pending_admin_verification = false`;
    const [rows]: any = await pool.query(query);
    return rows;
}

// Get all pending users by mosque
async function getAllPendingUsersByMosque(mosque_id: number): Promise<any> {
    const query = `SELECT * FROM user WHERE pending_admin_verification = true AND mosque_id = ?`;
    const [rows]: any = await pool.query(query, [mosque_id]);
    return rows;
}

// Get all approved users by gender and mosque
async function getAllApprovedUsersByGenderAndMosque(gender: string, mosque_id: number): Promise<any> {
    const query = `SELECT * FROM user WHERE pending_admin_verification = false AND gender = ? AND mosque_id = ?`;
    const [rows]: any = await pool.query(query, [gender, mosque_id]);
    return rows;
}

// Get a user
async function getUserById(id: number): Promise<any> {
    const query = `SELECT * FROM user WHERE id = ?`;
    const [rows]: any = await pool.query(query, [id]);
    return rows[0];
}

// get user by email
async function getUserByEmail(email: string): Promise<any> {
    const query = `SELECT * FROM user WHERE email = ?`;
    const [rows]: any = await pool.query(query, [email]);
    return rows[0];
}

async function getUserByVerificationToken(verification_token: string): Promise<any> {
    const query = `SELECT * FROM user WHERE verification_token = ?`;
    const [rows]: any = await pool.query(query, [verification_token]);
    return rows[0];
}

async function verifyUserEmail(verification_token: string): Promise<any> {
    try {
        const query = `UPDATE user SET email_verified = true WHERE verification_token = ?`;
        console.log('Email Verified');
        const [result] = await pool.execute(query, [
            verification_token
        ]);
        return result;
    } catch (err) {
        console.log(err);
    }
}

// Modify user
async function updateUser(id: number, user: any): Promise<any> {
    try {
        const query = `UPDATE user SET first_name = ?, surname = ?, phone_number = ?, mosque_id = ? WHERE id = ?`;
        console.log(id, user);
        const [result] = await pool.execute(query, [
            user.first_name,
            user.surname,
            user.phone_number,
            user.mosque_id,
            id,
        ]);
        return result;
    } catch (err) {
        console.log(err);
    }
}
async function updateUserGuardian(id: number, guardian: any): Promise<any> {
    try {
        const query = `UPDATE user SET guardian_first_name = ?, guardian_surname = ?, guardian_phone_number = ?, guardian_email = ? WHERE id = ?`;
        console.log(id, guardian);
        const [result] = await pool.execute(query, [
            guardian.first_name,
            guardian.surname,
            guardian.phone_number,
            guardian.email,
            id,
        ]);
        return result;
    } catch (err) {
        console.log(err);
    }
}


async function approveChanges(id: number): Promise<any> {
    const query = `UPDATE user SET pending_admin_verification = false WHERE id = ${id}`;
    const [result] = await pool.execute(query);
    return result;
}

// delete user
async function deleteUser(id: number): Promise<any> {
    const query = `DELETE FROM user WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result;
}

export {
    addUser,
    getAllUsersByMosque,
    getAllApprovedUsers,
    getAllPendingUsersByMosque,
    getAllApprovedUsersByGenderAndMosque,
    getUserById,
    getUserByEmail,
    getUserByVerificationToken,
    verifyUserEmail,
    updateUser,
    updateUserGuardian,
    approveChanges,
    deleteUser
};
