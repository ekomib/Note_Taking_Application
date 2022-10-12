"use strict";

const getSavedNotes = () => {
  const jsonData = localStorage.getItem("note");

  try {
    return jsonData ? JSON.parse(jsonData) : [];
  } catch (e) {
    return [];
  }
};

let notes = getSavedNotes();

let filters = {
  searchText: "",
  sortBy: "byEdited",
};

const saveNotes = (note) => {
  localStorage.setItem("note", JSON.stringify(note));
};

const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort(function (a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byAdded") {
    return notes.sort(function (a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byAlpha") {
    return notes.sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }
};

const renderNotes = (note, filter) => {
  notes = sortNotes(note, filters.sortBy);
  const filteredNotes = note.filter((notes) =>
    notes.title.toLowerCase().includes(filter.searchText.toLowerCase())
  );

  document.querySelector("#notes").innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDom(note);
      document.querySelector("#notes").appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No Notes Present At The Moment";
    emptyMessage.classList.add("empty-message");
    document.querySelector("#notes").appendChild(emptyMessage);
  }

  filteredNotes.filter((filter) => {
    const p = document.createElement("p");
    if (!filter.searchText) {
      p.textContent = "";
    } else {
      p.textContent = notes.title;
    }

    document.querySelector("#notes").appendChild(p);
  });
};

const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

const generateNoteDom = (note) => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const status = document.createElement("p");

  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = `Unnamed notes`;
  }

  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  noteEl.setAttribute("href", `/edit.html#${note.id}`);

  noteEl.classList.add("list-item");

  console.log(note.updatedAt);

  status.textContent = updateFunction(notes.updatedAt);
  status.classList.add("list-item__subtitle");
  noteEl.appendChild(status);

  return noteEl;
};

const updateFunction = (time) => {
  // updateValue.textContent = `Last edited ${moment(time).fromNow()}`;
  // console.log(updateValue);
  return `Last edited ${moment(time).fromNow()}`;
};
