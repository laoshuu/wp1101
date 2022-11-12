let number

const getNumber = () => number
const genNumber = () => {
    number = Math.floor(Math.random() * 100)
    return number
}

let guess = 10
const guessDec = () => {
    guess = guess - 1;
    return guess;
}
const guessReset = () => { guess = 10 }

export { genNumber, getNumber, guessDec, guessReset }