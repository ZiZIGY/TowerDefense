import { Entity } from "./entities";

export class CombatSystem {
  /**
   * Функция для нанесения урона
   *
   * @param {Entity} from от кого наносится урон
   * @param {Entity} to кому наносится урон
   */
  static doPhysicalDamage(from, to) {}

  /**Фунция для нанесения критического урона
   *
   * @param {Entity} from
   * @param {Entity} to
   */
  static doCriticalDamage(from, to) {}

  static doMagicalDamage(from, to) {}

  static doHeal(entity, amount) {}

  static doLifeSteal(entity, amount) {}

  static kill(entity) {}
}

export class Projectile {}
