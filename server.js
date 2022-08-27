// Dependencies
// ====================================
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');

// PORT and app variables
const PORT = process.env.PORT || 3001;
const app = express();

// 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

// Display Routes

// index.html (root) // Landing page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// notes.html (main) // Note input and saved notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// API Routes

// Get all Notes
app.get('/api/notes', (req, res) => {
    res.json(db.slice(1));
});



app.post('/api/notes', (req, res) => {
  const newNote = createNote(req.body, db)
  res.json(newNote);
});

// Turn request into JSON

const createNote = (body, notesArr) => {
  const newNote = body;
  if (!Array.isArray(notesArr)) { // look into this kind of error handling
    notesArr = [];
  }
  if (notesArr.length === 0) {
    notesArr.push(0);
  }

  // --------------------------------uncomment when delete is done
  // body.id = notesArr.length;
  notesArr[0]++
  notesArr.push(newNote);

  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArr, null, 2)
  )
  return newNote;
}






// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT)
})