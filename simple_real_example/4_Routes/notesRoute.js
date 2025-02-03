const express = require('express');
const router = express.Router();
const notesLogic = require('../3_controllers/notes-logic');// to can use functions from controllers
//* here you write just routes and use logic from controllers folder 
//sample to know what happened 
router.get('/',notesLogic.getAll);

// real example ============================
router.get('/notes', notesLogic.getAllNotes);
router.get('/notes/:id', notesLogic.getNoteById);
// or you can make this 
router
.post('/notes', notesLogic.createNote)
.put('/notes/:id', notesLogic.updateNote)
.delete('/notes/:id', notesLogic.deleteNote);

module.exports = router; // to export routes