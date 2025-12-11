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

    const category1 = [
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

    const category2 = [
        "groceries",
        "kitchen-accessories",
        "mobile-accessories",
        "smartphones",
        "sports-accessories",
    ];

    section1 = document.querySelector('.products');
    section2 = document.querySelector('.products-2');


    async function loadprodcuts(products, category) {

        const random = category[Math.floor(Math.random() * category.length)]
        const url = `https://dummyjson.com/products/category/${random}`;


        mavic = await fetch(url);
        data = await mavic.json();
        console.log(data);
        if (data.products.length >= 10) {
            console.log('mavic')


            // product adding into the html page

            data.products.slice(0, 12).forEach((e, i) => {


                if (i === 0) {
                    let heading = document.createElement('h2');
                    let header = document.createElement('div');
                    header.className = 'heading';
                    heading.innerHTML = e.category;
                    header.appendChild(heading);
                    products.appendChild(header);

                }

                let product = document.createElement('div');
                product.className = 'product';
                product.id = e.id;


                let img = document.createElement('img');
                img.src = `${e.images[0]}`;

                let description = document.createElement('div');
                description.className = 'description';

                let h3 = document.createElement('h3');
                h3.innerHTML = e.title;

                let rate = document.createElement('div');
                rate.className = 'rating';
                let ratingp = document.createElement('p');
                let productbought = document.createElement('p');

                // coloring the stars used for rating

                if (Math.floor(e.rating) >= 4) {
                    ratingp.innerHTML = `<i class="fa-solid fa-star " style = "color:green; margin-right: 2px;"></i>`.repeat(Math.ceil(e.rating)) + `${e.rating}`;
                }

                else {
                    ratingp.innerHTML = `<i class="fa-solid fa-star " style = "color:red; margin-right: 2px;"></i>`.repeat(Math.ceil(e.rating)) + `${e.rating}`;
                }



                productbought.innerHTML = 'stock ' + e.stock;


                let price = document.createElement('div');
                price.className = 'price';
                let h4 = document.createElement('h4');
                h4.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>` + Math.floor(e.price * 90);
                price.appendChild(h4);



                product.appendChild(img);
                description.appendChild(h3);
                rate.appendChild(ratingp);
                rate.appendChild(productbought);
                description.appendChild(rate);
                description.appendChild(price);
                product.appendChild(description);
                products.appendChild(product);
            });

        } else {
            loadprodcuts(products, category);
        }
    }

    loadprodcuts(section1, category2);
    loadprodcuts(section2, category2);




    // intro setup

    let intro = document.querySelector('.intro');

    setTimeout(() => {
        document.body.classList.toggle('scroll') // to stop scrolling while the intro was playing
        intro.style.display = 'none';
    }, 3000);

    // on refresh to come on the top

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

});


