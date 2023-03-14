//VARIABLES
let answerOne = document.getElementById('answerOne')
let answerTwo = document.getElementById('answerTwo')
let answerThree = document.getElementById('answerThree')
let answerFour = document.getElementById('answerFour')

let answerArray = [answerOne, answerTwo, answerThree, answerFour]
let countryArr = []; //THIS ARRAY HOLDS THE RANDOM NUMBERS FROM VARIABLE randomNum SO COUNTRIES DON'T REPEAT
let countryIndex = countryArr[countryArr.length - 1]

document.addEventListener('keypress', enterPress) //this makes so you can hit enter to click the guess button

function enterPress(e){
  if(e.key === 'Enter'){
    document.getElementById('btnGuess').click()
  }
}

document.querySelector('#beginBut').addEventListener('click', startGame)

function startGame(){
  fetch(`https://restcountries.com/v3.1/all`)
  .then((response) => response.json())
	.then((data) => {
    let randomNum = Math.floor(Math.random() * 250);
    countryArr.push(randomNum)
        document.querySelector("#flagImage").src = data[randomNum].flags.png;
        // document.querySelector("#nameOfCountry").innerText = data[randomNum].name.common;
        document.querySelector('#nameOfCountry').innerText = data[randomNum].continents[0]
        document.querySelector('#userGuess').value = ''; //resets input to blank

      console.log(data[randomNum].name.common);
      console.log(countryArr)
    });

    //MAKE BEGIN BUTTON DISAPPEAR AFTER CLICK
    //AND MAKE THE GUESS BUTTON APPEAR 
}

//trying to figure out how to begin the game without using the guess button since it could cause a problem with the game over feature

document.querySelector('#btnGuess').addEventListener('click', countriesList)

function countriesList(){
  let randomNum = Math.floor(Math.random() * 250); // keeping the random number variable in the function makes it that everytime the click event is called it is randomized

  fetch(`https://restcountries.com/v3.1/all`)
  .then((response) => response.json())
	.then((data) => {
      // console.log(data)
      let userGuess = document.querySelector('#userGuess').value //the users guess
      let correctCountry //the country
      if(countryArr.length == 0){
        correctCountry = data[countryArr[0]].name.common;
      }else{
        correctCountry = data[countryArr[countryArr.length - 1]].name.common;
      }
      console.log(correctCountry)
      console.log(userGuess) //WHERE I LEFT OFF TRYING TO FIGURE OUT WHY USER GUESS WONT APPEAR

      if(!countryArr.includes(randomNum)){
        countryArr.push(randomNum);
        document.querySelector("#flagImage").src = data[randomNum].flags.png;
        // document.querySelector("#nameOfCountry").innerText = data[randomNum].name.common;
        document.querySelector('#nameOfCountry').innerText = data[randomNum].continents[0]
        document.querySelector('#userGuess').value = ''; //resets input to blank
    
        rightOrWrong(userGuess, correctCountry) //checks answer
      }else if(countryArr.length == 0){
        //dont do anything
        countryArr.push(randomNum);
        //if() user answer is correct
        document.querySelector("#flagImage").src = data[randomNum].flags.png;
        // document.querySelector("#nameOfCountry").innerText = data[randomNum].name.common;
        document.querySelector('#nameOfCountry').innerText = data[randomNum].continents[0]
        console.log(data[randomNum].name.common);
        document.querySelector('#userGuess').value = ''; //resets input to blank
      }
      console.log(countryArr)
    });
}

//Function to check if answer is correct 
function rightOrWrong(guessedAnswer, correctAnswer){
  if(String(guessedAnswer.toLowerCase()) === String(correctAnswer.toLowerCase())){
    console.log('Correct')
    onePoint()
  }
  else{
    // document.open('G:\CODING 2022\LearnWithLeon\Class Materials (DISCORD)\class37-materials\fullstack-webapp-hw\gameover.html');
    console.log('Wrong answer')
  }
}

//Function to add a point -- should I do 3 lives, 10-20 guesses, timed run? Also resets score to 0 if wrong
function onePoint(){
  let botScoreVal = Number(localStorage.getItem('botScore'))
  botScoreVal += 1
  localStorage.setItem('botScore', botScoreVal)
  document.querySelector('#scoreCounter').innerText = botScoreVal
}
if(localStorage.getItem('botScore')){
  localStorage.setItem('botScore', 0)
}



// document.querySelector(.multipleChoiceButton).addEventListener('click', checkMultAnswer)

// function checkMultAnswer(){
  
// }


/************************************* */
/* COUNTRY API TEST AND EVENT LISTENER */
/************************************* */

/************************************* */
/* TRY AGAIN EVENT LISTENER */
/************************************* */

// document.querySelector('#tryAgain').addEventListener('click', tryAgain)

// //try again function - reset score (or local storage) to ZERO

// function tryAgain(){
//   //reset score to ZERO if happened to use local storage 
// }