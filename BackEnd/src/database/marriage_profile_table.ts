import pool from './pool';

// Create marriage profile
async function createMarriageProfile(marriage_profile: any): Promise<any> {
    console.log(marriage_profile);
    const query = `INSERT INTO marriage_profile (user_id, profession, height, weight, ethnicity, education, living_arrangment, about_me, looking_for) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [
        marriage_profile.user_id,
        marriage_profile.profession,
        marriage_profile.height,
        marriage_profile.weight,
        marriage_profile.ethnicity,
        marriage_profile.education,
        marriage_profile.living_arrangment,
        marriage_profile.about_me,
        marriage_profile.looking_for
    ]);
    console.log(result);
    return result;
}

// Get all marriage profiles
async function getAllMarriageProfiles(): Promise<any> {
    const query = `SELECT * FROM marriage_profile`;
    const [rows]: any = await pool.query(query);
    return rows;
}

// Get a marriage profile by user
async function getMarriageProfileByUser(user_id: number): Promise<any> {
    const query = `SELECT * FROM marriage_profile WHERE user_id = ?`;
    const [rows]: any = await pool.query(query, [user_id]);
    return rows[0];
}

// update marriage profile
async function updateMarriageProfile(id: number, marriage_profile: any): Promise<any> {
    const query = `UPDATE marriage_profile SET profession = ?, height = ?, weight = ?, ethnicity = ?, education = ?, living_arrangment = ?, about_me = ?, looking_for = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [
        marriage_profile.profession,
        marriage_profile.height,
        marriage_profile.weight,
        marriage_profile.ethnicity,
        marriage_profile.education,
        marriage_profile.living_arrangment,
        marriage_profile.about_me,
        marriage_profile.looking_for,
        id
    ]);
    return result;
}


export {
    createMarriageProfile,
    getAllMarriageProfiles,
    getMarriageProfileByUser,
    updateMarriageProfile,
};
