const Note = require('../models/note.model');

exports.createNote = async (req, res) => {
    const {title, body} = req.body;
    const newNote = new Note({title, body, owner: req.user.username});
    try{
        await newNote.save();
        res.status(201).json({
            message: 'Note created successfully',
            note: newNote
        });
    }catch(err){
        res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
}

exports.getNotes = async (req, res) => {
    try{
        const notes = await Note.find({owner: req.user.username});
        res.status(200).json({
            message: 'Notes fetched successfully',
            notes
        });
    } catch(err){
        res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
}

exports.getNoteById = async (req, res) => {
    const {id} = req.params;
    try{
        const note = await Note.findOne({_id: id, owner: req.user.username});
        res.status(200).json({
            message: 'Note fetched successfully',
            note
        });
    }catch (err){
        res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
}

exports.updateNoteById = async (req, res) => {
    const {id} = req.params;
    const {title, body} = req.body;
    try{
        const updatedNote = await Note.findByIdAndUpdate(id, {title, body}, {new: true});
        if(!updatedNote){
            res.status(404).json({
                message: 'Note not found'
            });
        }
        res.status(200).json({
            message: 'Note updated successfully',
            note: updatedNote
        });
    }catch(err){
        res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
}

exports.deleteNoteById = async (req, res) => {
    const {id} = req.params;
    try{
        const deletedNote = await Note.findByIdAndDelete(id);
        if(!deletedNote){
            res.status(404).json({
                message: 'Note not found'
            });
        }
        res.status(200).json({
            message: 'Note deleted successfully',
            note: deletedNote
        });
    }catch(err){
        res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
}

exports.shareNote = async (req, res) => {
    const {id, recipientUsername} = req.body;
    try{
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({message: 'Note not found'});
        }
        note.sharedWith.push(recipientUsername);
        await note.save();
        res.status(200).json({message: 'Note shared successfully'});
    }catch(err){
        res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
}

exports.searchNotes = async (req, res) => {
    const {q} = req.query;
    // console.log(q);
    try {
        const result = await Note.find({$text: {$search: q}, owner: req.user.username});
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
}