let library = JSON.parse(localStorage.getItem("myLibrary")) || [];

function createBook(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.imgID = parseInt(Math.random() * 1000);
}

function addBookToLibrary(title, author, pages, read) {
  library.push(new createBook(title, author, pages, read));
}

//Korisnicki input, dodavanje novih knjiga
var readingList = document.querySelector(".readingList");
var completedBooks = document.querySelector(".completedBooks");
var form = document.querySelector("#addNewBook form");
var radio;
var alert = document.getElementById("success_alert");

form.addEventListener("submit", (e) => {
  radio = document.querySelector("input[name='customRadio']:checked");
  addBookToLibrary(
    e.target[0].value,
    e.target[1].value,
    e.target[2].value,
    radio.value
  );
  e.preventDefault();
  form.reset();
  display();
  alert.style.opacity = "100%";
  setTimeout(() => document.querySelector("#success_alert").remove(), 3000);
});

//Ispis na stranici
function display() {
  completedBooks.innerHTML = "";
  readingList.innerHTML = "";
  for (let item of library) {
    let book = document.createElement("div");
    book.classList.add("col-md-4", "col-sm-6");
    book.innerHTML =
      `<div class="card">` +
      `<img src="https://source.unsplash.com/collection/${item.imgID}/1900x800" class="card-img-top img-thumbnail mx-auto" alt="...">` +
      '<div class="card-body text-center">' +
      `<h5 class="card-title">${item.title}</h5>` +
      `<p class="card-text">${item.author}</p>` +
      `<p class="card-text">${item.pages} Pages</p>` +
      '<div class="btn-group">' +
      `<a href="#" id="toggleRead" class="btn btn-sm btn-info fa fa-book"> Mark as ${
        item.read ? "unread" : "read"
      }</a>` +
      '<a href="#" id="delete" class="btn btn-sm btn-danger fa fa-trash"> Delete</a>' +
      "</div>" +
      "</div>";
    ("</div>");
    if (item.read) {
      completedBooks.appendChild(book);
    } else {
      readingList.appendChild(book);
    }

    book.addEventListener("click", (event) => {
      if (event.target.id === "toggleRead") {
        item.read = !item.read;
        display();
        showAlert("Status knjige je promenjen", "info");
      } else if (event.target.id === "delete") {
        library.splice(library.indexOf(item), 1);
        display();
        showAlert("Knjiga je obrisana", "danger");
      }
    });
    localStorage.setItem("myLibrary", JSON.stringify(library));
  }
}

//Ako je localStorage prazan dodajemo neki demo sadrzaj
if(library.length===0){
    addBookToLibrary('Ramble Book', 'Adam Buxton', '363', false);
    addBookToLibrary('1984', 'George Orwell', '280', false);
    addBookToLibrary('Brave New World', 'Aldous Huxley', '248', true);
    addBookToLibrary('My Bookey Wook', 'Russell Brand', '432', false);
    addBookToLibrary('The Watchmaker of Filigree Street', 'Natasha Pulley', '487', true); 
}
display(); 