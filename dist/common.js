"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weightedRandomLn = exports.rand_box_muller = exports.random2 = exports.resetRNDHASH = exports.RND = exports.rndInt = exports.rnd = exports.dist = exports.approxEqual = exports.approximately = exports.pingPong = exports.step = exports.modWrap = exports.fract = exports.saturate = exports.clamp = exports.quinticinterpol = exports.smootherstep = exports.smoothstep = exports.map = exports.remap = exports.inverseLerp = exports.mix = exports.lerp = exports.radToDeg = exports.degToRad = exports.max = exports.min = exports.sign = exports.abs = exports.pow = exports.exp = exports.round = exports.sqrt = exports.ceil = exports.floor = exports.random = exports.atan2 = exports.atan = exports.tan = exports.cos = exports.sin = exports.log = exports.RAD2DEG = exports.DEG2RAD = exports.GOLDENRATIO = exports.HALF_PI = exports.TAU = exports.PI2 = exports.PI = void 0;
exports.isEven = exports.createPseudoPoissonDistribution = exports.makeFibonacci = exports.swapVals = exports.randomWeightedFromArray = exports.pickRandomFromArray = exports.pickRandom = void 0;
exports.make2dArray = make2dArray;
exports.make2dSquareArray = make2dSquareArray;
exports.shuffleArray = shuffleArray;
exports.shuffledCopy = shuffledCopy;
exports.range = range;
exports.sum = sum;
exports.average = average;
exports.first = first;
exports.last = last;
exports.sawTooth = sawTooth;
exports.debounce = debounce;
const v2_1 = require("./v2");
const { PI, log, sin, cos, tan, atan, atan2, random, floor, ceil, sqrt, round, exp, pow, abs, sign, min, max } = Math;
exports.PI = PI;
exports.log = log;
exports.sin = sin;
exports.cos = cos;
exports.tan = tan;
exports.atan = atan;
exports.atan2 = atan2;
exports.random = random;
exports.floor = floor;
exports.ceil = ceil;
exports.sqrt = sqrt;
exports.round = round;
exports.exp = exp;
exports.pow = pow;
exports.abs = abs;
exports.sign = sign;
exports.min = min;
exports.max = max;
const PI2 = PI * 2;
exports.PI2 = PI2;
const TAU = PI2;
exports.TAU = TAU;
const HALF_PI = PI / 2;
exports.HALF_PI = HALF_PI;
const GOLDENRATIO = 1.61803398875;
exports.GOLDENRATIO = GOLDENRATIO;
const DEG2RAD = PI / 180;
exports.DEG2RAD = DEG2RAD;
const RAD2DEG = 180 / PI;
exports.RAD2DEG = RAD2DEG;
// ============================================================================
// ANGLE CONVERSION
// ============================================================================
/**
 * Converts degrees to radians.
 */
const degToRad = (degrees) => degrees * DEG2RAD;
exports.degToRad = degToRad;
/**
 * Converts radians to degrees.
 */
const radToDeg = (radians) => radians * RAD2DEG;
exports.radToDeg = radToDeg;
const makeFibonacci = (n) => {
    let arr = [0, 1];
    for (let i = 2; i < n; i++) {
        arr.push(arr[i - 1] + arr[i - 2]);
    }
    return arr;
};
exports.makeFibonacci = makeFibonacci;
/**
 * Maps a number from one range to another.
 * @example map(0.5, 0, 1, 0, 100) // returns 50
 */
const map = (n, start, stop, targetStart, targetStop) => {
    return targetStart + (n - start) / (stop - start) * (targetStop - targetStart);
};
exports.map = map;
/**
 * Linear interpolation between two values.
 * @param start - Start value
 * @param stop - End value
 * @param amt - Interpolation amount (0 to 1)
 */
const lerp = (start, stop, amt) => {
    return amt * (stop - start) + start;
};
exports.lerp = lerp;
const mix = lerp;
exports.mix = mix;
/**
 * Inverse linear interpolation - returns where a value falls between two bounds.
 * @returns Value between 0 and 1 (or outside if value is outside bounds)
 * @example inverseLerp(0, 100, 50) // returns 0.5
 */
const inverseLerp = (start, stop, value) => {
    return (value - start) / (stop - start);
};
exports.inverseLerp = inverseLerp;
/**
 * Remaps a value from one range to another (combines inverseLerp and lerp).
 * @example remap(50, 0, 100, 0, 1) // returns 0.5
 */
const remap = (value, inStart, inStop, outStart, outStop) => {
    return lerp(outStart, outStop, inverseLerp(inStart, inStop, value));
};
exports.remap = remap;
const dist = (ax, ay, bx, by) => {
    return Math.sqrt(Math.pow((ax - bx), 2) + Math.pow((ay - by), 2));
};
exports.dist = dist;
const rnd = (a, b, mathrandom = false) => {
    const random = mathrandom ? Math.random() : RND();
    return a + (b - a) * random;
};
exports.rnd = rnd;
const rndInt = (low, high) => {
    return low + Math.floor(RND() * (high - low + 1));
};
exports.rndInt = rndInt;
const random2 = (a, seed = 12345) => {
    let x = Math.sin(a * seed) * 10000;
    return x - Math.floor(x);
};
exports.random2 = random2;
// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
const mulberry32RND = (a) => {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
};
// @ts-ignore
if (window === null || window === void 0 ? void 0 : window.$fx) {
    console.log("fxhash-api detected", window === null || window === void 0 ? void 0 : window.$fx.hash, window === null || window === void 0 ? void 0 : window.$fx.rand());
}
// @ts-ignore
let mullBerryRND = mulberry32RND((typeof window !== "undefined" && (window === null || window === void 0 ? void 0 : window.$fx)) ? $fx.rand() * 10000 : Math.random() * 10000);
const resetRNDHASH = (hash) => {
    mullBerryRND = mulberry32RND(hash);
};
exports.resetRNDHASH = resetRNDHASH;
const RND = () => {
    // @ts-ignore
    return mullBerryRND(); //Math.random();
};
exports.RND = RND;
const weightedRandomLn = (rand0to1, zeroHasHeigherProb = true) => {
    let e = Math.exp(1);
    let x0 = Math.pow(e, 2) - 1; // At x0 this will become 1 ---
    let x = x0 * rand0to1;
    let rnd = (Math.log(1 + x) / 2);
    if (zeroHasHeigherProb) {
        return 1 - rnd;
    }
    else {
        return rnd;
    }
};
exports.weightedRandomLn = weightedRandomLn;
const rand_box_muller = () => {
    let u = 0, v = 0;
    while (u === 0)
        u = RND();
    while (v === 0)
        v = RND();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0)
        return rand_box_muller(); // resample between 0 and 1
    return num;
};
exports.rand_box_muller = rand_box_muller;
const pickRandom = (...args) => {
    let len = args.length;
    let rnd = Math.round(RND() * (len - 1));
    return args[rnd];
};
exports.pickRandom = pickRandom;
const pickRandomFromArray = (arr, splice = false) => {
    let len = arr.length;
    // @ts-ignore
    let _rnd = window.fxrand ? fxrand() : Math.random();
    let rnd = Math.round(_rnd * (len - 1));
    if (splice) {
        let el = arr.splice(rnd, 1);
        return el[0];
    }
    return arr[rnd];
};
exports.pickRandomFromArray = pickRandomFromArray;
/**
 * Returns the fractional part of a number.
 * @example fract(3.7) // returns 0.7
 */
const fract = (x) => {
    return x - Math.floor(x);
};
exports.fract = fract;
/**
 * Clamps a value between min and max.
 */
const clamp = (x, min = 0, max = 1) => {
    return Math.min(max, Math.max(x, min));
};
exports.clamp = clamp;
/**
 * Clamps a value between 0 and 1.
 * @example saturate(1.5) // returns 1
 */
const saturate = (x) => {
    return clamp(x, 0, 1);
};
exports.saturate = saturate;
/**
 * Step function - returns 0 if x < edge, else 1.
 * @example step(0.5, 0.3) // returns 0
 * @example step(0.5, 0.7) // returns 1
 */
const step = (edge, x) => {
    return x < edge ? 0 : 1;
};
exports.step = step;
/**
 * PingPong - bounces value back and forth within length.
 * @example pingPong(2.5, 2) // returns 1.5
 * @example pingPong(3.5, 2) // returns 0.5
 */
const pingPong = (t, length) => {
    const t2 = t % (length * 2);
    return length - Math.abs(t2 - length);
};
exports.pingPong = pingPong;
/**
 * Wraps a value within a range (like modulo but works with negative numbers).
 */
const modWrap = (x, min = 0, max = 1) => {
    const range = max - min;
    return ((((x - min) % range) + range) % range) + min;
};
exports.modWrap = modWrap;
/**
 * Checks if two floats are approximately equal within epsilon.
 * @example approximately(0.1 + 0.2, 0.3) // returns true
 */
const approximately = (a, b, epsilon = 0.00001) => {
    return Math.abs(a - b) < epsilon ? 1 : 0;
};
exports.approximately = approximately;
/**
 * Checks if two floats are approximately equal (returns boolean).
 */
const approxEqual = (a, b, epsilon = 0.00001) => {
    return Math.abs(a - b) < epsilon;
};
exports.approxEqual = approxEqual;
/**
 * Smooth Hermite interpolation between 0 and 1.
 * @param edge0 - Lower edge
 * @param edge1 - Upper edge
 * @param x - Value to interpolate
 * @returns Smoothly interpolated value between 0 and 1
 */
const smoothstep = (edge0, edge1, x) => {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
};
exports.smoothstep = smoothstep;
/**
 * Quintic interpolation - smoother than smoothstep (zero first and second derivatives at edges).
 */
const quinticinterpol = (edge0, edge1, x0) => {
    const x = clamp((x0 - edge0) / (edge1 - edge0), 0, 1);
    return x * x * x * (x * (x * 6 - 15) + 10);
};
exports.quinticinterpol = quinticinterpol;
/**
 * Attempt to smoothly interpolate with a controllable smoothness parameter.
 * @param edge0 - Lower edge
 * @param edge1 - Upper edge
 * @param x - Value to interpolate
 * @param k - Smoothness factor (higher = sharper transition)
 */
const smootherstep = (edge0, edge1, x) => {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * t * (t * (t * 6 - 15) + 10);
};
exports.smootherstep = smootherstep;
const createPseudoPoissonDistribution = (OPT) => {
    const { W, H, size, perc, hasShiftRow } = OPT;
    let dots = [];
    let anzX = Math.ceil(W / size);
    let anzY = Math.ceil(H / size);
    for (let i = 0; i < anzY; i++) {
        let row = [];
        for (let j = 0; j < anzX; j++) {
            let shiftrow = hasShiftRow ? (i % 2 === 0 ? size / 2 : 0) : 0;
            let _rnd = RND();
            let _rnd2 = RND();
            let phi = _rnd * 2 * Math.PI;
            let dr = weightedRandomLn(_rnd2) * perc / 100 * size;
            let dx = dr * Math.cos(phi);
            let dy = dr * Math.sin(phi);
            row.push(v2_1.V2.create(j * size + size / 2 + shiftrow + dx, i * size + size / 2 + dy));
        }
        dots.push(row);
    }
    return dots;
};
exports.createPseudoPoissonDistribution = createPseudoPoissonDistribution;
const randomWeightedFromArray = (arr) => {
    let probSum = arr.reduce((prev, curr) => {
        return prev + curr.prob;
    }, 0);
    let iterate = 0;
    arr.forEach(item => {
        item.start = iterate;
        item.end = iterate + item.prob;
        iterate = item.end;
    });
    // @ts-ignore
    let r = window.fxrand ? fxrand() : Math.random();
    let rnd = r * probSum;
    let theOne = arr.find((itm) => {
        return (itm.start <= rnd && itm.end > rnd);
    });
    return theOne.value;
};
exports.randomWeightedFromArray = randomWeightedFromArray;
const swapVals = (a, b) => {
    let temp = b;
    b = a;
    a = temp;
    return [];
};
exports.swapVals = swapVals;
const isEven = (n) => {
    return n % 2 === 0;
};
exports.isEven = isEven;
function sawTooth(_x, A) {
    let x = _x + 1000 * A;
    var result = x % (2 * A);
    if (result > A) {
        return 2 * A - result;
    }
    else {
        return result;
    }
}
/**
 * Creates a 2D square array filled with a default value.
 * @param size - Dimension of the square array
 * @param defaultValue - Value to fill (default: 0)
 */
function make2dSquareArray(size, defaultValue = 0) {
    return make2dArray(size, size, defaultValue);
}
/**
 * Creates a 2D array filled with a default value.
 * @param rows - Number of rows
 * @param cols - Number of columns
 * @param defaultValue - Value to fill (default: 0)
 */
function make2dArray(rows, cols, defaultValue = 0) {
    const arr = [];
    for (let y = 0; y < rows; y++) {
        const row = [];
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
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(RND() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}
/**
 * Returns a new shuffled copy of an array (doesn't mutate original).
 */
function shuffledCopy(array) {
    return shuffleArray([...array]);
}
/**
 * Returns the last element of an array.
 */
function last(array) {
    return array[array.length - 1];
}
/**
 * Returns the first element of an array.
 */
function first(array) {
    return array[0];
}
/**
 * Creates an array of numbers from start to end (exclusive).
 * @example range(0, 5) // [0, 1, 2, 3, 4]
 * @example range(5) // [0, 1, 2, 3, 4]
 */
function range(startOrEnd, end, step = 1) {
    const start = end === undefined ? 0 : startOrEnd;
    const stop = end === undefined ? startOrEnd : end;
    const result = [];
    if (step > 0) {
        for (let i = start; i < stop; i += step) {
            result.push(i);
        }
    }
    else if (step < 0) {
        for (let i = start; i > stop; i += step) {
            result.push(i);
        }
    }
    return result;
}
/**
 * Sums all numbers in an array.
 */
function sum(array) {
    return array.reduce((a, b) => a + b, 0);
}
/**
 * Returns the average of all numbers in an array.
 */
function average(array) {
    return array.length === 0 ? 0 : sum(array) / array.length;
}
function debounce(func, delay) {
    let timeoutId = null;
    return ((...args) => {
        if (timeoutId)
            clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    });
}
//# sourceMappingURL=common.js.map