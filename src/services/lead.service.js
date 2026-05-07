const db = require("../configs/db");

// GET ALL
exports.getAll = async () => {
    const [rows] = await db.query("SELECT * FROM leads");
    return rows;
};

// GET BY ID
exports.getById = async (id) => {
    const [rows] = await db.query("SELECT * FROM leads WHERE id=?", [id]);
    return rows[0];
};

// CREATE
exports.create = async (data) => {
    const {
        leadName,
        companyName,
        email,
        phone,
        leadSource,
        assignedSalesperson,
        status,
        estimatedDealValue,
    } = data;

    const [result] = await db.query(
        `INSERT INTO leads 
     (leadName, companyName, email, phone, leadSource, assignedSalesperson, status, estimatedDealValue)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            leadName,
            companyName,
            email,
            phone,
            leadSource,
            assignedSalesperson,
            status,
            estimatedDealValue,
        ]
    );


    return result;
};

// UPDATE
exports.update = async (id, data) => {
    const [result] = await db.query(
        "UPDATE leads SET ? WHERE id=?",
        [data, id]
    );
    return result;
};

// DELETE
exports.delete = async (id) => {
    const [result] = await db.query(
        "DELETE FROM leads WHERE id=?",
        [id]
    );
    return result;
};