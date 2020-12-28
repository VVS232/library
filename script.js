let myLib=[];
$("#newBook").click(callForm);
$("#closeForm").click(()=>{
    $("#newbookForm").css({visibility:"hidden"})
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
$(".books").each(function (){
        this.remove()
    });
    for (let i = 0; i<myLib.length;i++){
    let book = document.createElement("div");
    book.className="books";    
    book.dataset.index=i;

    
    let bookDelete=$("<span></span>");
    $(bookDelete).click(()=>{
        $(book).remove()
        myLib.splice(i);
        addToStorage();
    })
    $(bookDelete).addClass("material-icons")
   // bookDelete.className="";
   $(bookDelete).text("delete_forever")
    //bookDelete.textContent=;
    //bookDelete.addEventListener("click", ()=>{
       
   // });
   $(book).append(bookDelete)
    //book.appendChild(bookDelete);
    $(book).append($("<h2></h2>").text(`Title: ${myLib[i].title}`));
    $(book).append($("<h3></h3>").text(`by ${myLib[i].author}`));
    $(book).append($("<p></p>").text(`Number of pages: ${myLib[i].pages}`))
    makeSwitch(book, myLib[i]);
$("#content").append(book)
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
 
        $("#newbookForm").css({visibility:"visible"})

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