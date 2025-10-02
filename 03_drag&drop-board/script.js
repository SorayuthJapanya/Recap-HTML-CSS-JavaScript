const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

for (const card of cards) {
  card.addEventListener("dragstart", handleDragStart);
  card.addEventListener("dragend", handleDragEnd);
}

for (const list of lists) {
  list.addEventListener("dragover", handleDragOver);
  list.addEventListener("dragenter", handleDragEnter);
  list.addEventListener("dragleave", handleDragLeave);
  list.addEventListener("drop", handleDragDrop);
}

function handleDragStart(e) {
  e.dataTransfer.setData("text/plain", this.id);
}

function handleDragEnd() {
  console.log("Drag Ended");
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDragEnter(e) {
  e.preventDefault();

  this.classList.add("over");
}

function handleDragLeave(e) {
  e.preventDefault();

  this.classList.remove("over");
}

function handleDragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");

  const card = document.getElementById(id);

  this.appendChild(card);

  this.classList.remove("over");
}
