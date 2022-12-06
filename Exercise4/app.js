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

form.addEventListener("submit", (e) => {
  // check if passwords match
  // e.preventDefault();
  // uncomment preventDefault for debugging
  // get the value of the two passwords and check if they match, if they do, success,else, show errow
  first_password_val = first_password.value;
  second_password_val = second_password.value;

  if (first_password_val === second_password_val) {
    console.log("passwords match! ");
  } else {
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
