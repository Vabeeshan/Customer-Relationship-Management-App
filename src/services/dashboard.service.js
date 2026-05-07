const db = require("../configs/db");

const DashboardService = {
    getStats: async () => {
        const [rows] = await db.query(`
      SELECT
        COUNT(*) AS totalLeads,

        SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) AS newLeads,
        SUM(CASE WHEN status = 'Qualified' THEN 1 ELSE 0 END) AS qualifiedLeads,
        SUM(CASE WHEN status = 'Won' THEN 1 ELSE 0 END) AS wonLeads,
        SUM(CASE WHEN status = 'Lost' THEN 1 ELSE 0 END) AS lostLeads,

        SUM(estimatedDealValue) AS totalDealValue,

        SUM(CASE 
              WHEN status = 'Won' 
              THEN estimatedDealValue 
              ELSE 0 
            END) AS wonDealValue

      FROM leads
    `);

        return rows[0];
    },
};

module.exports = DashboardService;