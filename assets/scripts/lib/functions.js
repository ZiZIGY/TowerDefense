import { Archer, Enemy } from "../classes/entities.js";
import {
  canvas,
  defenders,
  enemies,
  enemyPositions,
  mouse,
  requestFrameTimer,
} from "../variables.js";

import { Cell } from "../classes/cell.js";
import { config } from "../config.js";

/**
 * Функция setCanvasSize устанавливает ширину и высоту элемента холста в соответствии с размерами окна.
 */
export const setCanvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

/**
 * Функция createGrid генерирует сетку ячеек на основе размера холста и размера ячейки, указанных в
 * объекте config.
 * @param {Array<Cell>} gameGrid
 */
export const createGrid = (gameGrid) => {
  for (let y = config.cell.size; y < canvas.height; y += config.cell.size) {
    for (let x = 0; x < canvas.width; x += config.cell.size) {
      gameGrid.push(new Cell(x, y));
    }
  }
};

/**
 * Функция drawGrid перебирает каждую ячейку gameGrid и записывает ее в консоль.
 * @param {Array<Cell>} gameGrid
 */
export const drawGrid = (gameGrid) => {
  for (const cell of gameGrid) {
    cell.draw();
  }
};

/**
 * Функция «столкновение» проверяет, перекрываются ли два прямоугольника в 2D-пространстве.
 * @param first - Параметр first представляет положение и размеры первого объекта в 2D-пространстве.
 * Обычно он включает в себя такие свойства, как «x» (горизонтальное положение), «y» (вертикальное
 * положение), «ширина» и «высота».
 * @param second - Предоставленная вами функция «столкновения» используется для проверки столкновения
 * между двумя объектами на основе их положения и размеров. Параметры first и Second представляют два
 * объекта, проверяемые на предмет столкновения.
 * @returns Функция столкновений возвращает логическое значение, указывающее, сталкиваются ли два
 * объекта, представленные «первым» и «вторым», или нет. Если объекты сталкиваются, функция возвращает
 * true, в противном случае — false.
 */
export const collision = (first, second) => {
  return !(
    first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y
  );
};

/**
 * Функция setMouseEvents устанавливает прослушиватели событий мыши на элементе холста для отслеживания
 * движения и положения мыши.
 */

export const createArcher = (x, y, width, height) => {
  defenders.push(new Archer(x, y, width, height));
};
export const setMouseEvents = () => {
  canvas.onmousemove = ({ x, y }) => ([mouse.x, mouse.y] = [x, y]);
  canvas.onmouseleave = () => ([mouse.x, mouse.y] = [undefined, undefined]);
  canvas.onclick = () => {
    const gridPosY = mouse.y - (mouse.y % config.cell.size);
    const gridPosX = mouse.x - (mouse.x % config.cell.size);
    if (gridPosY < config.cell.size) return;
    for (const defender of defenders) {
      if (defender.x === gridPosX && defender.y === gridPosY) return;
    }
    if (config.game.resources > Archer.cost) {
      createArcher(gridPosX, gridPosY, config.cell.size, config.cell.size);
      config.game.resources -= Archer.cost;
    }
  };
};

/**
 * Функция spawnEnemies обновляет и рисует врагов на холсте, проверяет условия окончания игры и
 * порождает новых врагов через случайные промежутки времени.
 */
export const spawnEnemies = () => {
  for (const enemy of enemies) {
    enemy.move();
    enemy.draw();
    if (enemy.x < 0) config.game.over = true;
  }

  if (config.game.frame % config.game.balance.spawn.interval === 0) {
    const yPos =
      Math.floor(Math.random() * (canvas.height / config.cell.size + 1)) *
      config.cell.size;

    enemies.push(
      new Enemy(canvas.width, yPos, config.cell.size, config.cell.size)
    );
    enemyPositions.push(yPos);
    if (
      config.game.balance.spawn.interval >
      config.game.balance.spawn.decreaseIntervalSpawnEnemyValueCondition
    ) {
      config.game.balance.spawn.interval -=
        config.game.balance.spawn.decreaseIntervalSpawnEnemyValue;
    }
  }
};

/**
 * Функция launchFrameTimer запускает таймер для записи секунд.
 */
export const launchFrameTimer = (time) => {
  requestFrameTimer.current = ~~(time / 1000);

  if (requestFrameTimer.current - requestFrameTimer.last >= 1) {
    requestFrameTimer.last = requestFrameTimer.current;
  }
};
