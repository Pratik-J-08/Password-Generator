// console.log("Connection established");


const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copybutton]");
const copyMsg = document.querySelector("[data-copyMsg]");

const UpperCheck = document.querySelector('#uppercase');
const lowerCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");


const indicator = document.querySelector('.data-indicator');
const generateBtn = document.querySelector('.generateButton');

const allCheckBox = document.querySelectorAll('input[type=checkbox]');
const symbols = '!@#$%^&*()/-+<>?[]{}';


//Default cases
let password = "";
let passwordLength = 10;
let checkCount = 1;
// set strenght circle to grey once css is done

handleSlider();

 // Slider handling function --> setting passwordLength
 function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
 }   

 //Strenght indicator
 function setIndicator(color){
    indicator.style.backgroundColor = color;
    //Shadow to be added on
 }


 function getRndInteger(min, max) {
   return Math.floor( Math.random() * (max-min) )+min;
 }
 
 function generateRandomNumber(){
    return getRndInteger(0,9);
 }

 function generateLowerCase(){
    return String.fromCharCode( getRndInteger(97,123));
 }
 
 function generateUpperCase(){
    return String.fromCharCode( getRndInteger(65,91));
 }

 function generateSymbol () {
   let randomNumber = getRndInteger(0,symbols.length);
    return symbols.charAt(randomNumber);
 }

