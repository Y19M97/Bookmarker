var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var btnVisit=  document.getElementById('btnVisit');
var btnDelete= document.getElementById('btnDelete');
var btnUpdateNew = document.getElementById('btnUpdateNew');
var addBtn =document.getElementById('addBtn');
var bookContainer = [];

if( localStorage.getItem('books') != null){
    bookContainer= JSON.parse(localStorage.getItem('books'));
    displayBook();
}
function addBookMark() {
        if(ValidationName()==true){
        var bookInfo ={
            sName:siteName.value,
            sUrl:siteUrl.value,
        }
        bookContainer.push(bookInfo);
        localStorage.setItem('books' , JSON.stringify(bookContainer))
        displayBook();
        clearBook();
    }
    else{
        document.getElementById('validationName').innerHTML = 'Invalid Name...';
        document.getElementById('validationUrl').innerHTML = 'Invalid URL...';
        }
}

function displayBook(){
    var containerBook =``;
    for(var i=0 ; i<bookContainer.length ; i++){
        containerBook +=` <tr>
        <td class='fw-bold'>${bookContainer[i].sName}</td>
        <td><a title='Visit' href='http://www.${bookContainer[i].sUrl}.com'  class="btn btn-outline-success btn-sm fas fa-eye" id="btnVisit"></a></td>     
        <td><button title='Edit' onclick='setform(${i})'  class='btn btn-outline-warning btn-sm fas fa-pen-to-square'></button></td>     
        <td><button title='Delete'  onclick='bookDelete(${i})' class="btn btn-outline-danger btn-sm fas fa-trash-can" id="btnDelete"></button></td>
       
    </tr>` 
    }
   
    document.getElementById('tablebody').innerHTML = containerBook; 
}
function clearBook(){
    siteName.value='';
    siteUrl.value='';
}

function bookDelete(bookIndex){
    bookContainer.splice(bookIndex,1)
    localStorage.setItem('books' , JSON.stringify(bookContainer));
    displayBook();
}

function searchTerm(term) {
    var containerBook =``;
    for(var i=0 ; i<bookContainer.length ; i++){
        if(bookContainer[i].sName.toLowerCase().includes(term.toLowerCase()) == true){
            containerBook +=` <tr>
            <td class='fw-bold'>${bookContainer[i].sName}</td>
            <td><a title='Visit' href='${bookContainer[i].sUrl}'  class="btn btn-outline-success btn-sm fas fa-eye" id="btnVisit"></a></td>     
            <td><button title='Edit'  class='btn btn-outline-warning btn-sm fas fa-pen-to-square'></button></td>     
            <td><button title='Delete'  onclick='bookDelete(${i})' class="btn btn-outline-danger btn-sm fas fa-trash-can" id="btnDelete"></button></td>
        </tr>` 
        }
        document.getElementById('tablebody').innerHTML = containerBook; 
    }
}


var updateIndexl=0;
function setform(id){
    updateIndexl=id;
    document.getElementById('siteName').value =bookContainer[id].sName;
    document.getElementById('siteUrl').value =bookContainer[id].sUrl;
    addBtn.classList.add('d-none');
    btnUpdateNew.classList.replace('d-none' ,'d-block')
    // btnUpdate.classList.add('d-none');
    // btnDelete.classList.add('d-none');
}
function updateform (){
    if(ValidationName()==true){
        bookContainer[updateIndexl].sName =document.getElementById('siteName').value;
        bookContainer[updateIndexl].sUrl=document.getElementById('siteUrl').value;
        displayBook();
        localStorage.setItem('books' , JSON.stringify(bookContainer))
        addBtn.classList.replace('d-none' ,'d-block');
        btnUpdateNew.classList.add('d-none')
        clearBook();    
    }
    else {
        document.getElementById('validationName').innerHTML = 'Invalid Name...';
        document.getElementById('validationUrl').innerHTML = 'Invalid URL...';
    }
   
}

function ValidationName(){
    var regex =/^[^!@#$%^&*+=.,`~]\D([A-Z]|[a-z]){1,}$/
    if (regex.test(siteName.value,siteUrl.value)==true){
        return true
    }
    else {
        return false
    }
}

// function ValidationNameAdd() {
//     var regex =/^\W$/
//     if(regex.test(siteUrl)==true){
//         return true
//     }
//     else{
//         return false
//     }
// }