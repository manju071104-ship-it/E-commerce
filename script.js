document.addEventListener('DOMContentLoaded', () => {
    const menuicon = document.querySelector('.menuicon');
    const navmenu = document.querySelector('.nav-menu');
    menuicon.addEventListener('click', () => {
        navmenu.classList.toggle('active');
    })

    // creating slider 

    let slideindex = 0;

    function slider(index) {
        const images = document.querySelectorAll('.images img');
        console.log(images);

        if (index >= images.length) {
            slideindex = 0;
        }
        images.forEach(img => {
            img.style.display = 'none';
        });
        images[slideindex].style.display = 'block';
    }
    function next() {
        slideindex++
        slider(slideindex);
    }
    setInterval(next, 3000)
    slider(0);


    // sliding cart creation 

    let cart = document.querySelector('.cart-slide');
    let slidingcart = document.querySelector('.cart');
    let closecart = document.querySelector('.close-cart');
    let slidingcartmobile = document.querySelector('.cart-mobile');
    let closecartmobile = document.querySelector('.close-mobile .close-cart');

    cart.addEventListener('click', (e) => {
        e.preventDefault();
        slidingcart.classList.toggle('active');
        slidingcartmobile.classList.toggle('active');
    })
    closecart.addEventListener('click', (e) => {
        e.preventDefault();
        slidingcart.classList.toggle('active');
    })
    closecartmobile.addEventListener('click', (e) => {
        e.preventDefault();
        slidingcartmobile.classList.toggle('active');
    })
});