import { words } from "./words";

export class Game {
  round: number = 1;
  status: "idle" | "active" | "win" | "lose" = "idle";
  answer: string = words[Math.floor(Math.random() * words.length)].trim();
  guesses: string[] = [];
}
