const db = require("../configs/db");

// CREATE NOTE
exports.create = async (data) => {
    const { leadId, noteContent, createdBy } = data;

    const [result] = await db.query(
        `INSERT INTO notes (leadId, noteContent, createdBy)
         VALUES (?, ?, ?)`,
        [leadId, noteContent, createdBy]
    );

    return result;
};

// GET NOTES BY LEAD ID
exports.getByLeadId = async (leadId) => {
    const [rows] = await db.query(
        `SELECT * FROM notes WHERE leadId=? ORDER BY createdAt DESC`,
        [leadId]
    );

    return rows;
};