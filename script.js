let carts = document.querySelectorAll('.add-cart');

let products = [
  {
    name : 'body lotion',
    tag : 'bodylotion',
    price : 20,
    inCart : 0
  },
  {
    name : 'foundation',
    tag : 'foundation',
    price : 18,
    inCart : 0
  },
  {
    name : 'hair shampoo',
    tag : 'hairshampoo',
    price : 15,
    inCart : 0
  },
  {
    name : 'daily cream',
    tag : 'dailycream',
    price : 10,
    inCart : 0
  },
  {
    name : 'lipstick',
    tag : 'lipstick',
    price : 9,
    inCart : 0
  },
  {
    name : 'hair conditioner',
    tag : 'hairconditioner',
    price : 12,
    inCart : 0
  },
  {
    name : 'makeup spray',
    tag : 'makeupspray',
    price : 15,
    inCart : 0
  },
  {
    name : 'compact',
    tag : 'compact',
    price : 20,
    inCart : 0
  },
  {
    name : 'hair cream',
    tag : 'haircream',
    price : 10,
    inCart : 0
  },
  {
    name : 'cream pot',
    tag : 'creampot',
    price : 10,
    inCart : 0
  },
  {
    name : 'nailpolish',
    tag : 'nailpolish',
    price : 7,
    inCart : 0
  },
  {
    name : 'hair serum',
    tag : 'hairserum',
    price : 7,
    inCart : 0
  }
];

for(let i=0; i<carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function displayFooter(){
  let foot = document.querySelector('#footer');
  foot.innerHTML = `
  <footer id="main-footer" class="text-center bg-darkpink">
      <div class="row pt-5 pb-3">
        <div class="col text-white">
          <i class="fab fa-twitter-square fa-2x m-3"></i>
          <i class="fab fa-facebook-square fa-2x m-3"></i>
          <i class="fab fa-instagram-square fa-2x m-3"></i>
        </div>
      </div>
      <div class="row pb-5">
        <div class="col text-white">
          <p class="footer-text">&copy;<span id="year"></span>kasial. professional makeup artist. all rights reserved. |   123 street name   •   city name, state 123456   |   123.456.7890   |   kasial@makeupartistry.com</p>
        </div>
      </div>
  </footer>
  `;
}
function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }
  displayFooter();
  cartSummary();
}
function cartNumbers(product){
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  localStorage.setItem('cartNumbers',1);

  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('.cart span').textContent = productNumbers+1;
  } else {
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.cart span').textContent = 1;
  }
  setItems(product);
}

function setItems(product){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null){
    if (cartItems[product.tag] == undefined){
      cartItems = {
        ...cartItems,
        [product.tag] : product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag] : product
    }
  }

  localStorage.setItem('productsInCart',JSON.stringify(cartItems));
  console.log(cartItems);
}

function totalCost(product){
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost+product.price);
  } else {
    localStorage.setItem("totalCost",product.price);
  }
}

function displayCart(){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let products = document.querySelector('.products');
  let netTotal = localStorage.getItem("totalCost");
  let cartSummary = document.querySelector('.cart-summary');
  if (cartItems && products){
    products.innerHTML = '';
    Object.values(cartItems).map(items => {
      products.innerHTML += `
      <div class = "item">
      <i class="fas fa-times-circle remove-item"></i>
      <div class='item-name'>
        <img class='item-image' src='img/${items.tag}.png'>
        <h4>${items.name}</h4>
      </div>
      <div class="item-price"><p>$ ${items.price}.00</p></div>
      <div class="item-quantity">
      <i class="fas fa-chevron-circle-left dec-btn icon-big-scr"></i>
      ${items.inCart}
      <i class="fas fa-chevron-circle-right inc-btn icon-big-scr"></i>
      </div>
      <div class="item-total"><p>$ ${items.inCart*items.price}.00</p></div>
      </div>
      `;
    });
  products.innerHTML += `
  <div class="basketTotalDetails">
  <h4 class="basketTotalTitle">Total Amount :</h4>
  <h4 class="basketTotal">$ ${netTotal}.00</h4>
  </div>`;
  }
  if(cartItems){
    let cartValues = Object.values(cartItems);
    let deleteButton = document.querySelectorAll('.remove-item');
    for(let i=0; i<deleteButton.length; i++){
      deleteButton[i].addEventListener('click', () => {
        let item = cartValues[i];
        removeCartItem(cartValues,item);
      })
    }
    let incBtn = document.querySelectorAll('.inc-btn');
    let decBtn = document.querySelectorAll('.dec-btn');
    let cartNos = localStorage.getItem('cartNumbers');
    cartNos = JSON.parse(cartNos);
    let totalAmt = localStorage.getItem('totalCost');
    totalAmt = JSON.parse(totalAmt);
      for(let x=0; x<cartValues.length; x++){
        if(incBtn[x] != null){
          incBtn[x].addEventListener('click', () => {
            cartValues[x].inCart += 1;
            cartNos += 1;
            totalAmt = totalAmt + cartValues[x].price;
            localStorage.setItem('productsInCart',JSON.stringify(cartValues));
            localStorage.setItem('cartNumbers',JSON.stringify(cartNos));
            localStorage.setItem('totalCost',JSON.stringify(totalAmt));
            displayCart();
            onLoadCartNumbers();
          })
        }
        if (decBtn[x] != null){
          decBtn[x].addEventListener('click', () => {
            if(cartValues[x].inCart > 1){
              cartValues[x].inCart -= 1;
              cartNos -= 1;
              totalAmt = totalAmt - cartValues[x].price;
              localStorage.setItem('productsInCart',JSON.stringify(cartValues));
              localStorage.setItem('cartNumbers',JSON.stringify(cartNos));
              localStorage.setItem('totalCost',JSON.stringify(totalAmt));
              displayCart();
              onLoadCartNumbers();
            }
          })
        }
      }
  }
}

function removeCartItem(cartValues,item){
  let cartNos = localStorage.getItem('cartNumbers');
  let totalAmt = localStorage.getItem('totalCost');
  cartNos = JSON.parse(cartNos);
  totalAmt = JSON.parse(totalAmt);
  let index = cartValues.indexOf(item);
  cartValues.splice(index,1);
  localStorage.setItem('productsInCart', JSON.stringify(cartValues));
  // Update cartNumbers
  localStorage.setItem('cartNumbers',cartNos-item.inCart);
  onLoadCartNumbers();
  // Update TotalCost
  let itemCost = item.inCart*item.price;
  let updatedAmt = totalAmt - itemCost;
  localStorage.setItem('totalCost',updatedAmt);
  displayCart();
}

// ------ Product Categorization -------

let haircare = document.querySelector('.thumbnail-haircare');
let skincare = document.querySelector('.thumbnail-skincare');
let makeup = document.querySelector('.thumbnail-makeup');
let count = document.querySelector('.item-count');
let showall = document.querySelector('.show-all');
$('.show-all').hide();

if(haircare != null){
  haircare.addEventListener('click', () => {
    count.innerHTML = "haircare (4)";
    $('.image').filter('.haircare').show();
    $('.image').filter('.skincare').hide();
    $('.image').filter('.makeup').hide();
    $('.show-all').show();
  })
}

if (skincare != null){
  skincare.addEventListener('click', () => {
    count.innerHTML = "skincare (4)";
    $('.image').filter('.haircare').hide();
    $('.image').filter('.skincare').show();
    $('.image').filter('.makeup').hide();
    $('.show-all').show();
  })
}

if (makeup != null){
  makeup.addEventListener('click', () => {
    count.innerHTML = "makeup (4)";
    $('.image').filter('.haircare').hide();
    $('.image').filter('.skincare').hide();
    $('.image').filter('.makeup').show();
    $('.show-all').show();
  })
}

if (showall != null){
  showall.addEventListener('click',() => {
    count.innerHTML = "all products";
    $('.image').show();
    $('.show-all').hide();
  })
}

// ****** Payment Accordion ******

$('#r1').on('click',function(){
  $(this).parent().find('a').trigger('click');
})
$('#r2').on('click', function(){
  $('#collapseOne').collapse('hide');
})

// ********* cart summary *********

function cartSummary(){
  let cartProducts = localStorage.getItem('productsInCart');
  cartProducts = JSON.parse(cartProducts);
  let cartTotal = localStorage.getItem('totalCost');
  cartTotal = JSON.parse(cartTotal);
  let cartSummary = document.querySelector('.checkout-summary');

  if (cartSummary && cartProducts){
    let tax = (cartTotal * 0.1).toFixed(2);
    tax = parseFloat(tax);
    let total = cartTotal + tax;
    cartSummary.innerHTML = '';
    Object.values(cartProducts).map(item => {
      let price = item.price * item.inCart;

      cartSummary.innerHTML += `
      <div class='checkout-item'>
        <img class='checkout-image' src='img/${item.tag}.png'>
        <div class='checkout-details'>
        <h4>${item.name} (${item.inCart})</h4>
        <span>$ ${price.toFixed(2)}</span>
        </div>
      </div>
      `;
    })
    cartSummary.innerHTML += `
    <div class="checkout-total">
    <h4 class="checkout-total-text"><span> subtotal :</span><span> $ ${cartTotal.toFixed(2)}</span></h4>
    <h4 class="checkout-total-text"><span> shipping :</span><span> free </span></h4>
    <h4 class="checkout-total-text"><span> taxes :</span><span> $ ${tax.toFixed(2)} </span></h4>
    <h4 class="order-total"><span> order total :</span><span> $ ${total.toFixed(2)} </span></h4>
    </div>`;
  }
}
let bookBtn = document.querySelector('.btn-book');
if (bookBtn){
  bookBtn.addEventListener('click',() => {
    $('#book-modal').modal('show');
  })
}

$('.btn-submit').click(function() {
  let fName = document.querySelector('#firstname').value;
  let lName = document.querySelector('#lastname').value;
  let email = document.querySelector('#email-id').value;
  let phone = document.querySelector('#phone-no').value;
  let service = document.querySelector('#service-type').value;
  if(fName == "" || lName == "" || email == "" || phone == "" || service == "type of service"){
    document.querySelector(".empty-booking").style.display="block";
  } else {
    $('#book-modal').modal('hide');
  }
});

onLoadCartNumbers();
displayCart();

// ------- login page -------
const loginBtn = document.querySelector(".login-btn"),
      registerBtn = document.querySelector(".register-btn"),
      box = document.querySelector(".box"),
      loginForm = document.querySelector(".login-form"),
      registerForm = document.querySelector(".register-form");

if (loginBtn){
  loginBtn.addEventListener("click",() => {
    box.classList.remove("slide-active");
    registerForm.classList.add("form-hidden");
    loginForm.classList.remove("form-hidden");
  });
}

if (registerBtn){
  registerBtn.addEventListener("click",() => {
    box.classList.add("slide-active");
    registerForm.classList.remove("form-hidden");
    loginForm.classList.add("form-hidden");
  });
}

const registerSubmitBtn = document.querySelector(".register-submit-btn");
const loginSubmitBtn = document.querySelector(".login-submit-btn");

if(registerSubmitBtn){
  registerSubmitBtn.addEventListener("click", () => {
    const loginSubmitBtn = document.querySelector(".login-submit-btn");
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;
    const emailInput = document.querySelector("#email-input").value;
    const pwdInput = document.querySelector("#pwd-input").value;

    console.log(`first name :${firstName}`);
    console.log(`last name :${lastName}`);
    console.log(`email :${emailInput}`);
    console.log(`password :${pwdInput}`);
    localStorage.setItem('name',firstName);
    localStorage.setItem('email',emailInput);
    localStorage.setItem('pwd',pwdInput);
    if (firstName === "" || lastName==="" || emailInput==="" || pwdInput==="" ){
      document.querySelector(".empty").style.display="block";
    }
    else {
      window.location.pathname = "/checkout.html";
    }
  });
}

if (loginSubmitBtn){
  loginSubmitBtn.addEventListener("click", () => {
    const emailLogin = document.querySelector("#email-login").value;
    const pwdLogin = document.querySelector("#pwd-login").value;
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const pwd = localStorage.getItem('pwd');

    if ((emailLogin === email ) && (pwdLogin === pwd)){
      window.location.pathname = "/checkout.html";
    } else {
      document.querySelector(".invalid").style.display="block";
    }
  });
}
let loginUser = document.querySelector('.login-user');
let loggedInUser = localStorage.getItem('name');
if (loggedInUser && loginUser){
  loginUser.textContent = `hi ${loggedInUser},`;
}
let orderBtn = document.querySelector('.order-btn');
if (orderBtn){
  orderBtn.addEventListener('click',() => {
    const bfname = document.querySelector("#billFname").value;
    const blname = document.querySelector("#billLname").value;
    const baddress = document.querySelector("#billAddress").value;
    const bcity = document.querySelector("#billCity").value;
    const bstate = document.querySelector("#billState").value;
    const bzip = document.querySelector("#billZip").value;
    const paycard = document.querySelector("#r1").checked;
    const paycash = document.querySelector("#r2").checked;
    console.log(paycard);
    console.log(paycash);
    if (bfname==="" || blname==="" || baddress ==="" || bcity==="" || bstate==="" || bzip===""){
      document.querySelector(".empty-billing").style.display="block";
    }
    else if (paycard === false && paycash ===false){
      document.querySelector(".empty-payinfo").style.display="block";
    }
    else if (paycard === true){
      const payNumber = document.querySelector("#pay-card-number").value;
      const payName = document.querySelector("#pay-card-name").value;
      const payCvv = document.querySelector("#pay-card-cvv").value;
      if (payNumber==="" || payName==="" || payCvv ===""){
        document.querySelector(".empty-paycardinfo").style.display="block";
      }
    }
    else {
      $('#order-modal').modal('show');
      localStorage.removeItem('productsInCart');
      localStorage.removeItem('totalCost');
      localStorage.removeItem('cartNumbers');
    }
  })
}
