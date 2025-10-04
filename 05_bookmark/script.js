// DOMS ELEMENTS
const submitForm = document.getElementById("bookmark-form");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

submitForm.addEventListener("submit", handleAddBookmark);

function handleAddBookmark(e) {
  e.preventDefault();

  // get form value
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    alert("Please enter both name and URL.");
  } else {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Url Invalid");
      return;
    }
  }

  bookmarks.push({
    id: Date.now(),
    name,
    url,
  });

  updateBookmarkList();

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  submitForm.reset();
}

function updateBookmarkList() {
  bookmarkList.innerHTML = "";

  const sortedBookmark = [...bookmarks].reverse();

  sortedBookmark.forEach((bookmark) => {
    const bookmarkEl = createBookmarkElement(bookmark);
    bookmarkList.appendChild(bookmarkEl);
  });
}

function createBookmarkElement(bookmark) {
  const li = document.createElement("li");
  const link = document.createElement("a");

  link.href = bookmark.url;
  link.textContent = bookmark.name;
  link.target = "_blank";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", function () {
    bookmarkList.removeChild(li);
    removeBookMarkFormStorage(bookmark);
  });

  li.appendChild(link);
  li.appendChild(removeBtn);

  return li;
}

function removeBookMarkFormStorage(bookmark) {
  const bookMarkId = bookmark.id;
  bookmarks = bookmarks.filter((bookmark) => bookmark.id !== bookMarkId);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  updateBookmarkList();
}

// local storage render
updateBookmarkList();
