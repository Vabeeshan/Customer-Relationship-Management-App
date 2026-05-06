const NoteService = require("../services/note.service");

exports.createNote = async (req, res) => {
    const result = await NoteService.create(req.body);

    res.json({
        message: "Note created",
        result,
    });
};

exports.getNotesByLead = async (req, res) => {
    const data = await NoteService.getByLeadId(req.params.leadId);

    res.json(data);
};