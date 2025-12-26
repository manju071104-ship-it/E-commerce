document.addEventListener('DOMContentLoaded', () => {


    let validate = document.querySelector('.validate');
    if (!validate) {
        return;
    }

    let pincodeisvalid = false;

    validate.addEventListener('click', (e) => {
        e.preventDefault();
        let pincode = document.querySelector('#pincode').value;
        if (pincode == 0 || pincode == null) {
            alert('please enter pincode')
        }
        console.log(pincode);
        pincodefetching(pincode);
    })





    let data = JSON.parse(localStorage.getItem('productstorender'));
    console.log(data);

    let payments = document.querySelector('.payment');
    let items = 0;
    let subtotal = 0;
    let cartHTML = '';

    function maviccc() {


        for (let e of data) {
            cartHTML += `
        <div class="cart-item">
          <img src="${e.img}" alt="">
          <p class="product-quantity">${e.quantity}</p>
          <div class="cart-info">
            <h3>${e.title}</h3>
            <p>${e.brand}</p>
          </div>
          <h3><i class="fa-solid fa-indian-rupee-sign"></i>${Math.floor(e.price * 86) * e.quantity}</h3>
        </div>`

            subtotal = subtotal + Math.floor(e.price * 86) * e.quantity

            items = items + e.quantity;

        }
        console.log(subtotal);

        payments.innerHTML = `<div class="product-cart">
             ${cartHTML}
             </div>
            <div class="total">
        <h3>price details</h3>
        <hr>
        <span>
          <h4>sub total (${items} items)</h4>
          <p><i class="fa-solid fa-indian-rupee-sign"></i>${subtotal}</p>
        </span>
        <span>
          <h4>discount</h4>
          <p><i class="fa-solid fa-indian-rupee-sign"></i>${Math.floor(subtotal * 15 / 100)}</p>
        </span>
        <span>
          <h4>delivery charges</h4>
          <p><i class="fa-solid fa-indian-rupee-sign"></i>${Math.ceil(subtotal * 10 / 100)}</p>
        </span>
        <hr>
        <span>
          <h4>total</h4>
          <p><i class="fa-solid fa-indian-rupee-sign"></i>${Math.floor(subtotal - Math.floor(subtotal * 15 / 100) + Math.ceil(subtotal * 10 / 100))}</p>
        </span>
      </div>
      <button class="pay-out" style="background-color: black; margin: 20px 0 0 0;">place order</button>`
    }

    maviccc();

    const form = document.querySelector('form');


    async function pincodefetching(zipcode) {
        let fetched = await fetch(`https://api.postalpincode.in/pincode/${zipcode}`);
        let data = await fetched.json();
        console.log(data);

        if (data[0].Status !== 'Success') {
            alert('the pincode was invalid')
            return;
        }
        pincodeisvalid = true;

        validate.innerHTML = 'validated';


        let city = document.querySelector('#city');
        let state = document.querySelector('#state');

        let subpo = data[0].PostOffice.find(po => po.BranchType == 'Sub Post Office');
        let headpo = data[0].PostOffice.find(po => po.BranchType == 'Head Post Office');

        if (headpo) {
            city.value = headpo.Name;
        } else if (subpo) {
            city.value = subpo.Name;
        } else {
            city.value = data[0].PostOffice[0].Name;
        }
        state.value = data[0].PostOffice[0].Circle;

    }
    const address = document.querySelector('.address');


    let addresscard = document.querySelector('.address-card');
    let payment = document.querySelector('.payment');

    form.addEventListener('submit', (e) => {
        let pincode = document.querySelector('#pincode').value;

        if (pincode == 0 || pincode == null) {
            alert('please enter pincode');
            validate.innerHTML = 'validate';
            e.preventDefault();
            return;

        }

        if (!pincodeisvalid) {
            alert('please validate pincode');
            validate.innerHTML = ' validate';
            e.preventDefault();
            return;
        }
        e.preventDefault();


        let formdata = new FormData(form);

        let dataa = Object.fromEntries(formdata.entries());

        console.log(dataa);

        localStorage.setItem('saved-data', JSON.stringify(dataa));


        addresscard.innerHTML = `<h2>shipping Address</h2>
        <span>
          <h4>Full name </h4>
          <p>: ${dataa.firstname + dataa.lastname}</p>
        </span>
        <span>
          <h4>phone number</h4>
          <p>: ${dataa.phonenumber}</p>
        </span>
        <span>
          <h4>address</h4>
          <p>: ${dataa.home}</p>
        </span>
        <span>
          <h4>pincode</h4>
          <p>: ${dataa.pincode}</p>
        </span>
        <span>
          <h4>city</h4>
          <p>: ${dataa.city}</p>
        </span>
        <div class="edit">
          <button id="edit"><i class="fa-regular fa-pen-to-square"></i>Edit</button>
        </div>`



        form.style.display = 'none';
        addresscard.style.display = 'flex';
        address.style.width = '35%';
        address.style.height = '330px';
        payment.style.width = '78%';



        let cartitem = document.querySelector('.cart-item');
        let productcart = document.querySelector('.product-cart');

        // if (cartitem) {
        //     cartitem.style.width = '60%';
        //     cartitem.style.height = '20%';
        // }

        // if (productcart) {
        //     productcart.style.display = 'flex';
        // }



        let editbtn = document.querySelector('#edit');

        editbtn.addEventListener('click', () => {
            addresscard.style.display = 'none';
            form.style.display = 'block';
            address.style.width = '58%';
            address.style.height = 'auto';
            payment.style.width = '40%';

            pincodeisvalid = false;

            cartitem.style.width = '100%';
            cartitem.style.height = 'auto';
            productcart.style.display = 'block';
        });

    });

    let saved = JSON.parse(localStorage.getItem('saved-data'));
    console.log(saved);

    if (saved) {
        for (let mavic in saved) {
            let input = form.elements[mavic];
            if (input) {
                input.value = saved[mavic];
            }
        }
    }


    function generateOrderId() {
        return "ORD" + Date.now() + Math.floor(Math.random() * 1000);
    }

    let payout = document.querySelector('.pay-out');
    let close = document.querySelector('.close');


    payout.addEventListener('click', () => {


        payout.classList.toggle('close');
        payout.classList.toggle('pay-out');

        payout.innerHTML='close';

        let orderId = generateOrderId();

        let totalAmount = (Math.floor(subtotal - Math.floor(subtotal * 15 / 100) + Math.ceil(subtotal * 10 / 100)));          // from your cart total

        let upiLink = `upi://pay?pa=sainath.peddapothula@ybl&pn=MyShop&am=${totalAmount}&tn=${orderId}`;

        let QR = document.getElementById("qrcode");
        QR.innerHTML = '';
        QR.style.display = 'block';

        new QRCode(QR, {
            text: upiLink,
            width: 250,
            height: 250
        });

    })

    document.addEventListener('click', (e) => {
        if (e.target.closest('.close')) {
            let QR = document.getElementById("qrcode");
            QR.style.display = 'none';

            e.target.innerHTML = 'place order'

        }
    })

})