"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modWrap = exports.rand_box_muller = exports.isEven = exports.rndInt = exports.pow = exports.exp = exports.round = exports.swapVals = exports.sqrt = exports.ceil = exports.floor = exports.random = exports.atan = exports.atan2 = exports.tan = exports.cos = exports.sin = exports.log = exports.PI2 = exports.PI = exports.randomWeightedFromArray = exports.createPseudoPoissonDistribution = exports.pickRandom = exports.pickRandomFromArray = exports.weightedRandomLn = exports.quinticinterpol = exports.smoothstep = exports.clamp = exports.fract = exports.random2 = exports.RND = exports.rnd = exports.dist = exports.mix = exports.lerp = exports.map = exports.resetRNDHASH = void 0;
exports.sawTooth = sawTooth;
exports.make2dArray = make2dArray;
exports.make2dSquareArray = make2dSquareArray;
exports.shuffleArray = shuffleArray;
const v2_1 = require("./v2");
const { PI, log, sin, cos, tan, atan, atan2, random, floor, ceil, sqrt, round, exp, pow } = Math;
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
const PI2 = PI * 2;
exports.PI2 = PI2;
const map = (n, start, stop, targetStart, targetStop) => {
    const newVal = targetStart + (n - start) / (stop - start) * (targetStop - targetStart);
    return newVal;
};
exports.map = map;
const lerp = (start, stop, amt) => {
    return amt * (stop - start) + start;
};
exports.lerp = lerp;
const mix = lerp;
exports.mix = mix;
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
let mullBerryRND = mulberry32RND(window.fxrand ? fxrand() * 10000 : Math.random() * 10000);
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
const fract = (x) => {
    return x - Math.floor(x);
};
exports.fract = fract;
const clamp = (x, min = 0, max = 1) => {
    return Math.min(max, Math.max(x, min));
};
exports.clamp = clamp;
const modWrap = (x, min = 0, max = 1) => {
    return (x + (max - min)) % (max - min) + min;
};
exports.modWrap = modWrap;
const smoothstep = (edge0, edge1, x) => {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
};
exports.smoothstep = smoothstep;
const quinticinterpol = (edge0, edge1, x0) => {
    const x = clamp((x0 - edge0) / (edge1 - edge0), 0, 1);
    return x * x * x * (x * (x * 6 - 15) + 10);
};
exports.quinticinterpol = quinticinterpol;
const createPseudoPoissonDistribution = (OPT) => {
    const { W, H, size, perc, hasShiftRow } = OPT;
    let dots = [];
    let anzX = Math.ceil(W / size);
    let anzY = Math.ceil(H / size);
    for (let i = 0; i < anzY; i++) {
        let row = [];
        for (let j = 0; j < anzX; j++) {
            let shiftrow = hasShiftRow ? (i % 2 === 0 ? size / 2 : 0) : 0;
            let _rnd = fxrand ? fxrand() : Math.random();
            let _rnd2 = fxrand ? fxrand() : Math.random();
            let phi = _rnd * 2 * Math.PI;
            let dr = weightedRandomLn(_rnd2) * perc / 100 * size;
            let dx = dr * Math.cos(phi);
            let dy = dr * Math.sin(phi);
            row.push(v2_1.default.create(j * size + size / 2 + shiftrow + dx, i * size + size / 2 + dy));
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
function make2dSquareArray(MAP_DIMENSION) {
    let map3d = [];
    for (let iy = 0; iy < MAP_DIMENSION; iy++) {
        let row = [];
        for (let ix = 0; ix < MAP_DIMENSION; ix++) {
            row.push(0);
        }
        map3d.push(row);
    }
    return map3d;
}
function make2dArray(MAP_DIMENSION_Y, MAP_DIMENSION_X) {
    let map3d = [];
    for (let iy = 0; iy < MAP_DIMENSION_Y; iy++) {
        let row = [];
        for (let ix = 0; ix < MAP_DIMENSION_X; ix++) {
            row.push(0);
        }
        map3d.push(row);
    }
    return map3d;
}
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(RND() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}
//# sourceMappingURL=common.js.map