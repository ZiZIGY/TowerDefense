/**
 * Конфигурационный объект для приложения.
 * @typedef {Object} Config
 *
 * @property {Object} cell - Конфигурация клетки.
 * @property {number} cell.size - Размер клетки.
 * @property {string} cell.color - Цвет клетки.
 * @property {boolean} cell.fill - Необходимо ли заполнить клетку.
 *
 * @property {Object} game - Конфигурация игры.
 * @property {number} game.resources -  Количество ресурсов.
 * @property {number} game.frame - Количество фреймов.
 * @property {boolean} game.over - Закончилась ли игра.
 *
 * @property {Object} game.entities - Конфигурация сущностей.
 * @property {Object} game.entities.archer - Конфигурация лучника.
 * @property {number} game.entities.archer.cost - Стоимость лучника.
 * @property {number} game.entities.archer.damage - Урон лучника.
 * @property {number} game.entities.archer.health - Здоровье лучника.
 *
 * @property {Object} game.entities.enemy - Конфигурация врага.
 * @property {number} game.entities.enemy.damage - Урон врага.
 * @property {number} game.entities.enemy.health - Здоровье врага.
 * @property {number} game.entities.enemy.attackDelay - Задержка атаки врага.
 * @property {function} game.entities.enemy.awards - Возвращает награду за врага.
 * @property {function} game.entities.enemy.speed - Скорость врага.
 *
 * @property {Object} game.balance - Конфигурация баланса.
 * @property {Object} game.balance.spawn - Конфигурация спавна.
 * @property {number} game.balance.spawn.interval - Интервал спавна врага.
 * @property {number} game.balance.spawn.decreaseIntervalSpawnEnemyValue - Уменьшает интерфал спавна врага на это значение.
 * @property {number} game.balance.spawn.decreaseIntervalSpawnEnemyValueCondition - Условие для уменьшения интервала спавна врага.
 * Интервал спавна врагов будет постоянно уменьшаться пока не достигнет этого значения.
 */

/**
 * Главный конфигурационный объект для приложения.
 * @type {Config}
 */
export const config = {
  cell: {
    size: 100,
    color: "black",
    fill: false,
  },
  game: {
    score: 0,
    over: false,
    frame: 0,
    resources: 1000,
    entities: {
      archer: {
        cost: 100,
        damage: 10,
        health: 100,
      },
      enemy: {
        damage: 10,
        attackDelay: 100,
        health: 200,
        awards: () => Math.random() * 20,
        speed: () => Math.random() * 0.2 + 0.4,
      },
    },
    balance: {
      spawn: {
        interval: 1000,
        decreaseIntervalSpawnEnemyValue: 10,
        decreaseIntervalSpawnEnemyValueCondition: 100,
      },
    },
  },
};
