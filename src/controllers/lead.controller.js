const LeadService = require("../services/lead.service");

exports.getAllLeads = async (req, res) => {
    const data = await LeadService.getAll();
    res.json(data);
};

exports.getLeadById = async (req, res) => {
    const data = await LeadService.getById(req.params.id);
    res.json(data);
};

exports.createLead = async (req, res) => {
    const result = await LeadService.create(req.body);
    res.json({ message: "Lead created", result });
};

exports.updateLead = async (req, res) => {
    const result = await LeadService.update(req.params.id, req.body);
    res.json({ message: "Lead updated", result });
};

exports.deleteLead = async (req, res) => {
    const result = await LeadService.delete(req.params.id);
    res.json({ message: "Lead deleted", result });
};