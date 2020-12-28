let myLib=[];
document.getElementById("newBook").addEventListener("click", callForm)
document.getElementById("closeForm").addEventListener("click", ()=>{
    document.getElementById("newbookForm").style.visibility="hidden";

})
function Book(title, author, pages, read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    myLib.push(this);
}





function displayBooks(){
checkStorage();
    document.querySelectorAll(".books").forEach((e)=>{
        e.remove()
    });
    for (let i = 0; i<myLib.length;i++){
    let book = document.createElement("div");
    book.className="books";    
    book.dataset.index=i;

    
    let bookDelete=document.createElement("span");
    bookDelete.className="material-icons";
    bookDelete.textContent="delete_forever";
    bookDelete.addEventListener("click", ()=>{
        document.getElementById("content").removeChild(book);
         myLib.splice(i);
         addToStorage();
    });
    book.appendChild(bookDelete);

    let bookTitle=book.appendChild(document.createElement("h2"));
    bookTitle.textContent=`Title: ${myLib[i].title}`
    let bookAuthor= book.appendChild(document.createElement("h3"));
    bookAuthor.textContent=`by ${myLib[i].author}`;
    let bookPages=book.appendChild(document.createElement("p"));
    bookPages.textContent=`Number of pages: ${myLib[i].pages}`;
    makeSwitch(book, myLib[i]);

    document.getElementById("content").appendChild(book);
}

}



function makeSwitch(book, arrObj){  //making checkbox input for every book
    let  statusLabel= book.appendChild(document.createElement("label"));
    statusLabel.className="switch";
    let  statusInput= document.createElement("input");
    statusLabel.appendChild(statusInput)
    statusInput.type="checkbox";
    let  statusSpan= statusLabel.appendChild(document.createElement("span"));
    statusSpan.className="slider";
    if (arrObj.read==true){
        statusInput.checked=true;
        }
    statusInput.addEventListener("change", ()=>{ //for switching read status on change of input
        if (statusInput.checked==true){
            arrObj.read=true;
        }
        else{
            arrObj.read=false;
        }
        addToStorage();
    })

}

function callForm(){
document.getElementById("newbookForm").style.visibility="initial";


document.getElementById("addBook").addEventListener("click",createBook);


}
function createBook(){
    let title=document.getElementById("title").value;
let author=document.getElementById("author").value;
let pages=document.getElementById("pages").value;
let read=document.getElementById("read").checked;
    new Book(title,author,pages,read);
    document.getElementById("newbookForm").style.visibility="hidden";
    addToStorage();
    displayBooks();
    document.getElementById("addBook").removeEventListener("click",createBook)
}


function checkStorage(){
    if (localStorage.length==0){
        addToStorage()
    }
    else{
        fromStorage()
    }
}



function addToStorage(){
    localStorage.clear();
    for (let i = 0; i<myLib.length;i++){
        localStorage.setItem(i, JSON.stringify(myLib[i]))
    }

}

function fromStorage(){
    myLib=[];
    for (let i =0; i<localStorage.length;i++){
        let book=localStorage.getItem(i);
        myLib.push(JSON.parse(book));
    }
}




displayBooks();