const readline = require("readline-sync")

const ALL_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const stringLength = parseInt(readline.question("String length (min. 3, max. 16): "))
const possibleLetters = parseInt(readline.question("# of possible letters for a string (A-Z, min. 3, max. 26): "))
const maxAttempts = parseInt(readline.question("Maximum attempts (min. 1, max. 100): "))

if (!stringLength || stringLength < 3 || stringLength > 16 ||
  !possibleLetters || possibleLetters < 3 || possibleLetters > 26 ||
  !maxAttempts || maxAttempts < 1 || maxAttempts > 100) {
  console.log("Invalid parameters! Exiting...")
  return
}

const POSSIBLE_LETTERS = ALL_LETTERS.slice(0, possibleLetters)
const LAST_POSSIBLE_LETTER = POSSIBLE_LETTERS[POSSIBLE_LETTERS.length - 1]

let secretCode = ""

for (let i = 0; i < stringLength; i++) {
  secretCode += POSSIBLE_LETTERS[Math.trunc(Math.random() * POSSIBLE_LETTERS.length)]
}

const codeSplit = secretCode.split("")
let tempCodeSplit = codeSplit

// console.log(secretCode + "\n")
console.log(`\nGuess the ${stringLength}-letter code using letters A-${LAST_POSSIBLE_LETTER} in ${maxAttempts} attempts.
'=' -> Correct Letter at Correct Position
'-' -> Correct Letter at Wrong Position
Good Luck!\n`)

let attemptNo = 1
while (attemptNo <= maxAttempts) {
  let guessCode = readline.question(`${attemptNo}. `).toUpperCase()

  if (guessCode == "QUIT") break
  if (guessCode == secretCode) {
    console.log("Eureka!")
    break
  }
  if (guessCode.length === secretCode.length && guessCode.match(`[A-${LAST_POSSIBLE_LETTER}]{${secretCode.length}}`)) {
    tempCodeSplit = secretCode.split("")
    let guessCodeSplit = guessCode.split("")
    let flags = ""
    for (const l in codeSplit) {
      // console.log(codeSplit[l])
      // console.log(guessCodeSplit[l])
      // console.log(tempCodeSplit)
      if (tempCodeSplit.includes(guessCodeSplit[l])) {
        if (guessCodeSplit[l] === tempCodeSplit[l]) flags += "="
        else flags += "-"
        tempCodeSplit[tempCodeSplit.indexOf(guessCodeSplit[l])] = ""
      }
      else flags += "_"
    }
    console.log(`> ${" ".repeat(attemptNo.toString().length)}${flags}`)
    attemptNo++
  }
  else console.log(`> ${" ".repeat(attemptNo.toString().length)}${"X".repeat(secretCode.length)} Invalid!`)
}

if (attemptNo === maxAttempts) console.log("Out of guesses...")

console.log(`The string was ${secretCode}`)