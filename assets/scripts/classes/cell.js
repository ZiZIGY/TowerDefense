import { ctx, mouse } from "../variables.js";

import { collision } from "../lib/functions.js";
import { config } from "../config.js";

/* Класс Cell представляет ячейку с указанными координатами, размером и цветом, которую можно
нарисовать на холсте. */
export class Cell {
  /**
   * Функция-конструктор инициализирует свойства объекта с координатами x и y, шириной и высотой.
   * @param {number} x   - Параметр `x` в функции-конструкторе представляет горизонтальное положение создаваемого
   * объекта. Он используется для установки начальной координаты X объекта в игровом мире или на холсте.
   * @param {number} y - Параметр `y` в функции-конструкторе используется для установки начального значения
   * свойства `y` создаваемого объекта. Это свойство представляет вертикальное положение объекта.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = config.cell.size;
    this.height = config.cell.size;
  }
  /**
   * Функция рисования заполняет или обводит прямоугольник на холсте в зависимости от настроек
   * конфигурации.
   */
  draw() {
    if (mouse.x && mouse.y && collision(this, mouse)) {
      ctx.beginPath();
      ctx.fillStyle = ctx.strokeStyle = config.cell.color;

      config.cell.fill
        ? ctx.fillRect(this.x, this.y, this.width, this.height)
        : ctx.strokeRect(this.x, this.y, this.width, this.height);

      config.cell.fill ? ctx.fill() : ctx.stroke();
      ctx.closePath();
    }
  }
}
