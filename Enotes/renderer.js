const fs = require('fs');
const { ipcRenderer } = require('electron');

const noteTextarea = document.getElementById('note');

// Function to save note to file
function saveNoteToFile(content) {
  fs.writeFile('Enotes/note.txt', content, (err) => {
    if (err) throw err;
  });
}

// Load note from file
fs.readFile('Enotes/note.txt', 'utf8', (err, data) => {
  if (err) return;
  noteTextarea.value = data;
});

// Save note to file whenever there is a change in the textarea content
noteTextarea.addEventListener('input', () => {
  saveNoteToFile(noteTextarea.value);
});
