//javacript for validations
(function () {
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

//validation for allow only string values
function validateInput(inputElement, regex, errorMessage) {
  inputElement.addEventListener("input", function () {
    const value = inputElement.value.trim();
    const isValid = regex.test(value);
    if (value === "") {
      inputElement.setCustomValidity("Please enter " + errorMessage + ".");
    } else if (isValid) {
      inputElement.setCustomValidity("");
      inputElement.classList.remove("is-invalid");
    } else {
      inputElement.setCustomValidity("Please enter a valid " + errorMessage + ".");
      inputElement.classList.add("is-invalid");
    }
  });
}
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const regexLettersOnly = /^[A-Za-z]+$/;
validateInput(fname, regexLettersOnly, "First Name");
validateInput(lname, regexLettersOnly, "Last Name");


//validation for email
const inputEmail = document.getElementById("email");
inputEmail.addEventListener("input", function () {
  const value = inputEmail.value.trim();
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const isValid = regex.test(value);
  if (isValid) {
    inputEmail.classList.remove("is-invalid");
    inputEmail.classList.add("was-validated");
  } else {
    inputEmail.classList.add("is-invalid");
  }
});

//validation for phone number
const inputPhone = document.getElementById("phone");
inputPhone.addEventListener("input", function () {
  const value = inputPhone.value.trim();
  const regex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{2,6}$/im;
  const isValid = regex.test(value);
  if (isValid) {
    inputPhone.classList.remove("is-invalid");
    inputPhone.classList.add("was-validated");
  } else {
    inputPhone.classList.add("is-invalid");
  }
});

//add ID image option
$(document).ready(function () {
  $('#inputStatus').on('change', function () {
    var idType = $(this).val();
    if (idType == '3' || idType == '4') {
      $('#idImageDiv').show();
      $('#idImageBackDiv').hide();
      $('#id_image_front').attr('required', 'required');
      $('#id_image_back').removeAttr('required', 'required');
    } else if (idType == '1' || idType == '2') {
      $('#idImageDiv').show();
      $('#idImageBackDiv').show();
      $('#id_image_front').attr('required', 'required');
      $('#id_image_back').attr('required', 'required');
    } else {
      $('#idImageDiv').hide();
      $('#idImageBackDiv').hide();
      $('#id_image_front').removeAttr('required');
      $('#id_image_back').removeAttr('required', 'required');
    }
  });

  function isValidImage(fileName) {
    var allowedExtensions = /(.jpg|.jpeg|.png|.pdf)$/i;
    return allowedExtensions.exec(fileName) ? true : false;
  }
});

//validation for id-card
const inputStatus = document.getElementById("inputStatus");
const inputIdCardNumberDiv = document.getElementById("idCardNumberDiv");
const inputIdCardNumber = document.getElementById("id_card");
const inputIdCardNumberError = document.getElementById("idCardError");

inputStatus.addEventListener("change", function () {
  const selectedValue = inputStatus.value;
  inputIdCardNumber.value = "";
  inputIdCardNumberDiv.classList.remove("was-validated", "is-invalid");
  inputIdCardNumberError.textContent = "Please provide a valid ID card number";

  if (selectedValue === "1") { // Aadhar Card
    inputIdCardNumber.placeholder = "Aadhar Card Number";
    inputIdCardNumber.pattern = "^[0-9]{12}$";
    inputIdCardNumberError.textContent = "Please provide a valid Aadhar Card number";
  } else if (selectedValue === "2") { // Voter Id Card
    inputIdCardNumber.placeholder = "Voter Id Card Number";
    inputIdCardNumber.pattern = "^[a-zA-Z0-9]{10}$";
    inputIdCardNumberError.textContent = "Please provide a valid Voter Id Card number";
  } else if (selectedValue === "3") { // Pan Card
    inputIdCardNumber.placeholder = "Pan Card Number";
    inputIdCardNumber.pattern = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$";
    inputIdCardNumberError.textContent = "Please provide a valid Pan Card number";
  } else if (selectedValue === "4") { // Driving License
    inputIdCardNumber.placeholder = "Driving License Number";
    inputIdCardNumber.pattern = "^[A-Z]{2}[0-9]{13}$";
    inputIdCardNumberError.textContent = "Please provide a valid Driving License number";
  }
});
inputIdCardNumber.addEventListener("input", function () {
  const value = inputIdCardNumber.value.trim();
  const isValid = inputIdCardNumber.checkValidity();
  if (isValid) {
    inputIdCardNumberDiv.classList.remove("is-invalid");
    inputIdCardNumberDiv.classList.add("was-validated");
  } else {
    inputIdCardNumberDiv.classList.add("is-invalid");
  }
});

//javascript for check date 
var today = new Date().toISOString().split('T')[0];
document.getElementById("check_in_date").setAttribute("min", today);

var checkin = document.getElementById('check_in_date');
var checkout = document.getElementById('check_out_date');
checkin.addEventListener('change', function () {
  checkout.setAttribute('min', checkin.value);
});

//js for add extra bed and price
function addTextBoxes() {
  var checkBox = document.getElementById("add-textbox");
  var textBoxesDiv = document.getElementById("textboxes");
  if (checkBox.checked == true) {
    textBoxesDiv.style.display = "block";
  } else {
    textBoxesDiv.style.display = "none";
  }
}

//js for add discount
var discountTypeRadios = document.getElementsByName('tdiscount');
for (var i = 0; i < discountTypeRadios.length; i++) {
  discountTypeRadios[i].addEventListener('change', function () {
    if (this.value == 'rupees') {
      document.getElementById('discountRupees').style.display = 'block';
      document.getElementById('discountPercentage').style.display = 'none';
    } else if (this.value == 'percentage') {
      document.getElementById('discountRupees').style.display = 'none';
      document.getElementById('discountPercentage').style.display = 'block';
    }
  });
}

//js for add extra bed 
function increment() {
  document.getElementById('demoInput').stepUp();
}
function decrement() {
  document.getElementById('demoInput').stepDown();
}

//js for add adult
function increment1() {
  document.getElementById('adult').stepUp();
}
function decrement1() {
  document.getElementById('adult').stepDown();
}

//js for child
function increment2() {
  document.getElementById('child').stepUp();
}
function decrement2() {
  document.getElementById('child').stepDown();
}

//for child age
function child_age_increment(id) {
  var inputElement = document.getElementById('child_age_' + id);
  var elementVal = parseInt(inputElement.value);
  if (elementVal < 12) {
    inputElement.value = elementVal + 1;
  } else {
    inputElement.value = 12;
  }
}

function child_age_decrement(id) {
  var inputElement = document.getElementById('child_age_' + id);
  var elementVal = parseInt(inputElement.value);
  console.log(elementVal);
  if (elementVal > 1) {
    inputElement.value = elementVal - 1;
  }
}