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






    // api handling for the products

    const category = [
        "beauty",
        "fragrances",
        "furniture",
        "groceries",
        "home-decoration",
        "kitchen-accessories",
        "laptops",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "mobile-accessories",
        "motorcycle",
        "skin-care",
        "smartphones",
        "sports-accessories",
        "sunglasses",
        "tablets",
        "tops",
        "vehicle",
        "womens-bags",
        "womens-dresses",
        "womens-jewellery",
        "womens-shoes",
        "womens-watches"
    ]




    async function loadprodcuts() {

        const products = document.querySelector('.products');
        const random = category[Math.floor(Math.random() * 24)]
        const url = `https://dummyjson.com/products/category/${random}`;

        mavic = await fetch(url);
        data = await mavic.json();
        console.log(data);
        if (data.products.length >= 10) {
            console.log('mavic')


            // product adding into the html page

            let product = document.createElement('div');
            product.className = 'product';


            let img = document.createElement('img');
            img.src = `${data.products[0].images[0]}`;
            
            let description = document.createElement('div');
            description.className = 'description';
            
            let h3 = document.createElement('h3');
            h3.innerHTML = data.products[0].title;
            
            let rating = document.createElement('div');
            rating.className = 'rating';

            
            
            product.appendChild(img)
            description.appendChild(h3);
            product.appendChild(description);
            products.appendChild(product);
        } else {
            loadprodcuts();
        }
    }

    loadprodcuts();
});