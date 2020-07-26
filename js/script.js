const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("mail");
const colorOpt = document.querySelector("#color");
const designOpt = document.querySelector("#design");
const paymentOpt = document.querySelector("#payment");
const activies = document.querySelectorAll("input[type=checkbox]");
const activiesSection = document.querySelector(".activities");
const color = document.querySelector(".color");
const submit = document.querySelector("button[type=submit]");
const creditCard = document.querySelector(".credit-card");
const title = document.querySelector("#title");
const payPal = document.querySelector(".paypal");
const bitCoin = document.querySelector(".bitcoin");
const ccNum = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const JSPune = /(JS Puns)/;
const JSpuneList = [];
const JSHeartList = [];
let totalCost = 0;
const colorOptCount = colorOpt.length;
let formIsValid = false;

init();

/* Initial setup on the page by sorting dropdown options for color selection
   as well as hiding payment options expect credit card
*/
function init() {
  for (let i = 0; i < colorOpt.length; i++) {
    if (JSPune.test(colorOpt[i].innerText)) {
      JSpuneList.push(colorOpt[i]);
    } else if (!JSPune.test(colorOpt[i].innerText)) {
      JSHeartList.push(colorOpt[i]);
    }
  }
  payPal.style.display = "none";
  creditCard.style.display = "";
  bitCoin.style.display = "none";
  document.querySelector(".other").style.display = "none";
  const firstEl = paymentOpt.firstElementChild;
  paymentOpt.remove(firstEl);
  cleanSelection();
  defaultOpt();
}
/* color dropdown option with a default text to choose the theme but since I implemented the 
hide option on color dropdown with the theme selection so this setup is regardless but still I left in the 
program*/
function defaultOpt() {
  //
  const de = document.createElement("option");
  de.innerText = "Please select a T-shirt theme";
  colorOpt.append(de);

  color.style.display = "none";
}
/* Clearning the color options after saving and sorting them in seperate arrays*/
function cleanSelection() {
  for (let i = 0; i < colorOptCount; i++) {
    colorOpt.remove(colorOpt[i]);
  }
}

//credit card validation with regular expression method
function isValidCard(card) {
  ccNum.nextElementSibling.innerText = "Credit Card must be 16 digits";
  return /^\d{16}$/.test(card);
}

//cvv validation with regular expression method
function isValidCvv(card) {
  cvv.nextElementSibling.innerText = "CVV be a 3 digits";
  return /^\d{3}$/.test(card);
}

//postal validation with regular expression method
function isValidPostal(card) {
  zip.nextElementSibling.innerText = "Must be a 5 digits";
  return /^\d{5}$/.test(card);
}

/* username validation with regular expression method
 Can only contain letters a-z in lowercase */

function isValidUsername(username) {
  usernameInput.nextElementSibling.innerText =
    "Can only contain letters a-z or A-Z";
  return /^[a-zA-Z]+$/.test(username);
}

// email address validation with regular expression method
function isValidEmail(email) {
  emailInput.nextElementSibling.innerText = "Must be a valid email";
  return /^[^@]+@[^@.]+\.(com)$/i.test(email);
}

/**
 *
 * SET UP EVENTS
 *
 */

function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = "inherit";
  } else {
    element.style.display = "none";
  }
}

function createListener(validator) {
  return (e) => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target.nextElementSibling;
    showOrHideTip(showTip, tooltip);
  };
}

usernameInput.addEventListener("input", createListener(isValidUsername));

emailInput.addEventListener("input", createListener(isValidEmail));

/* Update the color options based the theme selections as well as changing CSS display property */
designOpt.addEventListener("change", (event) => {
  let list = [];
  cleanSelection();
  if (event.target.value === "js puns") {
    list = [...JSpuneList];
    color.style.display = "";
  } else if (event.target.value === "heart js") {
    list = [...JSHeartList];
    color.style.display = "";
  } else color.style.display = "none";

  for (let i = 0; i < list.length; i++) {
    colorOpt.appendChild(list[i]);
  }
});

/*Payment option hide/show changes based on the dropdown option seletion for payment method*/
paymentOpt.addEventListener("change", (event) => {
  switch (event.target.value) {
    case "credit card":
      payPal.style.display = "none";
      creditCard.style.display = "";
      bitCoin.style.display = "none";
      break;
    case "paypal":
      payPal.style.display = "";
      creditCard.style.display = "none";
      bitCoin.style.display = "none";
      break;
    case "bitcoin":
      bitCoin.style.display = "";
      payPal.style.display = "none";
      creditCard.style.display = "none";
      break;
  }
});

ccNum.addEventListener("input", createListener(isValidCard));
zip.addEventListener("input", createListener(isValidPostal));
cvv.addEventListener("input", createListener(isValidCvv));

/* regardless of real-time error checking if the user left any required options emply it will
  be catch in the submit function before the form is ready to be submitted if there would be 
  any error then form will not be submitted*/
submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (totalCost === 0) {
    document.getElementById("Activity").style.display = "";
    formIsValid = false;
  } else {
    document.getElementById("Activity").style.display = "none";
    formIsValid = true;
  }

  if (usernameInput.value !== "") {
    formIsValid = true;
  } else {
    usernameInput.nextElementSibling.innerText = "Username can't be empty.";
    usernameInput.nextElementSibling.style.display = "";
    formIsValid = false;
  }

  if (emailInput.value !== "") {
    formIsValid = true;
  } else {
    emailInput.nextElementSibling.innerText = "Email can't be empty";
    emailInput.nextElementSibling.style.display = "";
    formIsValid = false;
  }

  if (paymentOpt.value === "credit card") {
    if (ccNum.value !== "") {
      formIsValid = true;
    } else {
      ccNum.nextElementSibling.innerText = "Credit Number can't be empty";
      ccNum.nextElementSibling.style.display = "";
      formIsValid = false;
    }
    if (zip.value !== "") {
      formIsValid = true;
    } else {
      zip.nextElementSibling.innerText = "Zip can't be empty";
      zip.nextElementSibling.style.display = "";
      formIsValid = false;
    }
    if (cvv.value !== "") {
      formIsValid = true;
    } else {
      cvv.nextElementSibling.innerText = "CVV can't be empty";
      cvv.nextElementSibling.style.display = "";
      formIsValid = false;
    }
  }

  //Checking all the required error display sttus if any of them is in error mode form will not be submitted
  if (
    cvv.nextElementSibling.style.display !== "none" ||
    zip.nextElementSibling.style.display !== "none" ||
    ccNum.nextElementSibling.style.display !== "none" ||
    document.getElementById("Activity").style.display !== "none" ||
    usernameInput.nextElementSibling.style.display !== "none" ||
    emailInput.nextElementSibling.style.display !== "none"
  ) {
    formIsValid = false;
    console.log(formIsValid);
  }
  if (formIsValid) {
    window.location.href = window.location.href;
  }
});

/*show and hide the Job role input based on the job title selection "other"*/
title.addEventListener("change", (e) => {
  //
  if (e.target.value === "other") {
    document.querySelector(".other").style.display = "";
  } else {
    document.querySelector(".other").style.display = "none";
  }
});

/*Activies checkbox implementation of disabling any conflicting time and adding the 
  total code based on selection as well as hiding errors on before submit*/
activiesSection.addEventListener("change", (e) => {
  //
  let cost = 0;
  for (let i = 0; i < activies.length; i++) {
    if (activies[i].checked) {
      cost = cost + parseInt(activies[i].dataset["cost"]);
      document.getElementById("Activity").style.display = "none";
    }
    if (
      activies[i].dataset["dayAndTime"] &&
      activies[i].dataset["dayAndTime"] ===
        event.target.dataset["dayAndTime"] &&
      activies[i].checked == false &&
      event.target.checked
    ) {
      activies[i].disabled = true;
    }

    if (
      activies[i].dataset["dayAndTime"] &&
      activies[i].checked == false &&
      event.target.checked == false &&
      activies[i].dataset["dayAndTime"] === event.target.dataset["dayAndTime"]
    ) {
      activies[i].disabled = false;
    }
  }
  activiesSection.lastElementChild.innerText = `Cost: ${cost}`;
  totalCost = cost;
});
