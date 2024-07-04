import { ctx, defenders, requestFrameTimer } from "../variables.js";

import { collision } from "../lib/functions.js";
import { config } from "../config.js";

export class Entity {
  /**
   * Функция-конструктор инициализирует свойства объекта с координатами x и y, шириной и высотой.
   *
   * @param {number} x   - Параметр `x` в функции-конструкторе представляет горизонтальное положение создаваемого
   * объекта. Он используется для установки начальной координаты X объекта в игровом мире или на холсте.
   * @param {number} y - Параметр `y` в функции-конструкторе используется для установки начального значения
   * свойства `y` создаваемого объекта. Это свойство представляет вертикальное положение объекта.
   * @param {number} width - Параметр `width` в функции-конструкторе используется для установки начального значения
   * свойства `width` создаваемого объекта. Это свойство представляет ширину объекта.
   * @param {number} height - Параметр `height` в функции-конструкторе используется для установки начального значения
   * свойства `height` создаваемого объекта. Это свойство представляет высоту объекта.
   * @param {number} health - Параметр `health` в функции-конструкторе используется для установки начального значения
   * свойства `health` создаваемого объекта. Это свойство представляет здоровье объекта.
   */
  constructor(x, y, width, height, health) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.armor;
    this.dodgeChance;
    this.magicResistance;
    this.health = health;

    this.damage = 0;
    this.criticalDamageMultiplier;

    this.color = "green";
    this.timer = 0;
  }
  /**
   * Функция отрисовки сущности
   */
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.font = "30px Arial";
    ctx.fillText(Math.floor(this.health), this.x, this.y);
    ctx.closePath();
  }
}

export class RangedEntity extends Entity {
  constructor() {
    super();
  }
}

export class MeleeEntity extends Entity {}

export class ArcherDefender extends RangedEntity {
  /**@type {number} - Определяет стоимость юнита */
  static cost = config.game.entities.archer.cost;

  constructor(x, y, width, height) {
    super();
    [super.x, super.y, super.width, super.height] = [x, y, width, height];

    this.health = config.game.entities.archer.health;
    this.damage = config.game.entities.archer.damage;
    this.timer = 0;
  }
}

export class Enemy extends Entity {
  constructor(x, y, width, height) {
    super();
    super.x = x;
    super.y = y;
    super.color = "red";
    super.width = width;
    super.height = height;
    this.criticalChange = 0.25;
    super.damage = 10;
    super.health = config.game.entities.enemy.health;
    this.speed = config.game.entities.enemy.speed();
    this.movement = this.speed;
    this.awards = config.game.entities.enemy.awards();
  }
  update() {
    this.x -= this.movement;
    for (const defender of defenders) {
      if (collision(defender, this)) {
        this.movement = 0;
        break;
      }
    }
  }
}

export class Boss extends Enemy {}
