let numberList = [];
let maxNumber = 100;
let secretNumber = generateRandomNumber(); 
let tries = 1;

function showText(tag, text) {
    let blank = document.querySelector(tag);
    blank.innerHTML = text;
    responsiveVoice.speak(text, 'UK English Female', {rate: 1.2});
}

function initialText() {
    showText('h1', 'Secret Number Game');
    showText('p', 'Make Your Guess from 1 to 10');
}

initialText()

function verifyGuess() {
    let guess = document.querySelector('input').value;

    if(guess == secretNumber) {
        showText('h1', 'You Got it Right!');
        let wordTry = tries > 1 ? 'Tries' : 'Try';
        let tryCount = `You've Found the Secret Number in ${tries} ${wordTry}!`
        showText('p', tryCount); 
        document.getElementById('restart').removeAttribute('disabled');
    } else{
        if(guess > secretNumber){
            showText('p', `The Secret Number is Lower than ${guess}`);
        } else{
            showText('p', `The Secret Number is Higher than ${guess}`);
        }
        tries++;
        clearGuess();
    }
}

function generateRandomNumber() {
    let chosenNumber = parseInt(Math.random() * maxNumber + 1);
    let amountOfNumbersInTheList = numberList.length;

    if(amountOfNumbersInTheList == maxNumber) {
        numberList = [];
    }

    if(numberList.includes(chosenNumber)) {
        return generateRandomNumber();
    } else{
        numberList.push(chosenNumber);
        console.log(numberList);
        return chosenNumber;
    }
}

function clearGuess() {
    guess = document.querySelector('input');
    guess.value = '';
}

function newGame() {
    secretNumber = generateRandomNumber();
    clearGuess();
    tries = 1;
    initialText();
    document.getElementById('restart').setAttribute('disabled', true);
}