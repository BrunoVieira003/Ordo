const controller = document.querySelector('#menu-controller')
const navbar = document.querySelector('.navbar')

controller.addEventListener('click', ()=>{
    if (navbar.classList.contains('responsive-menu')) {
        navbar.classList.remove('responsive-menu')
    }else{
        navbar.classList.add('responsive-menu')
    }
})