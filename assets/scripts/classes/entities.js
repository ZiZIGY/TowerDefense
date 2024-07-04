import { ctx, defenders } from "../variables.js";

import { CombatSystem } from "./combat.js";
import { collision } from "../lib/functions.js";
import { config } from "../config.js";

/**
 * @class Entity
 * @classdesc Класс Entity представляет сущность в игре.
 * @property {number} x - Горизонтальное положение объекта в игровом мире или на холсте.
 * @property {number} y - Вертикальное положение объекта в игровом мире или на холсте.
 * @property {number} width - Ширина объекта.
 * @property {number} height - Высота объекта.
 * @property {number} health - Здоровье объекта.
 * @property {number} damage - Урон объекта.
 * @property {number} speed - Скорость объекта.
 * @property {number} level - Уровень объекта.
 * @property {string} color - Цвет объекта.
 * @property {number} armor - Броня объекта.
 * @property {number} dodgeChange - Шанс уклонения объекта.
 * @property {number} magicResistance - Магическая защита объекта.
 * @property {number} criticalChance - Шанс критического удара объекта.
 * @property {number} criticalDamageMultiplier - Множитель критического удара объекта.
 * @property {number} timer -
 */
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
    this.color = "green";

    this.level;

    this.armor;
    this.dodgeChance;
    this.magicResistance;
    this.health = health;

    this.damage;
    this.criticalDamageMultiplier;
    this.criticalChance;

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
  /**
   * Функция для удаления существа из массива в котором он находится
   *
   * @param {Array<Entity>} entities - массив в котором находится сущность
   */
  removeFrom(entities) {
    entities.splice(entities.indexOf(this), 1);
  }
}

/**
 * @class Enemy
 * @classdesc Класс Enemy представляет сущность врага.
 * @property {number} x - Параметр `x` в представляет горизонтальное положение создаваемого
 * объекта в игровом мире или на холсте.
 * @property {number} y - Параметр `y` свойство представляет вертикальное положение объекта.
 * @property {number} width - Параметр `width` это свойство представляет ширину объекта.
 * @property {number} height - Параметр `height` это свойство представляет высоту объекта.
 * @property {number} health - Параметр `health` здоровье врага
 * @property {number} damage - Параметр `damage` урон врага
 * @property {number} attackDelay - Параметр `attackDelay` задержка атаки врага
 * @property {number} awards - Параметр `awards` награда за убийство врага
 * @property {number} speed - Параметр `speed` скорость врага
 * @property {number} movement - Параметр `movement`используется для перемещения врага
 * @property {number} timer - Параметр `timer` это свойство представляет таймер объекта.
 *
 */
export class Enemy extends Entity {
  /**
   * Функция-конструктор инициализирует свойства вражеского объекта в игре.
   * @param x - Параметр `x` в функции-конструкторе представляет координату x позиции, где будет
   * находиться вражеский объект на игровом экране.
   * @param y - Параметр `y` в функции-конструкторе представляет вертикальное положение создаваемого
   * объекта или сущности. Он определяет расстояние от верхней части экрана или контейнера до верхнего
   * края объекта.
   * @param width - Параметр «width» в функции-конструкторе представляет ширину объекта, например врага
   * в игре. Он определяет горизонтальный размер объекта на экране или в игровом мире. В
   * предоставленном фрагменте кода параметр width используется для установки свойства ширины объекта.
   * @param height - Параметр «высота» в функции-конструкторе представляет вертикальный размер или
   * размер объекта, например врага в игре. Он указывает, насколько высока сущность в игровом мире.
   */
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "red";

    this.damage = config.game.entities.enemy.damage;
    this.attackDelay = config.game.entities.enemy.attackDelay;
    this.health = config.game.entities.enemy.health;

    this.speed = config.game.entities.enemy.speed();
    this.movement = this.speed;

    this.awards = config.game.entities.enemy.awards();
  }
  /**
   * Функция move уменьшает координату x на значение движения, а затем проверяет наличие столкновений.
   */
  move() {
    this.x -= this.movement;
    this.checkCollision();
  }
  /**
   * Этот метод устанавливает для свойства объекта
   * «движение» значение «0», фактически останавливая движение объекта.
   * */
  stopMove = () => (this.movement = 0);

  /* Метод startMove в классе Enemy устанавливает для свойства движения объекта исходное значение
  скорости, эффективно возобновляя движение врага после того, как оно было остановлено столкновением
  с защитником. */
  startMove = () => (this.movement = this.speed);
  /**
   * Функция «checkCollision» обходит защитников, проверяя наличие столкновений, и либо останавливает
   * движение и начинает драку, либо продолжает движение.
   */
  checkCollision() {
    for (const defender of defenders) {
      if (collision(defender, this)) {
        this.stopMove();
        this.fightWith(defender);
        break;
      } else this.startMove();
    }
  }
  /**
   * Функция «fightWith» увеличивает таймер и наносит физический урон защитнику, если таймер достигает
   * определенного порога задержки атаки.
   * @param {Defender} defender - Параметр «защитник» в функции «fightWith»,  относится к сущности
   * или объекту, который подвергается атаке со стороны сущности, вызывающей метод «fightWith». Он
   * является целью атаки и получит физический урон при выполнении атаки.
   */
  fightWith(defender) {
    this.timer++;
    if (this.timer >= this.attackDelay) {
      this.timer = 0;
      CombatSystem.doPhysicalDamage(this, defender);
    }
  }
  getAward() {
    return this.awards;
  }
}

export class Defender extends Entity {}

//TODO реализовать работу лучников
export class Archer extends Defender {
  /** @property {number} cost - Определяет стоимость юнита */
  static cost = config.game.entities.archer.cost;
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.health = config.game.entities.archer.health;
    this.damage = config.game.entities.archer.damage;
  }
}

export class Boss extends Enemy {}
