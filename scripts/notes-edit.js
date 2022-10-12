"use strict";

const noteTitle = document.querySelector("#note-title");
const noteBody = document.querySelector("#note-body");
const noteRemove = document.querySelector("#remove-note");
const updateValue = document.querySelector("#updated-value");

const noteId = location.hash.substring(1);
let noted = getSavedNotes();

let note = noted.find((note) => note.id === noteId);

const remove = function (id) {
  const noteIndex = noted.findIndex((note) => note.id === id);

  if (noteIndex > -1) {
    noted.splice(noteIndex, 1);
  }
};

if (!note) {
  location.assign("/index.html");
}

noteTitle.value = note.title;
noteBody.value = note.body;
updateValue.textContent = updateFunction(note.updatedAt);

noteTitle.addEventListener("input", (e) => {
  note.title = e.target.value;
  const timeStamp = moment().valueOf();
  updateValue.textContent = updateFunction(note.updatedAt);
  note.updatedAt = timeStamp;

  saveNotes(noted);
});

noteBody.addEventListener("input", (e) => {
  note.body = e.target.value;
  const timeStamp = moment().valueOf();
  note.updatedAt = timeStamp;
  updateValue.textContent = updateFunction(note.updatedAt);
  saveNotes(noted);
});

noteRemove.addEventListener("click", (e) => {
  remove(note.id);
  saveNotes(noted);
  location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "note") {
    noted = JSON.parse(e.newValue);
    note = noted.find((note) => note.id === noteId);

    if (!note) {
      location.assign("/index.html");
    }

    noteTitle.value = note.title;
    noteBody.value = note.body;
  }
});
