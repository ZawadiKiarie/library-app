const myLibrary = [];

function Book(title, author, pages, status){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function toggleStatus(book) {
  book.status = !book.status;
}


function addBookToLibrary(title, author, pages, status){
  const myBook = new Book(title, author, pages,status);
  if(title !== '' && author !== '' && pages !== '' && status !== ''){
    myLibrary.push(myBook);
  }
}

addBookToLibrary("Forty Rules", "Elif Shafak", 350, false);
addBookToLibrary("Beach Read", "Emily Henry", 361, false);
addBookToLibrary("Erotic stories", "Balli Kaur", 388, true);
console.log(myLibrary);

function displayBooks(){
  const container = document.querySelector('.book-container');
  container.innerHTML = '';

  myLibrary.forEach((book) =>{
    const row = document.createElement('div');
    let index = myLibrary.indexOf(book);
    row.classList.add('bookrow');

    let bookValues = Object.values(book);
    bookValues.forEach((bookValue) =>{
      if(bookValue == false){
        const notReadBtn = document.createElement('button');
        notReadBtn.innerHTML = 'Not read';
        notReadBtn.classList.add('not-read-btn');
        row.appendChild(notReadBtn);

        notReadBtn.addEventListener('click', ()=>{
          toggleStatus(book);
          displayBooks();
        })
      }else if(bookValue == true){
        const readBtn = document.createElement('button');
        readBtn.innerHTML = 'read';
        readBtn.classList.add('read-btn');
        row.appendChild(readBtn);

        readBtn.addEventListener('click', ()=>{
          toggleStatus(book);
          displayBooks();
        });
      }else{
        const col = document.createElement('div');
        col.textContent = `${bookValue}`;
        col.classList.add('book-col');
        row.appendChild(col);
      }
      
    })
    
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.classList.add('delete-btn');
    // deleteBtn.setAttribute('data-active', index);
    
    deleteBtn.addEventListener('click', ()=>{
      myLibrary.splice(index, 1);
      console.log(myLibrary);
      displayBooks();
    });

    row.appendChild(deleteBtn);
    container.appendChild(row);
    const hr = document.createElement('div');
    hr.classList.add('hr');
    container.appendChild(hr);
  });
}




const addBookBtn = document.querySelector('.add-book');
const dialog = document.getElementById('dialog');
const closeBtn = document.getElementById('cancel');
const submitBtn = document.getElementById('submitBtn');
const myForm = document.getElementById('form');



addBookBtn.addEventListener('click', () => {
  dialog.showModal();
})

closeBtn.addEventListener('click', (event)=>{
  event.preventDefault();
  dialog.close();
})

submitBtn.addEventListener('click', () =>{
  myForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const formTitle = document.getElementById('title').value;
    const formAuthor = document.getElementById('author').value;
    const formPages = document.getElementById('pages').value;
    let checkbox = document.getElementById('status')
    let formStatus = checkbox.value;
      if(checkbox.checked){
        formStatus = true;
      }else{
        formStatus = false;
      }
    addBookToLibrary(formTitle, formAuthor, formPages, formStatus);
    console.log(myLibrary);
    displayBooks();
    dialog.close();
    myForm.reset();
  })
})

displayBooks();
