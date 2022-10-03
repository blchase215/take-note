// const fs = require('fs');
// const router = require('express').Router();
// const path = require('path');
// const db = require('../db/notes.json');
// const { v4: uuidv4 } = require('uuid');

// // Get all Notes
// router.get('/api/notes', (req, res) => {
//     res.json(db)
// });

// // Save/Load a note
// router.post('/api/notes', (req, res) => {

//   // set up variable from req.body to include uuid
//   const { title, text } = req.body;

//   if (title && text) {
//     const newNote = {
//       title,
//       text,
//       'id': uuidv4()
//     };
//     // write the req to notes db in json format
//     fs.readFile('./db/notes.json', 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         const parsedNotes = JSON.parse(data);
//         parsedNotes.push(newNote);

//         fs.writeFile(
//           path.join(__dirname, './db/notes.json'),
//           JSON.stringify(parsedNotes, null, 2),
//           (writeErr) =>
//             writeErr
//               ? console.error(writeErr)
//               : console.info('Successfully updated notes!')
//         );
//       }
//     });

//     const response = {
//       status: 'success',
//       body: newNote,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in posting note');
//   }
// });

// router.delete('/api/notes/:id', (req, res) => {
//   deleteNote(req.params.id, db);
// })
// const deleteNote = (id, notesDb) => {
//   for (i=0; i <= notesDb.length; i++) {
//     let note = notesDb[i];
//     if (note.id === id) {
//       notesDb.splice(i, 1);
//       fs.writeFile(
//         path.join(__dirname, './db/notes.json'),
//         JSON.stringify(notesDb, null, 2),
//         (writeErr) =>
//             writeErr
//               ? console.error(writeErr)
//               : console.info('Successfully deleted note!')
//         );
//     }
//   }
// }