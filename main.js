const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btnShowForm = $('.btn-show-form')
const formAdd = $('.form-add')
const btnAdd = $('.btn-add')
const bookTitle = $('.book-title')
const bookAuthor = $('.book-author')
const title = $('#title')
const author = $('#author')
const checkBox = $('#check')
const libraryBook = $('.library-book')
const btnDeletes = $$('.btn-delete')

let myLib = []
let id = 0;
let isCheck = false

btnShowForm.onclick = () => {
    formAdd.classList.toggle('active')
}

function setLib() {
    isCheck = checkBox.checked
    myLib.push(setBook())
}

function setBook() {
    return {
        'title': title.value,
        'author': author.value,
        'isCheck': checkBox.checked
    }
}

function resetForm() {
    title.value = ''
    author.value = ''
    checkBox.checked = false
}


function createBook() {
    const div = document.createElement('div')
    const divClid = document.createElement('div')
    const divBtns = document.createElement('div')
    const divBtnRead = document.createElement('div')
    const divBtnDelete = document.createElement('div')
    const pTitle = document.createElement('p')
    const pAuthor = document.createElement('p')

    libraryBook.appendChild(div)

    div.classList.add('book')
    div.id = `book${id+1}`
    id++
    div.appendChild(divClid)
    div.appendChild(divBtns)

    divClid.appendChild(pTitle)
    divClid.appendChild(pAuthor)
    divBtns.appendChild(divBtnRead)
    divBtns.appendChild(divBtnDelete)

    divBtns.classList.add('btns')
    divBtnRead.classList.add('btn')
    divBtnDelete.classList.add('btn')
    if (!isCheck) {
        divBtnRead.classList.add('btn-read')
        divBtnRead.textContent = 'Haven`t'
    } else {
        divBtnRead.textContent = 'Readed'
        divBtnRead.classList.add('btn-readed')
    }
    divBtnDelete.classList.add('btn-delete')

    pTitle.textContent = title.value
    pAuthor.textContent = author.value
    divBtnDelete.id = `delete${id}`
    divBtnDelete.textContent = 'Delete'
}

function handleSubmitForm() {
    setLib()
    createBook()
}

function deleteBook(_id) {
    libraryBook.removeChild($(`#book${_id}`))
}

btnAdd.onclick = (e) => {
    e.preventDefault()
    handleSubmitForm()
    resetForm()
    formAdd.classList.remove('active')
    const getAllRemoveBtn = $$('.btn-delete');
    getAllRemoveBtn.forEach((btn, index) => {
        btn.onclick = () => {
            deleteBook(index + 1)
            id--
        }
    })
}
