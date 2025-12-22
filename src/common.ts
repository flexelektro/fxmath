import {V2,v2} from './v2';

declare interface FxHashAPI {
  hash: string;
  rand: () => number;
  minter: string;
  randminter: () => number;
  preview: () => void;
  isPreview: boolean;
  params: (definitions: any) => void;
  getParam: (id: string) => any;
  getParams: () => any;
  getRawParam: (id: string) => any;
  getRawParams: () => any;
  getDefinitions: () => any;
  features: (features: any) => void;
  getFeature: (id: string) => any;
  getFeatures: () => any;
  stringifyParams: (definitions: any) => string;
}

declare interface Window {
  $fx: FxHashAPI;
}

export type IPos = {
  x: number;
  y: number;
}

const {PI, log, sin, cos, tan, atan, atan2, random, floor, ceil, sqrt, round, exp, pow, abs, sign, min, max} = Math;
const PI2 = PI * 2;
const TAU = PI2;
const HALF_PI = PI / 2;
const GOLDENRATIO = 1.61803398875;
const DEG2RAD = PI / 180;
const RAD2DEG = 180 / PI;

// ============================================================================
// ANGLE CONVERSION
// ============================================================================

/**
 * Converts degrees to radians.
 */
const degToRad = (degrees: number): number => degrees * DEG2RAD;

/**
 * Converts radians to degrees.
 */
const radToDeg = (radians: number): number => radians * RAD2DEG;


const makeFibonacci = (n:number) => {
    let arr = [0,1];
    for(let i = 2; i < n; i++){
        arr.push(arr[i-1] + arr[i-2]);
    }
    return arr;
}

/**
 * Maps a number from one range to another.
 * @example map(0.5, 0, 1, 0, 100) // returns 50
 */
const map = (n: number, start: number, stop: number, targetStart: number, targetStop: number): number => {
  return targetStart + (n - start) / (stop - start) * (targetStop - targetStart);
}

/**
 * Linear interpolation between two values.
 * @param start - Start value
 * @param stop - End value
 * @param amt - Interpolation amount (0 to 1)
 */
const lerp = (start: number, stop: number, amt: number): number => {
  return amt * (stop - start) + start;
}

const mix = lerp;

/**
 * Inverse linear interpolation - returns where a value falls between two bounds.
 * @returns Value between 0 and 1 (or outside if value is outside bounds)
 * @example inverseLerp(0, 100, 50) // returns 0.5
 */
const inverseLerp = (start: number, stop: number, value: number): number => {
  return (value - start) / (stop - start);
}

/**
 * Remaps a value from one range to another (combines inverseLerp and lerp).
 * @example remap(50, 0, 100, 0, 1) // returns 0.5
 */
const remap = (value: number, inStart: number, inStop: number, outStart: number, outStop: number): number => {
  return lerp(outStart, outStop, inverseLerp(inStart, inStop, value));
}

const dist = (ax: number, ay: number, bx: number, by: number) => {
  return Math.sqrt(Math.pow((ax - bx), 2) + Math.pow((ay - by), 2));
}

const rnd = (a: number, b: number,mathrandom = false) => {
  const random = mathrandom ? Math.random() :RND()
  return a + (b - a) * random;
}

const rndInt = (low:number,high:number) => {
  return low + Math.floor( RND() * ( high - low + 1 ) );
}

const random2 = (a: number,seed = 12345) => {
  let x = Math.sin(a * seed) * 10000;
  return x - Math.floor(x);
}


// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript

const mulberry32RND = (a:number) => {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// @ts-ignore
if(window?.$fx){console.log("fxhash-api detected",window?.$fx.hash,window?.$fx.rand())}
// @ts-ignore
let mullBerryRND = mulberry32RND((typeof window !== "undefined" && window?.$fx) ? $fx.rand()*10000 : Math.random()*10000)

const resetRNDHASH = (hash:number) => {
  mullBerryRND = mulberry32RND(hash)
}

const RND = () => {
  // @ts-ignore
  return mullBerryRND(); //Math.random();
}

const weightedRandomLn = (rand0to1: number, zeroHasHeigherProb = true) => {
  let e = Math.exp(1);
  let x0 = Math.pow(e, 2) - 1; // At x0 this will become 1 ---
  let x = x0 * rand0to1;
  let rnd = (Math.log(1 + x) / 2);

  if(zeroHasHeigherProb){
    return 1 - rnd;
  } else{
    return rnd;
  }
}




const rand_box_muller = () : number => {
  let u = 0, v = 0;
  while(u === 0) u = RND();
  while(v === 0) v = RND();
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return rand_box_muller() // resample between 0 and 1
  return num
}
const pickRandom = (...args: any[]) => {
  let len = args.length;
  let rnd = Math.round(RND() * (len - 1));
  return args[rnd];
}

const pickRandomFromArray = <T>(arr: T[],splice=false) => {
  let len = arr.length;
  // @ts-ignore
  let _rnd = window.fxrand ? fxrand() : Math.random();
  let rnd = Math.round(_rnd * (len - 1));
  if(splice){
    let el =  arr.splice(rnd,1);
    return el[0];
  }
  return arr[rnd];
}

/**
 * Returns the fractional part of a number.
 * @example fract(3.7) // returns 0.7
 */
const fract = (x: number): number => {
  return x - Math.floor(x);
}

/**
 * Clamps a value between min and max.
 */
const clamp = (x: number, min: number = 0, max: number = 1): number => {
  return Math.min(max, Math.max(x, min));
}

/**
 * Clamps a value between 0 and 1.
 * @example saturate(1.5) // returns 1
 */
const saturate = (x: number): number => {
  return clamp(x, 0, 1);
}

/**
 * Step function - returns 0 if x < edge, else 1.
 * @example step(0.5, 0.3) // returns 0
 * @example step(0.5, 0.7) // returns 1
 */
const step = (edge: number, x: number): number => {
  return x < edge ? 0 : 1;
}

/**
 * PingPong - bounces value back and forth within length.
 * @example pingPong(2.5, 2) // returns 1.5
 * @example pingPong(3.5, 2) // returns 0.5
 */
const pingPong = (t: number, length: number): number => {
  const t2 = t % (length * 2);
  return length - Math.abs(t2 - length);
}

/**
 * Wraps a value within a range (like modulo but works with negative numbers).
 */
const modWrap = (x: number, min: number = 0, max: number = 1): number => {
  const range = max - min;
  return ((((x - min) % range) + range) % range) + min;
}

/**
 * Checks if two floats are approximately equal within epsilon.
 * @example approximately(0.1 + 0.2, 0.3) // returns true
 */
const approximately = (a: number, b: number, epsilon: number = 0.00001): number => {
  return Math.abs(a - b) < epsilon ? 1 : 0;
}

/**
 * Checks if two floats are approximately equal (returns boolean).
 */
const approxEqual = (a: number, b: number, epsilon: number = 0.00001): boolean => {
  return Math.abs(a - b) < epsilon;
}


/**
 * Smooth Hermite interpolation between 0 and 1.
 * @param edge0 - Lower edge
 * @param edge1 - Upper edge
 * @param x - Value to interpolate
 * @returns Smoothly interpolated value between 0 and 1
 */
const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Quintic interpolation - smoother than smoothstep (zero first and second derivatives at edges).
 */
const quinticinterpol = (edge0: number, edge1: number, x0: number): number => {
  const x = clamp((x0 - edge0) / (edge1 - edge0), 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/**
 * Attempt to smoothly interpolate with a controllable smoothness parameter.
 * @param edge0 - Lower edge
 * @param edge1 - Upper edge
 * @param x - Value to interpolate
 * @param k - Smoothness factor (higher = sharper transition)
 */
const smootherstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}


const createPseudoPoissonDistribution = (OPT: {W: number, H: number, size: number, perc: number, hasShiftRow: boolean}) => {
  const {W,H,size,perc,hasShiftRow} = OPT;

  let dots: V2[][] = [];
  let anzX = Math.ceil(W / size);
  let anzY = Math.ceil(H / size);

  for(let i = 0; i < anzY; i++){
    let row:V2[] = [];
    for(let j = 0; j < anzX; j++){
      let shiftrow = hasShiftRow ? (i % 2 === 0 ? size / 2 : 0) : 0;
      let _rnd = RND();
      let _rnd2 = RND();
      let phi = _rnd * 2 * Math.PI;
      let dr = weightedRandomLn(_rnd2) * perc / 100 * size;
      let dx = dr * Math.cos(phi);
      let dy = dr * Math.sin(phi);
      row.push(V2.create( j * size + size / 2 + shiftrow + dx,  i * size + size / 2 + dy ))
    }
    dots.push(row)
  }
  return dots;
}


const randomWeightedFromArray = <T>(arr:{value:T,prob:number,start?: number, end?: number}[]) => {

  let probSum = arr.reduce((prev, curr) => {
    return prev + curr.prob
  }, 0);

  let iterate = 0;
  arr.forEach(item => {
    item.start = iterate;
    item.end = iterate + item.prob;
    iterate = item.end;
  })

  // @ts-ignore
  let r = window.fxrand ? fxrand() : Math.random();
  let rnd = r * probSum;
  let theOne = arr.find((itm: any) => {
    return (itm.start <= rnd && itm.end > rnd);
  })

  return theOne!.value as T

}

/**
 * Swaps two values and returns them as a tuple [b, a].
 * Usage: const [newA, newB] = swapVals(a, b);
 */
const swapVals = <T>(a: T, b: T): [T, T] => {
  return [b, a];
}


const isEven = (n: number) => {
  return n % 2 === 0;
}

function sawTooth(_x:number, A:number) {
  let x = _x + 1000*A;
  var result = x % (2 * A);
  if(result > A) {
    return 2 * A - result;
  } else {
    return result;
  }
}

/**
 * Creates a 2D square array filled with a default value.
 * @param size - Dimension of the square array
 * @param defaultValue - Value to fill (default: 0)
 */
function make2dSquareArray<T = number>(size: number, defaultValue: T = 0 as T): T[][] {
  return make2dArray(size, size, defaultValue);
}

/**
 * Creates a 2D array filled with a default value.
 * @param rows - Number of rows
 * @param cols - Number of columns
 * @param defaultValue - Value to fill (default: 0)
 */
function make2dArray<T = number>(rows: number, cols: number, defaultValue: T = 0 as T): T[][] {
  const arr: T[][] = [];
  for (let y = 0; y < rows; y++) {
    const row: T[] = [];
    for (let x = 0; x < cols; x++) {
      row.push(defaultValue);
    }
    arr.push(row);
  }
  return arr;
}


/**
 * Shuffles an array in place using Fisher-Yates algorithm.
 * @returns The same array, shuffled
 */
function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(RND() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

/**
 * Returns a new shuffled copy of an array (doesn't mutate original).
 */
function shuffledCopy<T>(array: T[]): T[] {
  return shuffleArray([...array]);
}

/**
 * Returns the last element of an array.
 */
function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

/**
 * Returns the first element of an array.
 */
function first<T>(array: T[]): T | undefined {
  return array[0];
}

/**
 * Creates an array of numbers from start to end (exclusive).
 * @example range(0, 5) // [0, 1, 2, 3, 4]
 * @example range(5) // [0, 1, 2, 3, 4]
 */
function range(startOrEnd: number, end?: number, step: number = 1): number[] {
  const start = end === undefined ? 0 : startOrEnd;
  const stop = end === undefined ? startOrEnd : end;
  const result: number[] = [];

  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
  } else if (step < 0) {
    for (let i = start; i > stop; i += step) {
      result.push(i);
    }
  }

  return result;
}

/**
 * Sums all numbers in an array.
 */
function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0);
}

/**
 * Returns the average of all numbers in an array.
 */
function average(array: number[]): number {
  return array.length === 0 ? 0 : sum(array) / array.length;
}

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return ((...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
}


// ============================================================================
// EXPORTS
// ============================================================================

export {
  // Constants
  PI, PI2, TAU, HALF_PI,
  GOLDENRATIO,
  DEG2RAD, RAD2DEG,

  // Math functions from Math object
  log, sin, cos, tan, atan, atan2,
  random, floor, ceil, sqrt, round, exp, pow,
  abs, sign, min, max,

  // Angle conversion
  degToRad, radToDeg,

  // Interpolation & mapping
  lerp, mix, inverseLerp, remap, map,
  smoothstep, smootherstep, quinticinterpol,

  // Clamping & wrapping
  clamp, saturate, fract, modWrap,
  step, pingPong,

  // Comparison
  approximately, approxEqual,

  // Distance
  dist,

  // Random
  rnd, rndInt, RND, resetRNDHASH,
  random2, rand_box_muller,
  weightedRandomLn,
  pickRandom, pickRandomFromArray,
  randomWeightedFromArray,

  // Arrays
  make2dArray, make2dSquareArray,
  shuffleArray, shuffledCopy,
  range, sum, average,
  first, last,
  swapVals,

  // Sequences
  makeFibonacci,

  // Distributions
  createPseudoPoissonDistribution,

  // Utilities
  isEven, sawTooth, debounce
}

