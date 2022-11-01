import { Game } from "./game";
import chalk from "chalk";

export function wordLogger() {
  const newGame = new Game();
  console.log(newGame);
}
