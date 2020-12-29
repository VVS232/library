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
    let book = $("<div></div>");
    $(book).addClass("books");
    $(book).attr("data-index",i)
    $(book).append($("<span></span>")
        .addClass("material-icons")
        .text("delete_forever")
        .click(()=>{
            $(book).remove()
            myLib.splice(i);
           addToStorage();
        }));
    $(book).append($("<h2></h2>").text(`Title: ${myLib[i].title}`));
    $(book).append($("<h3></h3>").text(`by ${myLib[i].author}`));
    $(book).append($("<p></p>").text(`Number of pages: ${myLib[i].pages}`))
    makeSwitch(book, myLib[i]);
$("#content").append(book)
}

}
const Hp=new Book("asd","asd",22,true)



function makeSwitch(book, arrObj){  //making checkbox input for every book
    let statusLabel=$("<label></label>").addClass("switch");
    $(book).append(statusLabel)
   let statusInput=$("<input>").attr("type","checkbox");
   $(statusLabel).append(statusInput);
   $(statusLabel).append($("<span></span>").addClass("slider"));
    if (arrObj.read==true){
        $(statusInput).prop("checked","true");
        }
        $(statusInput).on("change",()=>{   
            console.log("asdas")         //for switching read status on change of input
            if ($(statusInput).is(":checked")){
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
        $("#addBook").click(createBook);
}


function createBook(){
    let title=$("#title").val();
   let author=$("#author").val();
let pages=$("#pages").val();
let read=$("#read").is(":checked");
    new Book(title,author,pages,read);
    $("#newbookForm").css("visibility","hidden");
   addToStorage();
    displayBooks();
    $("#addBook").off("click", createBook);
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