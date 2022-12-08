// mobile menu
const bars = document.querySelector("#bars");
const menu = document.querySelector(".index--nav--ul");
// passwords
const first_password = document.querySelector("#password");
const second_password = document.querySelector("#repeat--password");
const form = document.querySelector("#registration--form");

// parent elements gia na kanw append ta error messages
const register_container = document.querySelector(".register--container");
const payment_method = document.querySelector("#payment--method");

// error message
// const error = document.querySelector(".error");

// age
const age = document.querySelector("#date--of--birth");

// payment methods
const card = document.querySelector("#card");
const apple_pay = document.querySelector("#apple--pay");
const paypal = document.querySelector("#paypal");
// gia to mobile menu
bars.addEventListener("click", () => {
  menu.classList.toggle("mobile--menu");
});

// an ta 2 passwords tairiazoun
//xwris to if(form) exw typeError , cannot read properties of null (reading addEventListener)
if (form) {
  form.addEventListener("submit", (e) => {
    // check if passwords match

    // uncomment preventDefault for debugging
    // get the value of the two passwords and check if they match, if they do, success,else, show errow
    first_password_val = first_password.value;
    second_password_val = second_password.value;

    if (first_password_val === second_password_val) {
      console.log("passwords match! ");
    } else {
      e.preventDefault();
      console.log("passwords don't match! ");
      const error = document.createElement("p");
      error.innerHTML = "Passwords don't match!";
      second_password.parentNode.insertBefore(error, second_password);
      error.style.display = "block";
      error.classList.add("error");
    }

    //check age
    let howOld = getAge(age.value);
    if (howOld >= 16) {
      console.log("success");
    } else {
      e.preventDefault();
      console.log("error");
      const error = document.createElement("p");
      error.innerHTML = "You must be over 16 to register.";
      age.parentNode.insertBefore(error, age);
      error.style.display = "block";
      error.classList.add("error");
    }
    console.log(howOld);

    // check if a payment method is selected
    if (card.checked) {
      e.preventDefault();
      console.log("card checked");
    } else if (apple_pay.checked) {
      console.log("apple pay checkd");
    } else if (paypal.checked) {
      console.log("paypal checked");
    } else {
      console.log("nothing checked");
      const error = document.createElement("p");
      error.innerHTML = "You have to select a payment method!";
      error.style.display = "block";
      error.classList.add("error");
      // insert the error just below the Select Payment Method
      payment_method.parentNode.insertBefore(error, payment_method);
    }
  });
}

// βοηθητικη συναρτηση για να παρω την ηλικια
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// add items to cart

const remove_item_btn = document.querySelector("#remove--btn");
const add_item_btn = document.querySelector("#add--btn");
const cart_btn = document.querySelector(".add--to--cart");

const item_amount = document.querySelector("#item--amount");
const cart_items = document.querySelector("#total--cart--items");
const cart_total_amount = document.querySelector("#cart--total--amount");

let items_count = 0;
let cart_items_count = 0;
let total_amount_count = 0;

!isNaN(localStorage.getItem("items_count"))
  ? (items_count = localStorage.getItem("items_count"))
  : 0;

// localStorage.getItem("items_count") != null
//   ? (items_count = localStorage.getItem("items_count"))
//   : 0;
item_amount.innerHTML = items_count;

!isNaN(localStorage.getItem("cart_items_count"))
  ? (cart_items_count = localStorage.getItem("cart_items_count"))
  : 0;

// localStorage.getItem("cart_items_count") != null
//   ? (cart_items_count = localStorage.getItem("cart_items_count"))
//   : 0;
cart_items.innerHTML = cart_items_count;

!isNaN(localStorage.getItem("total_amount_count"))
  ? (total_amount_count = localStorage.getItem("total_amount_count"))
  : 0;

// localStorage.getItem("total_amount_count") != null
//   ? (total_amount_count = localStorage.getItem("total_amount_count"))
//   : 0;
cart_total_amount.innerHTML = total_amount_count;

remove_item_btn.addEventListener("click", (e) => {
  console.log("minus clicked");
  const parent = e.target.parentNode.parentNode;
  let priceNode = parent.querySelector(".price").innerHTML;
  let slicedPrice = priceNode.substr(0, priceNode.length - 1);
  total_amount_count += +slicedPrice;
  if (items_count > 0) {
    items_count--;

    cart_items.innerHTML = cart_items_count;
    item_amount.innerHTML = items_count;
    cart_total_amount.innerHTML = total_amount_count;

    localStorage.setItem("items_count", items_count);
    localStorage.setItem("total_amount_count", total_amount_count);
  }

  if (cart_items_count > 0) {
    cart_items_count--;
    cart_items.innerHTML = cart_items_count;
    localStorage.setItem("cart_items_count", cart_items_count);
  }
});

add_item_btn.addEventListener("click", (e) => {
  const parent = e.target.parentNode.parentNode;
  let priceNode = parent.querySelector(".price").innerHTML;
  let slicedPrice = priceNode.substr(0, priceNode.length - 1);
  console.log("plus clicked");
  items_count++;
  cart_items_count++;
  total_amount_count += +slicedPrice;

  item_amount.innerHTML = items_count;
  cart_items.innerHTML = cart_items_count;
  cart_total_amount.innerHTML = total_amount_count;

  localStorage.setItem("items_count", items_count);
  localStorage.setItem("total_amount_count", total_amount_count);
  localStorage.setItem("cart_items_count", cart_items_count);
});
