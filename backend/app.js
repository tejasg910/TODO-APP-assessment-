const express  = require('express');
const mongoose  = require('mongoose')
const Note = require("./models/Noteschema")
var cors = require('cors');
const { findByIdAndDelete } = require('./models/Noteschema');
const { FiRewind } = require('react-icons/fi');

try {
    mongoose.connect('mongodb://localhost:27017/bqpnotes');
    
} catch (error) {
    console.log('mongo is not connected')
}


const port  = 5000;
const app = express();


app.use(cors())

app.post('/addnote',express.json(), async(req, res)=>{


    try {
        const {title, content} = req.body;

const newNote =  new Note({title, content});
const saveNote = await newNote.save();
res.status(200).json({success: true, data: saveNote})
    } catch (error) {
        res.status(400).json({success: false, error})

    }

// console.log(newNote)

})


app.get('/getnotes', async(req, res)=>{
    try {
        const notes  = await Note.find({});
        res.status(200).json({success: true, notes})
    } catch (error) {
        res.status(500).json({success: false, error})
        
    }
   
    // console.log(notes)
})


app.post('/deletenote', express.json(), async(req, res)=>{
        

        try {
            
            const  {_id} = req.body;
        console.log(req.body)
        console.log(_id)
        const deleteNote = await  Note.findByIdAndDelete(_id);
        // console.log(deleteNote)
        res.status(200).json({success: true, deleteNote})
        } catch (error) {

        res.status(500).json({success: false, error})
            
        }
})


app.post('/updatenote', express.json(), async(req, res)=>{
    // console.log(req.body)

   
try {
    
    const note  = req.body.note;

   
    const updated  = await Note.findByIdAndUpdate({_id: req.body.keyForEdit}, {title: note.title, content: note.content}, {new: true})
    // console.log(updated)
    res.status(200).json({success: true, updated})
} catch (error) {
    res.status(500).json({success: false, error})
    
}

})
app.listen(port, ()=>{
    console.log('Server is started at ', port)
})