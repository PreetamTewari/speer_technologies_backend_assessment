const express = require('express');
const noteController = require('../controllers/note.controller');
const {authenticateJWT} = require('../utils/helper.util');

const router = express.Router();

router.post('/notes',authenticateJWT, noteController.createNote);
router.get('/notes', authenticateJWT, noteController.getNotes);
router.get('/notes/:id', authenticateJWT, noteController.getNoteById);
router.put('/notes/:id', authenticateJWT, noteController.updateNoteById);
router.delete('/notes/:id', authenticateJWT, noteController.deleteNoteById);
router.post('/share', authenticateJWT, noteController.shareNote);
router.get('/search/', authenticateJWT, noteController.searchNotes);

module.exports = router;