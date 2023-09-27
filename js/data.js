const strgKey = "BOOKSELF_APPS";
 
let books = [];
 
function isStorageExist() {
   if(typeof(Storage) === undefined){
       alert("Browser tidak mendukung local storage");
       return false
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(books);
   localStorage.setItem(strgKey, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(strgKey);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       books = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composeBookObject(title, author, year, isComplete) {
   return {
       id: +new Date(),
       title,
       author,
       year,
       isComplete
   };
}

function findBook(BookId) {
   for(book of books){
    //    console.log("-------");
    //    console.log(book.id);
    //    console.log(BookId);
       if(book.id === BookId)
           return book;
   }
   return null;
}
 
 
function findBookIndex(bookId) {
   let index = 0
   for (book of books) {
       if(book.id === bookId)
           return index;
 
       index++;
   }
 
   return -1;
}

function refreshDataFromBooks() {
    let unread = document.getElementById(booksUnread);
    let read = document.getElementById(booksRead);
  
  
    for(book of books){
        const newBook = makeList(book.title, book.author, book.year, book.isComplete);
        newBook[bookId] = book.id;
  
  
        if(book.isComplete){
            read.append(newBook);
        } else {
            unread.append(newBook);
        }
    }
 }