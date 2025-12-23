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

            } else {
                loadprodcuts(products, category2)
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



    let searchbutton = document.getElementById('searchbutton');

    function searchproducts() {
        let search = document.getElementById('search').value.trim();

        if (search == '') {
            search = 'phone';
        }
        console.log(search)
        localStorage.setItem('searched', search);
        window.open("searched.html", "_blank");

    }

    if (searchbutton) {
        searchbutton.addEventListener('click', searchproducts);
        if (document.body.classList.contains('searched')) {
            div = document.createElement('h1');
            document.body.appendChild(div);
        }


    }

});
document.addEventListener('DOMContentLoaded', () => {

    if (!document.body.classList.contains('searched')) return;

    let search = localStorage.getItem('searched');
    (async () => {
        let searchedproducts = document.querySelector('.products');
        let noresults = document.querySelector('.no-results');

        let mavic = await fetch(`https://dummyjson.com/products/search?q=${search}`)
        let data = await mavic.json();

        if (data.products.length === 0) {
            noresults.style.display = 'flex';
        }
        else {
            noresults.style.display = 'none';
            searchedproducts.innerHTML = '';
        }

        document.body.style.overflow = 'auto';

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
            searchedproducts.appendChild(product);
        })
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

    })();

    document.getElementById('home').addEventListener('click', () => {
        window.location.href = "index.html";
    });




});


// user clicks a product

document.body.addEventListener('click', (e) => {
    if (e.target.closest('.product')) {

        const productid = e.target.closest('.product').getAttribute('id')
        localStorage.setItem('product-id', productid)

        window.open('product.html', '_blank');
    }
})

document.addEventListener('DOMContentLoaded', () => {


    if (!document.body.classList.contains('product-page')) return;
    console.log('mavic');



    let productidd = localStorage.getItem('product-id');
    console.log(productidd);

    Productdetails();







    async function Productdetails() {
        let fetched = await fetch(`https://dummyjson.com/products/${productidd}`)
        let data = await fetched.json();
        console.log(data);
        
        let productmain = document.querySelector('.product-main');
        productmain.innerHTML = `<div class="product-needs">
        <div class="image product-slider">
        ${data.images.map(img => `<img src="${img}">`).join("")}
          <div class="arrow-button">
            <i class="fa-solid fa-arrow-left left-arrow"></i
            ><i class="fa-solid fa-arrow-right right-arrow"></i>
          </div>
        </div>

        <div class="product-information">
          <div class="description">
            <div class="product-price">
              <h1>${data.title}</h1>
              <h2>${data.brand || "no brand"}</h2>
              <div class="product-rating">
                <pre>${data.rating + `<i class="fa-solid fa-star icon"></i>`}</pre>
                <pre>${(data.reviews.length + 1) + ' Reviews'}</pre>
              </div>
              <h1 id='heading' style="width: 80%; display: inline-flex; align-items: center">
                 ${`<i class="fa-solid fa-indian-rupee-sign"></i>` + Math.ceil(data.price) * 86}<del>${`<i class="fa-solid fa-indian-rupee-sign"></i>` + Math.ceil(((data.price + data.discountPercentage) * 86))}</del>
                <pre>${data.discountPercentage}%off</pre>
              </h1>
            </div>

            <div class="descr">
              <p>${data.description}</p>
            </div>
          </div>
            <p style= "margin:10px 0 0 0;font-size:30px;font-weight:bold;">${data.warrantyInformation}</p>
          <div class="buynow">
            <button><i class="fa-solid fa-cart-shopping"></i>add to cart</button>
            <button><i class="fa-solid fa-bag-shopping"></i>buy now</button>
          </div>
          <div class="reviews">
            <h2>Rating & Reviews</h2>
            ${data.reviews.map(review => `
                <div class="star">
              <pre>${review.rating}<i class="fa-solid fa-star icon-small"></i></pre>
              <p>super!</p>
            </div>
            <p>${review.comment}</p>
            <div class="username">
              <p>${review.reviewerName}</p>
              <p>${review.date.slice(0, 10)}</p>
              <p>${review.reviewerEmail}</p>
            </div>`).join('')}
          </div>
        </div>
      </div>`
        console.log(productmain)


        let productslide = document.querySelectorAll('.product-slider img');
        console.log(productslide);

        let slideindex = 0;

        function slide() {
            for (let i = 0; i < productslide.length; i++) {
                productslide[i].style.display = 'none';
            }
            if (productslide.length === 0) return;
            productslide[slideindex].style.display = 'block';
        }
        slide();

        let mavic;
        let restartslide;

        function startautoslide() {
            clearInterval(mavic);
            mavic = setInterval(() => {
                slideindex++
                if (slideindex >= productslide.length) {
                    slideindex = 0;
                }
                slide();
            }, 3000);
        }
        startautoslide();

        const arrows = document.querySelector('.arrow-button');
        if (arrows === null) {
            return
        }
        else {

            arrows.addEventListener('click', (e) => {

                clearInterval(mavic);
                clearTimeout(restartslide);

                if (e.target.closest('.left-arrow')) {
                    slideindex--
                    if (slideindex < 0) {
                        slideindex = productslide.length - 1;
                    }
                    slide();
                }

                if (e.target.closest('.right-arrow')) {
                    slideindex++
                    if (slideindex >= productslide.length) {
                        slideindex = 0;
                    }
                    slide();
                }

                restartslide = setTimeout(startautoslide, 6000);

            });
        }
        let fetchedcategory = await fetch(`https://dummyjson.com/products/category/${data.category}`)
        let datacategory = await fetchedcategory.json();
        console.log(datacategory);

        let categoryproducts = document.querySelector('.productcategory');
        let category = document.querySelector('#category');
        category.innerHTML = data.category;

        function fetching(listofproducts, container) {
            listofproducts.forEach(e => {

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
                container.appendChild(product);

            });
        }

        fetching(datacategory.products,categoryproducts);

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

})



