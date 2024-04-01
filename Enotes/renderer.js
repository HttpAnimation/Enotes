const fs = require('fs');
const { ipcRenderer, remote } = require('electron');

const noteTextarea = document.getElementById('note');
let currentFilename = 'note.txt'; // Default filename

// Function to save note to file
function saveNoteToFile(content, filename) {
  fs.writeFile(`Enotes/${filename}`, content, (err) => {
    if (err) throw err;
  });
}

// Function to prompt for filename and save note
function saveNote() {
  remote.dialog.showSaveDialog({
    defaultPath: currentFilename,
    filters: [{ name: 'Text Files', extensions: ['txt'] }]
  }).then(({ filePath }) => {
    if (filePath) {
      currentFilename = filePath.split('/').pop(); // Update current filename
      saveNoteToFile(noteTextarea.value, currentFilename);
    }
  }).catch((err) => {
    console.log(err);
  });
}

// Load note from file
fs.readFile(`Enotes/${currentFilename}`, 'utf8', (err, data) => {
  if (err) return;
  noteTextarea.value = data;
});

// Save note to file whenever there is a change in the textarea content
noteTextarea.addEventListener('input', () => {
  saveNoteToFile(noteTextarea.value, currentFilename);
});

// Handle Ctrl+S (or Command+S) shortcut for saving
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault(); // Prevent browser default save behavior
    saveNote();
  }
});
