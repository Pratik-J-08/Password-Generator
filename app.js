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

//Strength Indicator Logic
 function calcStrength(){
   
   let hasUpper = false ;
   let hasLower = false ;
   let hasNum = false ;
   let hasSym = false ;

    if(UpperCheck.checked) hasUpper = true;
    if(lowerCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

   if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
      setIndicator("#0f0");
   }
   else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength>=6){
      setIndicator("#ff0");
   }
   else{
      setIndicator("#f00");
   }

 }

//Copy password from clipboard
 async function copyContent(){
   //Error handling
   try{
         await navigator.clipboard.writeText(passwordDisplay.value);
         copyMsg.innerText = "Copied" ; 
   }
   catch(e){
       copyMsg.innerText = "Please try again"; 
   }

      copyMsg.classList.add("active");
      setTimeout( ()=> {
         copyMsg.classList.remove("active");
      } ,2000);
 }


inputSlider.addEventListener('input', (e =>{
   passwordLength=e.target.value;
   handleSlider();
}));

copyBtn.addEventListener('click',()=>{
   if(passwordDisplay.value)
      copyContent(); 
});

function handleCheckBoxChange(){
 checkCount=0;
 allCheckBox.forEach((checkbox)=>{
      if(checkbox.checked)
         checkCount++;
 });
}

//edge condition
 if(passwordLength<checkCount){
   passwordLength=checkCount;
   handleSlider();
 }



allCheckBox.forEach((checkbox)=>{
   checkbox.addEventListener('change',handleCheckBoxChange);
})


function shufflePassword(){

}


//Generate password logic
generateBtn.addEventListener('click',()=>{
   //none of checkbox ticked
   if (checkCount<=0) return;
   
   if(passwordLength<checkCount){
      passwordLength = checkCount;
      handleSlider(); 
   }

   //Remove old password
   password="";


   let funArr = [];

   if(UpperCheck.checked)
      funArr.push[generateUpperCase];

   if(lowerCheck.checked)
      funArr.push[generateLowerCase];

   if(numbersCheck.checked)
      funArr.push[generateRandomNumber];

   if(symbolCheck.checked)
      funArr.push[generateSymbol];

   for(let i=0 ; i<funArr.length; i++){
      password = funArr[i]();
   }

   //remaning password
    for (let i=0; i<passwordLength-funArr.length; i++){
      let randIndex = getRndInteger(0,funArr.length);
      password+=funArr[randIndex]();
    }


    password=shufflePassword(Array.from(password));
    passwordDisplay.value=password;
    calcStrength();

});