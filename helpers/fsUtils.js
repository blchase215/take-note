const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (notesDb, newNote) =>
  fs.writeFile(notesDb, JSON.stringify(newNote, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${notesDb}`)
  );

const readAndAppend = (newNote, notesDb) => {
  fs.readFile(notesDb, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newNote);
      writeToFile(notesDb, parsedData);
    }
  });
};

const readAndDelete = (targetId, notesDb) => {
  fs.readFile(notesDb, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      for (i = 0; i <= notesDb.length; i++) {
        let note = notesDb[i];
        if (note.id === targetId) {
          notesDb.splice(i, 1);
          return;
        }
      }
      writeToFile(notesDb, parsedData);
    }
  });
};

module.exports = { readFromFile, readAndAppend, readAndDelete };