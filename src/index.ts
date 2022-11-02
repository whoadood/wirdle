import { Game } from "./utils/game";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";

export async function wordLogger() {
  const newGame = new Game();

  console.log(
    gradient.pastel.multiline(
      figlet.textSync("WIRDLE", {
        font: "3D Diagonal",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    )
  );

  console.log(
    chalk.cyan.bold(`
  - 6 rounds of action
  - 5 letter words of doom
  - cntrl + c to exit at any time
  - can you guess the word?
  `)
  );
  guess(newGame);
}

async function guess(game: Game) {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: `guess`,
      message: "enter your guess",
      validate(input) {
        if (input.length !== 5) {
          console.log(
            chalk.red(`${chalk.bold(" ERROR")} input must be 5 characters long`)
          );
        } else {
          return true;
        }
      },
    },
  ]);

  game.guesses.push(answers.guess);
  check(answers.guess, game, () => guess(game));
}

function check(guess: string, game: Game, callback: () => void) {
  const guessArr = guess.split("");
  const answerArr = game.answer.split("");
  const formatGuess = guessArr
    .map((letter, index) => {
      if (answerArr.includes(letter)) {
        if (letter === answerArr[index]) {
          return chalk.green(letter);
        } else {
          return chalk.cyan(letter);
        }
      } else {
        return letter;
      }
    })
    .join("");
  console.log(formatGuess);
  if (guess === game.answer) {
    return gameover(
      chalk.green(`${chalk.bold("CONGRADULATIONS")} you guessed the wirdle!`)
    );
  }
  game.round++;
  if (game.round > 6) {
    return gameover(
      chalk.red(`${chalk.bold(game.answer)} you lose, better luck next time!`)
    );
  }
  callback();
}

async function gameover(msg: string) {
  console.log(msg);

  const answer = await inquirer.prompt({
    type: "confirm",
    name: "again",
    message: "Would you like to play again?",
  });

  if (answer.again) {
    guess(new Game());
  } else {
    process.exit(0);
  }
}
