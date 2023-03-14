//VARIABLES
// let lives = document.querySelector('#livesRemaining')

let botScoreVal = Number(localStorage.getItem('userScore'))
let userLivesVal = Number(localStorage.getItem('userLives'))

let choices = document.querySelector('#multipleChoiceContainer');

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

window.addEventListener("load", startGame)

function startGame(){
  fetch(`https://restcountries.com/v3.1/all`)
  .then((response) => response.json())
	.then((data) => {
    // document.getElementById("scoreForm").submit()
    botScoreVal = 0
    document.querySelector('#scoreCounter').value = 0
    userLivesVal = 3
    document.querySelector('#livesRemaining').value = 3
    let randomNum = Math.floor(Math.random() * 250);
    randomAnswers(randomNum)
    countryArr.push(randomNum)
        document.querySelector("#flagImage").src = data[randomNum].flags.png;
        document.querySelector('#nameOfContinent').innerText = data[randomNum].continents[0]

      console.log(data[randomNum].name.common);
      console.log(countryArr)
    });

    //MAKE BEGIN BUTTON DISAPPEAR AFTER CLICK
    //AND MAKE THE GUESS BUTTON APPEAR 
}

//trying to figure out how to begin the game without using the guess button since it could cause a problem with the game over feature

//need to make this query selector the correct answer
document.querySelector('#multipleChoiceContainer').addEventListener('click', countriesList)

function countriesList(answer){
  let randomNum = Math.floor(Math.random() * 250); // keeping the random number variable in the function makes it that everytime the click event is called it is randomized

  let userGuess = answer.target.innerText
  console.log(answer.target.innerText)

  fetch(`https://restcountries.com/v3.1/all`)
  .then((response) => response.json())
	.then((data) => {
      // console.log(data)
        //the country
      let correctCountry = data[randomNum].name.common;
      console.log(correctCountry)
     //user guess is using the following multiple choice answer instead of current
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
        document.querySelector('#nameOfContinent').innerText = data[randomNum].continents[0]
    
        // choiceOne(userGuess)
        // choiceTwo(userGuess)
        // choiceThree(userGuess)
        // choiceFour(userGuess)

        randomAnswers(randomNum)
        //checks answer
        rightOrWrong(userGuess, correctCountry)
      }else if(countryArr.length == 0){
        //dont do anything
        countryArr.push(randomNum);
        //if() user answer is correct
        document.querySelector("#flagImage").src = data[randomNum].flags.png;
        // document.querySelector("#nameOfCountry").innerText = data[randomNum].name.common;
        document.querySelector('#nameOfContinent').innerText = data[randomNum].continents[0]
        console.log(data[randomNum].name.common);
        document.querySelector('#userGuess').value = ''; //resets input to blank
      }
      console.log(countryArr)
    });
}

//TRYING TO MAKE MULTIPLE CHOICE
// The goal is to randomize which of the four answers have a wrong answer and which one gets the correct answer. ALSO it needs to refresh to a new set of answers after each guess


// document.querySelector('#beginBut').addEventListener('click', randomAnswers)

function randomAnswers(index){
  fetch(`https://restcountries.com/v3.1/all`)
  .then((response) => response.json())
    .then((data) => {
    // for(let i = 0; i < answerArray.length; i++){
    //   answerArray[i].innerText = data[Math.floor(Math.random() * 250)].name.common;
    // }
    answerArray[0].innerText = data[Math.floor(Math.random() * 250)].name.common;
    answerArray[1].innerText = data[Math.floor(Math.random() * 250)].name.common;
    answerArray[2].innerText = data[Math.floor(Math.random() * 250)].name.common;
    answerArray[3].innerText = data[Math.floor(Math.random() * 250)].name.common;
    answerArray[Math.floor(Math.random() * 4)].innerText = data[index].name.common;
  });
}



//Function to check if answer is correct 
function rightOrWrong(guessedAnswer, correctAnswer){
    if(String(guessedAnswer.toLowerCase()) === String(correctAnswer.toLowerCase())){
      console.log('Correct')
      onePoint()
    }
    else{
      // lives.value--
      liveLost()
      console.log('Wrong answer')
    }
}

function liveLost(){

  userLivesVal -= 1
  localStorage.setItem('userLives', userLivesVal)
  document.querySelector('#livesRemaining').value = userLivesVal
  document.getElementById("scoreForm").submit()
}
if(localStorage.getItem('userLives')){
localStorage.setItem('userLives', 3)
}

// USER MULTIPLE CHOICE GUESS 1-4 
//Choice One
document.querySelector('#answerOne').addEventListener('click', choiceOne)
function choiceOne(guess){
    guess = answerArray[0].value
}
//Choice Two
document.querySelector('#answerTwo').addEventListener('click', choiceTwo)
function choiceTwo(guess){
    guess = answerArray[1].value
}
//Choice Three
document.querySelector('#answerThree').addEventListener('click', choiceThree)
function choiceThree(guess){
    guess = answerArray[2].value
}
//Choice Four
document.querySelector('#answerFour').addEventListener('click', choiceFour)
function choiceFour(guess){
    guess = answerArray[3].value
}
//Choice 
// choices.addEventListener('click', userChoice)
// function userChoice(choice){
//     choice.target.id
// }

//Function to add a point -- should I do 3 lives, 10-20 guesses, timed run? Also resets score to 0 if wrong
function onePoint(){

  botScoreVal += 1
  localStorage.setItem('userScore', botScoreVal)
  document.querySelector('#scoreCounter').value = botScoreVal
  document.getElementById("scoreForm").submit()
}
  if(localStorage.getItem('userScore')){
  localStorage.setItem('userScore', 0)
  }