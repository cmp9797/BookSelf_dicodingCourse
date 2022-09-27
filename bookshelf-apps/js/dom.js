const booksUnread = "incompleteBookshelfList";
const booksRead = "completeBookshelfList";
const bookId = "bookListId";

function inputdata() {
    let unread = document.getElementById(booksUnread);
    let read = document.getElementById(booksRead);

    let title = document.getElementById("inputBookTitle").value;
    let author = document.getElementById("inputBookAuthor").value;
    let year = Number(document.getElementById("inputBookYear").value);
    let isComplete = document.getElementById("inputBookIsComplete").checked;
    
    // Debug
    /*
        console.log(title);
        console.log(author);
        console.log(year);
        console.log(isComplete);
    */
    
    // Tambah list baru
    let addNew = makeList(title, author, year, isComplete);

    // panggil func di data.js (web storage)
    let bookObject = composeBookObject(title, author, year, isComplete); 

    // bikin object, kemudian dimasukkan ke list "books" di data.js
    addNew[bookId] = bookObject.id;
    books.push(bookObject);

    if (isComplete)
        read.append(addNew);
    else 
        unread.append(addNew);

    // panggil func di data.js supaya data bisa di update
    updateDataToStorage();
}

// Tambah list baru
function makeList(title, author, year, isComplete) {

    //list details
    let listTitle = document.createElement("h3");
    listTitle.innerText = title;

    let listAuthor = document.createElement("p");
    listAuthor.innerText = "Penulis: " + author;

    let listYear = document.createElement("p");
    listYear.innerText = "Tahun: " + year;

    //buttons
    let listMarkDone;
    if(isComplete) {
        listMarkDone = makeUnmarkButton();
        listMarkDone.innerText = "Belum selesai di Baca";
    }
    else {
        listMarkDone = makeMarkButton();
        listMarkDone.innerText = "Selesai Dibaca";
    }

    let listDel = makeRemoveButton();
    listDel.innerText = "Hapus buku";
   
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action")
    buttonContainer.append(listMarkDone, listDel);

    let container = document.createElement("article");
    container.classList.add("book_item")
    container.append(listTitle, listAuthor, listYear, buttonContainer);

    return container;
}

// Bikin button
function makeButton(buttonTypeClass, eventListener) {
    let button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

// Button untuk hapus list
function makeRemoveButton() {
    return makeButton("red", function(event){
         removeList(event.target.parentElement.parentElement);
    });
}
function removeList(listElement) {
    // cari indeks di rak sebelumnya, lalu hapus di storage (splice)
    let bookPos = findBookIndex(listElement[bookId]);
    books.splice(bookPos, 1); // 1 -> hapus 1 index aja

    // hapus elemen htmlnya
    listElement.remove();

    // supaya tetap terupdate (func di data.js)
    updateDataToStorage();
}

// Button untuk pindah ke rak READ
function makeMarkButton() {
    return makeButton("green", function(event){
         moveToRead(event.target.parentElement.parentElement);
    });
}
function moveToRead(listElement) {
    let listTitle = listElement.children[0].innerText;
    let listAuthor = listElement.children[1].innerText.substring(9);
    let listYear = listElement.children[2].innerText.substring(7);

    let newList = makeList(listTitle, listAuthor, listYear, true);
    let read = document.getElementById(booksRead);

    // cari buku yang ingin dipindah, set statusnya jadi true
    let book = findBook(listElement[bookId]);
    book.isComplete = true;
    newList[bookId] = book.id;

    read.append(newList);
    listElement.remove();

    // supaya tetap terupdate (func di data.js)
    updateDataToStorage();
} 

// Button untuk pindah ke rak UNREAD
function makeUnmarkButton() {
    return makeButton("green", function(event){
         moveToUnread(event.target.parentElement.parentElement);
    });
}
function moveToUnread(listElement) {
    let listTitle = listElement.children[0].innerText;
    let listAuthor = listElement.children[1].innerText.substring(9);
    let listYear = listElement.children[2].innerText.substring(7);
    
    let newList = makeList(listTitle, listAuthor, listYear, false);
    let unread = document.getElementById(booksUnread);
    
    // cari buku yang ingin dipindah, set statusnya jadi false
    let book = findBook(listElement[bookId]);
    book.isComplete = false;
    newList[bookId] = book.id;
    
    unread.append(newList);
    listElement.remove();

    updateDataToStorage();
} 

// Menu Search
function searchBooks() {
    let searchInput = document.getElementById("searchBookTitle").value;
    let booksLists = document.querySelectorAll(".book_item");

    for(book of booksLists)
    {
        // let title = 
    }
    console.log(searchInput);
    console.log(booksLists);
}






