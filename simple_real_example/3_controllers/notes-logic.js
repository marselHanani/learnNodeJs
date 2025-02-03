//* here you write the logic of routes 
const express = require('express');
const app = express();
const Note = require('../2_Models/Note')
// use express parser or you can install body-parser to parse the request body and make it easy to work with
app.use(express.json()); // this is a middleware function

// sample route
exports.getAll = (req,res)=>{
    // logic to get all notes from database
    res.status(200).json({message: 'All notes retrieved'});
}
//*========= real example ===========
// get all notes from database

exports.getAllNotes = async (req,res)=>{
    try{
        // fetch data from database
        const notes = await Note.find({});
        res.status(200).json(notes);
    } catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}

// get a single note by id

exports.getNoteById = async (req,res)=>{
    try{
        // fetch data from database by id 
        const note = await Note.findById(req.params.id);
        if(!note){
            // return error if the id not found 
            return res.status(404).json({message: 'Note not found'});
        }
        res.json(note);
    } catch(error){
        // if happens any problem before fetch data return error in server 
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}

//create new notes in database
exports.createNote = async (req,res)=>{
    try{
        // write your now note inside body 
        const newNote = new Note(req.body);// Note is a class inside Models folder 
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);// 201 mean success creation 
    } catch(error){
        console.error(error);
        res.status(400).json({message: 'Invalid request data'});
    }
}

// update a note by id

exports.updateNote = async (req,res)=>{
    try{
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedNote){
            return res.status(404).json({message: 'Note not found'});
        }
        res.json(updatedNote);
    } catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}


// delete a note by id

exports.deleteNote = async (req,res)=>{
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message: 'Note not found'});
        }
        res.json({message: 'Note deleted'});
    } catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}
