const fs = require('fs');
const { ipcRenderer, remote } = require('electron');

const noteTextarea = document.getElementById('note');
const saveAsInput = document.getElementById('saveAsInput');

// Function to save note to file with a specific name
function saveNoteToFile(fileName, content) {
  fs.writeFile(`Enotes/${fileName}.txt`, content, (err) => {
    if (err) throw err;
  });
}

// Function to handle saving the note
function saveNote() {
  const fileName = saveAsInput.value.trim();
  if (fileName) {
    saveNoteToFile(fileName, noteTextarea.value);
    remote.getCurrentWindow().setTitle(`${fileName} - Notes`);
  }
}

// Load note from file
function loadNoteFromFile(fileName) {
  fs.readFile(`Enotes/${fileName}.txt`, 'utf8', (err, data) => {
    if (err) return;
    noteTextarea.value = data;
  });
}

// Event listener for Ctrl+S or Command+S shortcut to save the note
document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault(); // Prevent default browser save dialog
    saveNote();
  }
});

// Event listener for save button click
document.getElementById('saveButton').addEventListener('click', saveNote);

// Event listener for file name input change
saveAsInput.addEventListener('change', () => {
  const fileName = saveAsInput.value.trim();
  if (fileName) {
    loadNoteFromFile(fileName);
    remote.getCurrentWindow().setTitle(`${fileName} - Notes`);
  }
});
