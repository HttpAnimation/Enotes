const fs = require('fs');
const { ipcRenderer } = require('electron');

const noteTextarea = document.getElementById('note');

// Load note from file
fs.readFile('note.txt', 'utf8', (err, data) => {
  if (err) return;
  noteTextarea.value = data;
});

// Save note to file
noteTextarea.addEventListener('input', () => {
  fs.writeFile('note.txt', noteTextarea.value, (err) => {
    if (err) throw err;
  });
});
