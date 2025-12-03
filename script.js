document.addEventListener('DOMContentLoaded',()=>{
    const menuicon = document.querySelector('.menuicon');
    const navmenu = document.querySelector('.nav-menu');
    menuicon.addEventListener('click',()=>{
        navmenu.classList.toggle('active');
    })
});