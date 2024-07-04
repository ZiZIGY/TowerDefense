import { canvas, ctx, defenders, gameGrid } from "./variables.js";
import {
  createGrid,
  drawGrid,
  launchFrameTimer,
  setCanvasSize,
  setMouseEvents,
  spawnEnemies,
} from "./lib/functions.js";

import { config } from "./config.js";

setCanvasSize();

createGrid(gameGrid);

setMouseEvents();

const play = (time) => {
  config.game.frame++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  launchFrameTimer(time);

  drawGrid(gameGrid);

  if (config.game.frame % 10 === 0) config.game.score += 10;
  if (config.game.over) {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
  }
  // !config.game.over &&
  requestAnimationFrame(play);
  spawnEnemies();
  defenders.forEach((unit) => unit.draw());
};
play();
