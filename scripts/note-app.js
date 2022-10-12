"use strict";

import { v4 as uuidv4 } from "https://jspm.dev/uuid";
// console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

renderNotes(notes, filters);

document.querySelector("#create-note").addEventListener("click", (e) => {
  const id = uuidv4();
  const timeStamp = moment().valueOf();

  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timeStamp,
    updatedAt: timeStamp,
  });
  saveNotes(notes);
  // renderNotes(notes, filters);
  location.assign(`/edit.html#${id}`);
});

document.querySelector("#search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector("#sort-items").addEventListener("change", function (e) {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener("storage", (e) => {
  if (e.key === "note") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});


