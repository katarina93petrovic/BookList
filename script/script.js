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

var readingList = document.querySelector(".readingList");
var completedBooks = document.querySelector(".completedBooks");
var form = document.querySelector("#addNewBook form");
var radio;
var alert = document.getElementById("success_alert");
var ispisGreske = document.getElementById('pogresanUnos');

//Dodavanje novih knjiga i validacija unosa preko RegExp
form.addEventListener("submit", (e) => {
  let nazivKnjige = document.getElementById('inputTitle');
  let nazivKnjigeVrednost = nazivKnjige.value;
  let regexNazivKnjige = /^[A-ZČĆŽŠĐ0-9-_\.]{1}[a-zčćžšđ0-9-_\.]{0,20}(\s[a-zčćžšđA-ZČĆŽŠĐ0-9-_\.]{0,20})*$/;
  let autorKnjige = document.getElementById('autor');
  let autorVrednost = autorKnjige.value;
  let regexImeAutora = /^[A-ZČĆŽŠĐ]{1}[a-zčćžšđ\.]{0,20}(\s[A-ZČĆŽŠĐ]{1}[a-zčćžšđ0-9\.]{0,20})*$/;
  let stranice = document.getElementById('numberOfPages');
  let straniceVrednost = stranice.value;
  let regexBrStranica = /^[0-9]{1,4}$/;

  let validanNaziv = regexNazivKnjige.test(nazivKnjigeVrednost);
  let validanAutor = regexImeAutora.test(autorVrednost);
  let validanBrStr = regexBrStranica.test(straniceVrednost);

  if(validanNaziv==false){
    ispisGreske.innerHTML = "Niste dobro uneli naziv knjige!";
    ispisGreske.style.opacity = '100%'
  }
  else if(validanAutor==false) {
    ispisGreske.innerHTML = "Niste dobro uneli ime autora!";
    ispisGreske.style.opacity = '100%'
  }
  else if(validanBrStr==false){
    ispisGreske.innerHTML = "Niste dobro uneli broj stranica!";
    ispisGreske.style.opacity = '100%'
  }
  else{
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
      ispisGreske.style.opacity = "0%";
    }
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
      `<h5 class="card-title h4">${item.title}</h5>` +
      `<p class="card-text h6">${item.author}</p>` +
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

function showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const nav = document.querySelector('.navigation');
    const navbar = document.querySelector('.navigation2');
    nav.insertBefore(div, navbar);
    //Da nestane posle par sekundi
    setTimeout(()=>document.querySelector('.alert').remove(), 3000);
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