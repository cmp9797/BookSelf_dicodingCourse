document.addEventListener("DOMContentLoaded", function (){
    const formSubmit = document.getElementById("inputBook");
    formSubmit.addEventListener("submit", function (event){
        event.preventDefault();
        inputdata();
    });

    const searchKeySubmit = document.getElementById("searchBook");
    searchKeySubmit.addEventListener("submit", function (event){
        event.preventDefault();
        searchBooks();
    });

    // Tampilkan data jika ada
    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved",() => {
    console.log("Selamat, data berhasil disimpan!");
});

document.addEventListener("ondataloaded", ()=> {
    refreshDataFromBooks();
})
