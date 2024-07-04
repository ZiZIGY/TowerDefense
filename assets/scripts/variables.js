import { Enemy, Entity } from "./classes/entities.js";

import { Cell } from "./classes/cell.js";

/** @type {HTMLCanvasElement} */
export const canvas = document.querySelector("canvas");
/** @type {CanvasRenderingContext2D} */
export const ctx = canvas.getContext("2d");
/**
 * @typedef {Array<Cell>} GameGrid
 */

/** @type {Array<Cell>}  */
export const gameGrid = [];
/**
 * Конфигурационный объект для приложения.
 * @typedef {Object} MouseState
 * @property {number} x - Размер клетки.
 * @property {number} y - Цвет клетки.
 * @property {number} height - Высота клетку.
 * @property {number} width - Ширина клетку.
 */

/**
 * Главный конфигурационный объект для приложения.
 * @type {MouseState}
 */
export const mouse = {
  x: undefined,
  y: undefined,
  height: 0,
  width: 0,
};

/**
 * @type {Array<Enemy>}
 *  Массив сущностей врагов.
 */
export const enemies = [];

/**
 * @type {Array<Entity>}
 */
export const defenders = [];

/**@type {Array<Number>} */
export const enemyPositions = [];

/**
 * Утилита для сохранения времени.
 *
 * @property {number} last Предыдущее значение времени.
 * @property {number} current Текущее значение времени.
 */
export const requestFrameTimer = {
  last: 0,
  current: undefined,
};
