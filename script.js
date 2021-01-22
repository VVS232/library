"use strict";


class Book {
    static myLib = [];
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        Book.myLib.push(this);
    }
    static displayBooks = function () {
        locStorage.checkStorage();
        $(".books").each(function () {
            this.remove();
        });
        for (let i = 0; i < Book.myLib.length; i++) {
            let book = $("<div></div>");
            $(book).addClass("books");
            $(book).attr("data-index", i);
            $(book).append(
                $("<span></span>")
                    .addClass("material-icons")
                    .text("delete_forever")
                    .click(() => {
                        $(book).remove();
                        Book.myLib.splice(i);
                        locStorage.addToStorage();
                    })
            );
            $(book).append($("<h2></h2>").text(`Title: ${Book.myLib[i].title}`));
            $(book).append($("<h3></h3>").text(`by ${Book.myLib[i].author}`));
            $(book).append(
                $("<p></p>").text(`Number of pages: ${Book.myLib[i].pages}`)
            );
            makeSwitch(book, Book.myLib[i]);
            $("#content").append(book);
            function makeSwitch(book, arrObj) {
                //making checkbox input for every book
                let statusLabel = $("<label></label>").addClass("switch");
                $(book).append(statusLabel);
                let statusInput = $("<input>").attr("type", "checkbox");
                $(statusLabel).append(statusInput);
                $(statusLabel).append($("<span></span>").addClass("slider"));
                if (arrObj.read == true) {
                    $(statusInput).prop("checked", "true");
                }
                $(statusInput).on("change", () => {
                    //for switching read status on change of input
                    if ($(statusInput).is(":checked")) {
                        arrObj.read = true;
                    } else {
                        arrObj.read = false;
                    }
                    locStorage.addToStorage();
                });
            }
        }
    }

}




class locStorage { //local storage
    static checkStorage() {
        if (localStorage.length == 0) {
            locStorage.addToStorage();
        } else {
            locStorage.fromStorage();
        }
    }
    static addToStorage() {
        localStorage.clear();
        for (let i = 0; i < Book.myLib.length; i++) {
            localStorage.setItem(i, JSON.stringify(Book.myLib[i])); //making a string from object
        }
    }
    static fromStorage() {
        Book.myLib = [];
        for (let i = 0; i < localStorage.length; i++) {
            let book = localStorage.getItem(i);
            Book.myLib.push(JSON.parse(book)); //object from string and push
        }
    }
}




(function newBook() { //form for making books
    function callForm() {
        $("#newbookForm").css({ visibility: "visible" });
        $("#addBook").click(createBook)
    }

    function createBook() {
        if (document.getElementById("addBook").checkValidity())
        {console.log(32)
            return;}
        let title = $("#title").val();
        let author = $("#author").val();
        let pages = $("#pages").val();
        let read = $("#read").is(":checked");
        new Book(title, author, pages, read);
        $("#newbookForm").css("visibility", "hidden");
        locStorage.addToStorage();
        Book.displayBooks();
        $("#addBook").off("click", createBook);
    }
    $("#newBook").click(callForm);
    $("#closeForm").click(() => {
        $("#newbookForm").css({ visibility: "hidden" });
    });

})();



Book.displayBooks(); //initial display