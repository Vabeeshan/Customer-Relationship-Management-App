const DashboardService = require("../services/dashboard.service");

exports.getDashboard = async (req, res) => {
    try {
        const data = await DashboardService.getStats();
        res.json(data);
    } catch (err) {
        console.error("Dashboard error:", err.message);
        res.status(500).json({ message: "Failed to load dashboard" });
    }
};