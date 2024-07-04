import { Defender, Entity } from "./entities.js";

import { defenders } from "../variables.js";

export class CombatSystem {
  /**
   * Функция для нанесения урона
   *
   * @param {Entity} from от кого наносится урон
   * @param {Entity} to кому наносится урон
   */
  static doPhysicalDamage(from, to) {
    to.health -= from.damage;
    if (to.health <= 0) {
      CombatSystem.kill(to);
    }
  }

  /**Фунция для нанесения критического урона
   *
   * @param {Entity} from
   * @param {Entity} to
   */
  static doCriticalDamage(from, to) {}

  static doMagicalDamage(from, to) {}

  static doHeal(entity, amount) {}

  static doLifeSteal(entity, amount) {}
  /**
   *
   * @param {Entity} entity
   */
  static kill(entity) {
    if (entity instanceof Defender) {
      entity.removeFrom(defenders);
    }
  }
}

// export class Projectile extends Entity {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.width = 10;
//     this.height = 10;
//     this.speed = 10;
//     this.parent;
//   }
//   draw() {}
// }
