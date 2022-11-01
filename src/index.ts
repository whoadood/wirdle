import { Game } from "./utils/game";
import chalk from "chalk";
import inquirer from "inquirer";

export async function wordLogger() {
  const newGame = new Game();
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
  game.round++;
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
  if (game.round > 6) {
    console.log(
      chalk.red(`${chalk.bold(game.answer)} you lose, better luck next time!`)
    );
    process.exit(0);
  }
  if (guess === game.answer) {
    console.log(
      chalk.green(`${chalk.bold("CONGRADULATIONS")} you guessed the wirdle!`)
    );
  } else {
    callback();
  }
}
