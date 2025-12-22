import { V2 } from './v2';
export type IPos = {
    x: number;
    y: number;
};
declare const PI: number, log: (x: number) => number, sin: (x: number) => number, cos: (x: number) => number, tan: (x: number) => number, atan: (x: number) => number, atan2: (y: number, x: number) => number, random: () => number, floor: (x: number) => number, ceil: (x: number) => number, sqrt: (x: number) => number, round: (x: number) => number, exp: (x: number) => number, pow: (x: number, y: number) => number, abs: (x: number) => number, sign: (x: number) => number, min: (...values: number[]) => number, max: (...values: number[]) => number;
declare const PI2: number;
declare const TAU: number;
declare const HALF_PI: number;
declare const GOLDENRATIO = 1.61803398875;
declare const DEG2RAD: number;
declare const RAD2DEG: number;
/**
 * Converts degrees to radians.
 */
declare const degToRad: (degrees: number) => number;
/**
 * Converts radians to degrees.
 */
declare const radToDeg: (radians: number) => number;
declare const makeFibonacci: (n: number) => number[];
/**
 * Maps a number from one range to another.
 * @example map(0.5, 0, 1, 0, 100) // returns 50
 */
declare const map: (n: number, start: number, stop: number, targetStart: number, targetStop: number) => number;
/**
 * Linear interpolation between two values.
 * @param start - Start value
 * @param stop - End value
 * @param amt - Interpolation amount (0 to 1)
 */
declare const lerp: (start: number, stop: number, amt: number) => number;
declare const mix: (start: number, stop: number, amt: number) => number;
/**
 * Inverse linear interpolation - returns where a value falls between two bounds.
 * @returns Value between 0 and 1 (or outside if value is outside bounds)
 * @example inverseLerp(0, 100, 50) // returns 0.5
 */
declare const inverseLerp: (start: number, stop: number, value: number) => number;
/**
 * Remaps a value from one range to another (combines inverseLerp and lerp).
 * @example remap(50, 0, 100, 0, 1) // returns 0.5
 */
declare const remap: (value: number, inStart: number, inStop: number, outStart: number, outStop: number) => number;
declare const dist: (ax: number, ay: number, bx: number, by: number) => number;
declare const rnd: (a: number, b: number, mathrandom?: boolean) => number;
declare const rndInt: (low: number, high: number) => number;
declare const random2: (a: number, seed?: number) => number;
declare const resetRNDHASH: (hash: number) => void;
declare const RND: () => number;
declare const weightedRandomLn: (rand0to1: number, zeroHasHeigherProb?: boolean) => number;
declare const rand_box_muller: () => number;
declare const pickRandom: (...args: any[]) => any;
declare const pickRandomFromArray: <T>(arr: T[], splice?: boolean) => T;
/**
 * Returns the fractional part of a number.
 * @example fract(3.7) // returns 0.7
 */
declare const fract: (x: number) => number;
/**
 * Clamps a value between min and max.
 */
declare const clamp: (x: number, min?: number, max?: number) => number;
/**
 * Clamps a value between 0 and 1.
 * @example saturate(1.5) // returns 1
 */
declare const saturate: (x: number) => number;
/**
 * Step function - returns 0 if x < edge, else 1.
 * @example step(0.5, 0.3) // returns 0
 * @example step(0.5, 0.7) // returns 1
 */
declare const step: (edge: number, x: number) => number;
/**
 * PingPong - bounces value back and forth within length.
 * @example pingPong(2.5, 2) // returns 1.5
 * @example pingPong(3.5, 2) // returns 0.5
 */
declare const pingPong: (t: number, length: number) => number;
/**
 * Wraps a value within a range (like modulo but works with negative numbers).
 */
declare const modWrap: (x: number, min?: number, max?: number) => number;
/**
 * Checks if two floats are approximately equal within epsilon.
 * @example approximately(0.1 + 0.2, 0.3) // returns true
 */
declare const approximately: (a: number, b: number, epsilon?: number) => number;
/**
 * Checks if two floats are approximately equal (returns boolean).
 */
declare const approxEqual: (a: number, b: number, epsilon?: number) => boolean;
/**
 * Smooth Hermite interpolation between 0 and 1.
 * @param edge0 - Lower edge
 * @param edge1 - Upper edge
 * @param x - Value to interpolate
 * @returns Smoothly interpolated value between 0 and 1
 */
declare const smoothstep: (edge0: number, edge1: number, x: number) => number;
/**
 * Quintic interpolation - smoother than smoothstep (zero first and second derivatives at edges).
 */
declare const quinticinterpol: (edge0: number, edge1: number, x0: number) => number;
/**
 * Attempt to smoothly interpolate with a controllable smoothness parameter.
 * @param edge0 - Lower edge
 * @param edge1 - Upper edge
 * @param x - Value to interpolate
 * @param k - Smoothness factor (higher = sharper transition)
 */
declare const smootherstep: (edge0: number, edge1: number, x: number) => number;
declare const createPseudoPoissonDistribution: (OPT: {
    W: number;
    H: number;
    size: number;
    perc: number;
    hasShiftRow: boolean;
}) => V2[][];
declare const randomWeightedFromArray: <T>(arr: {
    value: T;
    prob: number;
    start?: number;
    end?: number;
}[]) => T;
declare const swapVals: (a: number, b: number) => never[];
declare const isEven: (n: number) => boolean;
declare function sawTooth(_x: number, A: number): number;
/**
 * Creates a 2D square array filled with a default value.
 * @param size - Dimension of the square array
 * @param defaultValue - Value to fill (default: 0)
 */
declare function make2dSquareArray<T = number>(size: number, defaultValue?: T): T[][];
/**
 * Creates a 2D array filled with a default value.
 * @param rows - Number of rows
 * @param cols - Number of columns
 * @param defaultValue - Value to fill (default: 0)
 */
declare function make2dArray<T = number>(rows: number, cols: number, defaultValue?: T): T[][];
/**
 * Shuffles an array in place using Fisher-Yates algorithm.
 * @returns The same array, shuffled
 */
declare function shuffleArray<T>(array: T[]): T[];
/**
 * Returns a new shuffled copy of an array (doesn't mutate original).
 */
declare function shuffledCopy<T>(array: T[]): T[];
/**
 * Returns the last element of an array.
 */
declare function last<T>(array: T[]): T | undefined;
/**
 * Returns the first element of an array.
 */
declare function first<T>(array: T[]): T | undefined;
/**
 * Creates an array of numbers from start to end (exclusive).
 * @example range(0, 5) // [0, 1, 2, 3, 4]
 * @example range(5) // [0, 1, 2, 3, 4]
 */
declare function range(startOrEnd: number, end?: number, step?: number): number[];
/**
 * Sums all numbers in an array.
 */
declare function sum(array: number[]): number;
/**
 * Returns the average of all numbers in an array.
 */
declare function average(array: number[]): number;
declare function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T;
export { PI, PI2, TAU, HALF_PI, GOLDENRATIO, DEG2RAD, RAD2DEG, log, sin, cos, tan, atan, atan2, random, floor, ceil, sqrt, round, exp, pow, abs, sign, min, max, degToRad, radToDeg, lerp, mix, inverseLerp, remap, map, smoothstep, smootherstep, quinticinterpol, clamp, saturate, fract, modWrap, step, pingPong, approximately, approxEqual, dist, rnd, rndInt, RND, resetRNDHASH, random2, rand_box_muller, weightedRandomLn, pickRandom, pickRandomFromArray, randomWeightedFromArray, make2dArray, make2dSquareArray, shuffleArray, shuffledCopy, range, sum, average, first, last, swapVals, makeFibonacci, createPseudoPoissonDistribution, isEven, sawTooth, debounce };
