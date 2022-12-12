const controller = document.querySelector('#menu-controller-dashboard')
const navbar = document.querySelector('.dashboard-nav')

controller.addEventListener('click', ()=>{
    if (navbar.classList.contains('menu-open')) {
        navbar.classList.remove('menu-open')
    }else{
        navbar.classList.add('menu-open')
    }
})