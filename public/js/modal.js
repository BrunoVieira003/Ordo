const closeBtns = document.querySelectorAll("[class^='modal-'] i")
const modals = document.querySelectorAll("[class^='modal-']")

closeBtns.forEach((btn, index)=>{
    btn.addEventListener('click', ()=>{
        modals[index].style.display = 'none'
    })
})