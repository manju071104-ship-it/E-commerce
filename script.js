document.addEventListener('DOMContentLoaded', () => {
    const menuicon = document.querySelector('.menuicon');
    const navmenu = document.querySelector('.nav-menu');
    if (menuicon && navmenu) {
        menuicon.addEventListener('click', () => {
            navmenu.classList.toggle('active');
        });

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
                    heart.className = 'fa-regular fa-heart wishlistitem';

                    const cart = document.createElement('i');
                    cart.className = 'fa-solid fa-cart-shopping productcart';

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

        const introseen = sessionStorage.getItem('introseen');
        if (introseen) {
            intro.style.display = 'none';
            document.body.classList.toggle('scroll')
        }
        else {


            setTimeout(() => {
                document.body.classList.toggle('scroll') // to stop scrolling while the intro was playing
                intro.style.display = 'none';
                sessionStorage.setItem('introseen', 'true');
            }, 3000);
        }

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
                    heart.className = 'fa-regular fa-heart wishlistitem';

                    const cart = document.createElement('i');
                    cart.className = 'fa-solid fa-cart-shopping productcart';

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
            heart.className = 'fa-regular fa-heart wishlistitem';

            const cart = document.createElement('i');
            cart.className = 'fa-solid fa-cart-shopping productcart';

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
let wishcount = 0;
let cartcount = 0;
let productsincart = [];

document.body.addEventListener('click', (e) => {

    const ismenu = e.target.closest('.menuicon, .nav-menu, .cart-slide, #home');

    const productid = e.target.closest('.product');
    const cartbtn = e.target.closest('.productcart');
    const wishlist = e.target.closest('.wishlistitem');




    if (cartbtn) {
        e.stopPropagation();
        cartcount++

        if (cartcount % 2 == 0) {
            cartbtn.classList.toggle('fa-solid');
            cartbtn.style.color = 'black';
            return;
        } else {
            cartbtn.classList.toggle('fa-solid');
            cartbtn.style.color = 'green';
            productidofcart = cartbtn.closest('.product').getAttribute('id');
            let item = productsincart.find(p => p.id === productidofcart);
            if (item) {
                item.qty++;
            }
            else {

                productsincart.push({ id: productidofcart, qty: 1 });
            }
            console.log(productsincart);
            addtocart(productsincart)
        }


        e.preventDefault();
        return;
    }
    if (wishlist) {
        e.stopPropagation();
        e.preventDefault();

        wishcount++

        if (wishcount % 2 == 0) {
            wishlist.classList.toggle('fa-regular');
            wishlist.style.color = 'black';

        } else {
            wishlist.classList.toggle('fa-solid');
            wishlist.style.color = 'red';
            wishlistofid = wishlist.closest('.product').getAttribute('id');
            console.log(wishlistofid);
        }


        return;
    }


    if (ismenu) {
        return;
    }

    if (productid) {
        let productidd = productid.getAttribute('id');
        localStorage.setItem('product-id', productidd);

        window.open('product.html', '_blank');
    }

})


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('buy')) {
        console.log('mavvic');
        window.location.href = 'buy.html';
    }
});







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
                 ${`<i class="fa-solid fa-indian-rupee-sign"></i>` + Math.ceil(data.price) * 86}<del>${`<i class="fa-solid fa-indian-rupee-sign"></i>` + Math.ceil(((data.price + (data.price * data.discountPercentage / 100)) * 86))}</del>
                <pre>${data.discountPercentage}%off</pre>
              </h1>
            </div>
            <p style= "margin:10px 0;font-size:16px;font-weight:bold;">${data.availabilityStatus}</p>
            <div class="descr">
              <p>${data.description}</p>
            </div>
          </div>
            <p style= "margin:10px 0 0 0;font-size:30px;font-weight:bold;">${data.warrantyInformation}</p>
            <p style= "margin:10px 0 0 0;font-size:16px;font-weight:bold;">${data.shippingInformation}</p>
            <p style= "margin:10px 0 0 0;font-size:16px;font-weight:bold;">${data.returnPolicy}</p>
          <div class="buynow">
            <button class = "productcart" id = "${data.id}"><i class="fa-solid fa-cart-shopping"></i>add to cart</button>
            <button class = "buy"><i class="fa-solid fa-bag-shopping"></i>buy now</button>
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

        fetching(datacategory.products, categoryproducts);

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
    });


})

let wishlistproducts = [];
let wishlistofid;


let productidofcart;

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('productcart')) {
        productidofcart = e.target.getAttribute('id');
    };
    console.log(productidofcart);

});

let cartitems = document.querySelector('.cart-items');
let cartitemsmobile = document.querySelector('.cart-mobile-items');

let productstorender = [];
let isRenderingCart = false;

async function addtocart(productcart) {

    if (isRenderingCart) return;
    isRenderingCart = true;

    cartitems.innerHTML = '';
    cartitemsmobile.innerHTML = '';

    productstorender = [];

    for (let e of productcart) {

        let fetchproduct = await fetch(`https://dummyjson.com/products/${e.id}`);

        let data = await fetchproduct.json();
        console.log(data);


        if (data.brand == null || 0) {
            data.brand = 'no brand';
        }

        productstorender.push({ id: data.id, img: data.images[0], brand: data.brand, title: data.title, price: data.price, quantity: e.qty });

        localStorage.setItem('productstorender', JSON.stringify(productstorender));


        console.log(productstorender);

        isRenderingCart = false;

    };

}

let cartt = document.querySelector('.cart-slide');
cartt.addEventListener('click', () => {

    for (let e of productstorender) {
        cartitems.innerHTML += `<div class="cart-item">
          <img src="${e.img}" alt="">
          <p class="product-quantity">${e.quantity}</p>
          <div class="cart-info">
            <h3>${e.title}</h3>
            <p>${e.brand || 'no brand'}</p>
          </div>
          <h3><i class="fa-solid fa-indian-rupee-sign"></i>  ${Math.floor((e.price * 86) * e.quantity)}</h3>
        </div>`;
    }

});


let openbuy = document.querySelector('.openbuy');

if (productsincart === 0) {
    openbuy.style.display = 'none';
}

openbuy.addEventListener('click', () => {
    window.open('buy.html', '_blank')
})








