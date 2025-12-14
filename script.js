document.addEventListener('DOMContentLoaded', () => {


    // creating slider 
    if (document.body.classList.contains('home')) {
        const menuicon = document.querySelector('.menuicon');
        const navmenu = document.querySelector('.nav-menu');
        menuicon.addEventListener('click', () => {
            navmenu.classList.toggle('active');
        })

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

        // button event for women products

        let womenbutton = document.querySelector('#womenbutton');

        if (womenbutton) {
            womenbutton.addEventListener('click', () => {
                window.location.href = 'category.html';
            })
        }


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

                    let name = document.createElement('div');
                    name.className = 'name';
                    let h4 = document.createElement('h4');
                    h4.innerHTML = e.title;
                    name.appendChild(h4);

                    let description = document.createElement('div');
                    description.className = 'description';

                    let image = document.createElement('div');
                    image.className = 'image';
                    let img = document.createElement('img');
                    img.src = e.images[0];
                    image.appendChild(img);
                    description.appendChild(image);

                    let price = document.createElement('div');
                    price.className = 'price';


                    let pricing = document.createElement('div');
                    pricing.className = 'pricing';

                    let h6 = document.createElement('h6');
                    h6.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>` + Math.ceil(((e.price + e.discountPercentage) * 86));
                    let h44 = document.createElement('h4');
                    h44.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>` + Math.ceil(e.price) * 86;

                    pricing.appendChild(h6);
                    pricing.appendChild(h44);


                    price.innerHTML = ''; // clear first

                    const heart = document.createElement('i');
                    heart.className = 'fa-regular fa-heart';

                    const cart = document.createElement('i');
                    cart.className = 'fa-solid fa-cart-shopping';

                    price.append(heart, pricing, cart);

                    description.appendChild(price);

                    product.appendChild(name);
                    product.appendChild(description);
                    products.appendChild(product);






                });

            } else{
                loadprodcuts(products,category2)
            }
        }

        loadprodcuts(section1, category2);
        loadprodcuts(section2, category2);




        // intro setup

        let intro = document.querySelector('.intro');

        setTimeout(() => {
            document.body.classList.toggle('scroll') // to stop scrolling while the intro was playing
            intro.style.display = 'none';
        }, 1000);

    }

    // on refresh to come on the top

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }


    // category page js

    if (document.body.classList.contains('category-body')) {

        const categoryproducts = document.querySelector('.products');


        const women = ["womens-dresses", "womens-jewellery", "womens-bags", "womens-shoes", "tops", "womens-watches"];

        const men = ["mens-shirts", "mens-shoes", "mens-watches",];

        const mobile = ["smartphones", "mobile-accessories"];

        const laptop = ["laptops", "tablets"];

        const sports = ["sports-accessories"];

        const kitchen = ["kitchen-accessories"];

        const beauty = ["beauty", "fragrances", "skin-care", "sunglasses"];

        const others = ["furniture", "groceries", "home-decoration", "motorcycle", "vehicle"];

        const categoryList = [
            ["women", women],
            ["men", men],
            ["mobile", mobile],
            ["laptop", laptop],
            ["sports", sports],
            ["kitchen", kitchen],
            ["beauty", beauty],
            ["others", others]
        ];


        // category name getting by clicking the category in html page

        let categoryheads = document.querySelectorAll('.category h4');

        categoryheads.forEach(h4 => {

            h4.addEventListener('click', () => {

                let categoryselected = h4.getAttribute('id');
                console.log(categoryselected)
                let selectedArray = [];

                for (const item of categoryList) {
                    if (item[0] === categoryselected) {
                        selectedArray = item[1];
                        break;
                    }
                }
                categoryproducts.innerHTML = ""; //remove old products
                loadcategoryproducts(selectedArray);

            })
        })

        loadcategoryproducts(women);

        // loading category products 



        async function loadcategoryproducts(categoryselected) {

            for (let element = 0; element < categoryselected.length; element++) {

                console.log(categoryselected[element])

                let mavic = await fetch(`https://dummyjson.com/products/category/${categoryselected[element]}`)
                let data = await mavic.json();
                console.log(data);



                data.products.forEach(e => {

                    let product = document.createElement('div');
                    product.className = 'product';
                    product.id = e.id;

                    let name = document.createElement('div');
                    name.className = 'name';
                    let h4 = document.createElement('h4');
                    h4.innerHTML = e.title;
                    name.appendChild(h4);

                    let description = document.createElement('div');
                    description.className = 'description';

                    let image = document.createElement('div');
                    image.className = 'image';
                    let img = document.createElement('img');
                    img.src = e.images[0];
                    image.appendChild(img);
                    description.appendChild(image);

                    let price = document.createElement('div');
                    price.className = 'price';


                    let pricing = document.createElement('div');
                    pricing.className = 'pricing';

                    let h6 = document.createElement('h6');
                    h6.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>` + Math.ceil(((e.price + e.discountPercentage) * 86));
                    let h44 = document.createElement('h4');
                    h44.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>` + Math.ceil(e.price) * 86;

                    pricing.appendChild(h6);
                    pricing.appendChild(h44);


                    price.innerHTML = ''; // clear first

                    const heart = document.createElement('i');
                    heart.className = 'fa-regular fa-heart';

                    const cart = document.createElement('i');
                    cart.className = 'fa-solid fa-cart-shopping';

                    price.append(heart, pricing, cart);

                    description.appendChild(price);

                    product.appendChild(name);
                    product.appendChild(description);
                    categoryproducts.appendChild(product);

                });

            };

        }



    }

});


