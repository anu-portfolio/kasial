let carts = document.querySelectorAll('.add-cart');

let products = [
  {
    name : 'body lotion',
    tag : 'bodylotion',
    price : 20,
    inCart : 0
  },
  {
    name : 'daily cream',
    tag : 'dailycream',
    price : 10,
    inCart : 0
  },
  {
    name : 'makeup spray',
    tag : 'makeupspray',
    price : 15,
    inCart : 0
  },
  {
    name : 'cream pot',
    tag : 'creampot',
    price : 10,
    inCart : 0
  },
  {
    name : 'foundation',
    tag : 'foundation',
    price : 18,
    inCart : 0
  },
  {
    name : 'lipstick',
    tag : 'lipstick',
    price : 9,
    inCart : 0
  },
  {
    name : 'compact',
    tag : 'compact',
    price : 20,
    inCart : 0
  },
  {
    name : 'nailpolish',
    tag : 'nailpolish',
    price : 7,
    inCart : 0
  },
];

for(let i=0; i<carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}


function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }
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
  if (cartItems && products){
    products.innerHTML = '';
    Object.values(cartItems).map(items => {
      products.innerHTML += `
      <div class = "item">
      <div class='item-name'>
        <i class="fas fa-times-circle remove-item"></i>
        <img class='item-image' src='img/${items.tag}.png'>
        <span>${items.name}</span>
      </div>
      <div class="item-price">${items.price}</div>
      <div class="item-quantity">
      <i class="fas fa-chevron-circle-left dec-btn"></i>
      ${items.inCart}
      <i class="fas fa-chevron-circle-right inc-btn"></i>
      </div>
      <div class="item-total">${items.inCart*items.price}</div>
      </div>
      `
    });
  products.innerHTML += `
  <div class="basketTotal">
  <h4 class="basketTotalTitle">Total Amount :</h4>
  <h4 class="basketTotal">${netTotal}</h4>
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
        decBtn[x].addEventListener('click', () => {
          if(cartValues[x].inCart >= 1){
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


onLoadCartNumbers();
displayCart();
