let spinner = document.querySelector(".spinner")
window.onload = () => {
  spinner.classList.add("d-none")
}





let nameIn = document.getElementById("name")
let errorEl = document.querySelectorAll(".error")
let inputs = document.querySelectorAll("input")
let submitBtn = document.querySelector(".btn")



let nameRe = /^[a-z\s]{1,}$/ig
let emailRe = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/ig
let phoneRe = /^(01){1}(1|2|5|0)\d{8}$/ig
let ageRe = /^[1-9][0-9]?$/ig
let passRe = /^(?=.*[A-Za-z0-9]).{8,16}$/ig




function validation(){
  let validation = {
    nameVal : false,
    emailVal : false,
    phoneVal : false,
    ageVal : false,
    passVal : false,
    repassVal : false,
  }

  window.addEventListener('load', function(){
    for(let i=0; i<inputs.length; i++) {
      inputs[i].value = ""
    }
  })

  // ========== Name Validation ==========
    inputs[0].addEventListener("keydown", function(e) {
      if(e.currentTarget.value.match(nameRe) && e.currentTarget.value != "") {
        errorEl[0].classList.add("d-none")
        validation.nameVal = true
        } else {
        errorEl[0].classList.remove("d-none")
        validation.nameVal = false
        }
    })




  // ========== Email Validation ==========
  inputs[1].addEventListener("keydown", function(e) {
    if(e.currentTarget.value.match(emailRe) && e.currentTarget.value != "") {
      errorEl[1].classList.add("d-none")
      validation.emailVal = true
    } else {
      errorEl[1].classList.remove("d-none")
      validation.emailVal = false
      }
  })






  // ========== Phone Validation ==========
  inputs[2].addEventListener("keydown", function(e) {
    if(e.currentTarget.value.match(phoneRe) && e.currentTarget.value != "") {
      errorEl[2].classList.add("d-none")
      validation.phoneVal = true
    } else {
      errorEl[2].classList.remove("d-none")
      validation.phoneVal = false
      }
  })





  // ========== Age Validation ==========
  inputs[3].addEventListener("keydown", function(e) {
    if(e.currentTarget.value.match(ageRe) && e.currentTarget.value != "") {
      errorEl[3].classList.add("d-none")
      validation.ageVal = true
    } else {
      errorEl[3].classList.remove("d-none")
      validation.ageVal = false
      }
  })





  // ========== Password Validation ==========
  inputs[4].addEventListener("keydown", function(e) {
    if(e.currentTarget.value.match(passRe) && e.currentTarget.value != "") {
      errorEl[4].classList.add("d-none")
      validation.ageVal = true
    } else {
      errorEl[4].classList.remove("d-none")
      validation.ageVal = false
      }
  })





  // ========== RePassword Validation ==========
  inputs[5].addEventListener("keyup", function(e) {
    if(e.currentTarget.value.match(passRe) && e.currentTarget.value != "" && e.currentTarget.value === inputs[4].value) {
      errorEl[5].classList.add("d-none")
      validation.repassVal = true
    } else {
      errorEl[5].classList.remove("d-none")
      validation.repassVal = false
      }
  })


  function ifValid() { 
    for(let i=0; i<Object.values(validation); i++){
      if(Object.values(validation)[i] === false) {
        submitBtn.disabled = "disabled"
        break;        
      } else {
        submitBtn.disabled = false
      }
    }
  }
console.log(ifValid());
ifValid()

}



validation()
