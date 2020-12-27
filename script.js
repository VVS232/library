let myLib=[];

function Book(title, author, pages, read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
     this.info=function(){
        return `${title} by ${author}, it has ${pages} pages.`;
    }
    myLib.push(this);
}
const Lor=new Book("Lord of the Rings", "Tolkien",  294, true);
const HP=new Book("Harry Potter", "Rowling", 458, false);

for (let i = 0; i<myLib.length;i++){
    let book = document.createElement("div");
    book.className="books";
    let bookTitle=book.appendChild(document.createElement("h2"));
    bookTitle.textContent=`Title: ${myLib[i].title}`
    let bookAuthor= book.appendChild(document.createElement("h3"));
    bookAuthor.textContent=`by ${myLib[i].author}`;
    


    document.getElementById("content").appendChild(book);
}

