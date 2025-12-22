"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approximately = exports.pingPong = exports.step = exports.modWrap = exports.fract = exports.saturate = exports.clamp = exports.quinticinterpol = exports.smootherstep = exports.smoothstep = exports.map = exports.remap = exports.inverseLerp = exports.mix = exports.lerp = exports.radToDeg = exports.degToRad = exports.max = exports.min = exports.sign = exports.abs = exports.pow = exports.exp = exports.round = exports.sqrt = exports.ceil = exports.floor = exports.random = exports.atan2 = exports.atan = exports.tan = exports.cos = exports.sin = exports.log = exports.RAD2DEG = exports.DEG2RAD = exports.GOLDENRATIO = exports.HALF_PI = exports.TAU = exports.PI2 = exports.PI = exports.Matrix4 = exports._v3 = exports._V3 = exports.v3 = exports.V3 = exports._v2 = exports._V2 = exports.v2 = exports.V2 = void 0;
exports.createNoise = exports.billowNoise2D = exports.curlNoise2D = exports.domainWarp2D = exports.Swiss = exports.Turbulence = exports.Ridged = exports.FBM = exports.Value2D = exports.Worley2D = exports.Simplex2D = exports.Perlin3D = exports.Perlin2D = exports.Simple1DNoise = exports.debounce = exports.sawTooth = exports.isEven = exports.createPseudoPoissonDistribution = exports.makeFibonacci = exports.swapVals = exports.last = exports.first = exports.average = exports.sum = exports.range = exports.shuffledCopy = exports.shuffleArray = exports.make2dSquareArray = exports.make2dArray = exports.randomWeightedFromArray = exports.pickRandomFromArray = exports.pickRandom = exports.weightedRandomLn = exports.rand_box_muller = exports.random2 = exports.resetRNDHASH = exports.RND = exports.rndInt = exports.rnd = exports.dist = exports.approxEqual = void 0;
// Weiterer Test
const v2_1 = require("./v2");
Object.defineProperty(exports, "V2", { enumerable: true, get: function () { return v2_1.V2; } });
Object.defineProperty(exports, "v2", { enumerable: true, get: function () { return v2_1.v2; } });
const _v2_1 = require("./_v2");
Object.defineProperty(exports, "_V2", { enumerable: true, get: function () { return _v2_1._V2; } });
Object.defineProperty(exports, "_v2", { enumerable: true, get: function () { return _v2_1._v2; } });
const v3_1 = require("./v3");
Object.defineProperty(exports, "V3", { enumerable: true, get: function () { return v3_1.V3; } });
Object.defineProperty(exports, "v3", { enumerable: true, get: function () { return v3_1.v3; } });
Object.defineProperty(exports, "Matrix4", { enumerable: true, get: function () { return v3_1.Matrix4; } });
const _v3_1 = require("./_v3");
Object.defineProperty(exports, "_V3", { enumerable: true, get: function () { return _v3_1._V3; } });
Object.defineProperty(exports, "_v3", { enumerable: true, get: function () { return _v3_1._v3; } });
var common_1 = require("./common");
// Constants
Object.defineProperty(exports, "PI", { enumerable: true, get: function () { return common_1.PI; } });
Object.defineProperty(exports, "PI2", { enumerable: true, get: function () { return common_1.PI2; } });
Object.defineProperty(exports, "TAU", { enumerable: true, get: function () { return common_1.TAU; } });
Object.defineProperty(exports, "HALF_PI", { enumerable: true, get: function () { return common_1.HALF_PI; } });
Object.defineProperty(exports, "GOLDENRATIO", { enumerable: true, get: function () { return common_1.GOLDENRATIO; } });
Object.defineProperty(exports, "DEG2RAD", { enumerable: true, get: function () { return common_1.DEG2RAD; } });
Object.defineProperty(exports, "RAD2DEG", { enumerable: true, get: function () { return common_1.RAD2DEG; } });
// Math functions from Math object
Object.defineProperty(exports, "log", { enumerable: true, get: function () { return common_1.log; } });
Object.defineProperty(exports, "sin", { enumerable: true, get: function () { return common_1.sin; } });
Object.defineProperty(exports, "cos", { enumerable: true, get: function () { return common_1.cos; } });
Object.defineProperty(exports, "tan", { enumerable: true, get: function () { return common_1.tan; } });
Object.defineProperty(exports, "atan", { enumerable: true, get: function () { return common_1.atan; } });
Object.defineProperty(exports, "atan2", { enumerable: true, get: function () { return common_1.atan2; } });
Object.defineProperty(exports, "random", { enumerable: true, get: function () { return common_1.random; } });
Object.defineProperty(exports, "floor", { enumerable: true, get: function () { return common_1.floor; } });
Object.defineProperty(exports, "ceil", { enumerable: true, get: function () { return common_1.ceil; } });
Object.defineProperty(exports, "sqrt", { enumerable: true, get: function () { return common_1.sqrt; } });
Object.defineProperty(exports, "round", { enumerable: true, get: function () { return common_1.round; } });
Object.defineProperty(exports, "exp", { enumerable: true, get: function () { return common_1.exp; } });
Object.defineProperty(exports, "pow", { enumerable: true, get: function () { return common_1.pow; } });
Object.defineProperty(exports, "abs", { enumerable: true, get: function () { return common_1.abs; } });
Object.defineProperty(exports, "sign", { enumerable: true, get: function () { return common_1.sign; } });
Object.defineProperty(exports, "min", { enumerable: true, get: function () { return common_1.min; } });
Object.defineProperty(exports, "max", { enumerable: true, get: function () { return common_1.max; } });
// Angle conversion
Object.defineProperty(exports, "degToRad", { enumerable: true, get: function () { return common_1.degToRad; } });
Object.defineProperty(exports, "radToDeg", { enumerable: true, get: function () { return common_1.radToDeg; } });
// Interpolation & mapping
Object.defineProperty(exports, "lerp", { enumerable: true, get: function () { return common_1.lerp; } });
Object.defineProperty(exports, "mix", { enumerable: true, get: function () { return common_1.mix; } });
Object.defineProperty(exports, "inverseLerp", { enumerable: true, get: function () { return common_1.inverseLerp; } });
Object.defineProperty(exports, "remap", { enumerable: true, get: function () { return common_1.remap; } });
Object.defineProperty(exports, "map", { enumerable: true, get: function () { return common_1.map; } });
Object.defineProperty(exports, "smoothstep", { enumerable: true, get: function () { return common_1.smoothstep; } });
Object.defineProperty(exports, "smootherstep", { enumerable: true, get: function () { return common_1.smootherstep; } });
Object.defineProperty(exports, "quinticinterpol", { enumerable: true, get: function () { return common_1.quinticinterpol; } });
// Clamping & wrapping
Object.defineProperty(exports, "clamp", { enumerable: true, get: function () { return common_1.clamp; } });
Object.defineProperty(exports, "saturate", { enumerable: true, get: function () { return common_1.saturate; } });
Object.defineProperty(exports, "fract", { enumerable: true, get: function () { return common_1.fract; } });
Object.defineProperty(exports, "modWrap", { enumerable: true, get: function () { return common_1.modWrap; } });
Object.defineProperty(exports, "step", { enumerable: true, get: function () { return common_1.step; } });
Object.defineProperty(exports, "pingPong", { enumerable: true, get: function () { return common_1.pingPong; } });
// Comparison
Object.defineProperty(exports, "approximately", { enumerable: true, get: function () { return common_1.approximately; } });
Object.defineProperty(exports, "approxEqual", { enumerable: true, get: function () { return common_1.approxEqual; } });
// Distance
Object.defineProperty(exports, "dist", { enumerable: true, get: function () { return common_1.dist; } });
// Random
Object.defineProperty(exports, "rnd", { enumerable: true, get: function () { return common_1.rnd; } });
Object.defineProperty(exports, "rndInt", { enumerable: true, get: function () { return common_1.rndInt; } });
Object.defineProperty(exports, "RND", { enumerable: true, get: function () { return common_1.RND; } });
Object.defineProperty(exports, "resetRNDHASH", { enumerable: true, get: function () { return common_1.resetRNDHASH; } });
Object.defineProperty(exports, "random2", { enumerable: true, get: function () { return common_1.random2; } });
Object.defineProperty(exports, "rand_box_muller", { enumerable: true, get: function () { return common_1.rand_box_muller; } });
Object.defineProperty(exports, "weightedRandomLn", { enumerable: true, get: function () { return common_1.weightedRandomLn; } });
Object.defineProperty(exports, "pickRandom", { enumerable: true, get: function () { return common_1.pickRandom; } });
Object.defineProperty(exports, "pickRandomFromArray", { enumerable: true, get: function () { return common_1.pickRandomFromArray; } });
Object.defineProperty(exports, "randomWeightedFromArray", { enumerable: true, get: function () { return common_1.randomWeightedFromArray; } });
// Arrays
Object.defineProperty(exports, "make2dArray", { enumerable: true, get: function () { return common_1.make2dArray; } });
Object.defineProperty(exports, "make2dSquareArray", { enumerable: true, get: function () { return common_1.make2dSquareArray; } });
Object.defineProperty(exports, "shuffleArray", { enumerable: true, get: function () { return common_1.shuffleArray; } });
Object.defineProperty(exports, "shuffledCopy", { enumerable: true, get: function () { return common_1.shuffledCopy; } });
Object.defineProperty(exports, "range", { enumerable: true, get: function () { return common_1.range; } });
Object.defineProperty(exports, "sum", { enumerable: true, get: function () { return common_1.sum; } });
Object.defineProperty(exports, "average", { enumerable: true, get: function () { return common_1.average; } });
Object.defineProperty(exports, "first", { enumerable: true, get: function () { return common_1.first; } });
Object.defineProperty(exports, "last", { enumerable: true, get: function () { return common_1.last; } });
Object.defineProperty(exports, "swapVals", { enumerable: true, get: function () { return common_1.swapVals; } });
// Sequences
Object.defineProperty(exports, "makeFibonacci", { enumerable: true, get: function () { return common_1.makeFibonacci; } });
// Distributions
Object.defineProperty(exports, "createPseudoPoissonDistribution", { enumerable: true, get: function () { return common_1.createPseudoPoissonDistribution; } });
// Utilities
Object.defineProperty(exports, "isEven", { enumerable: true, get: function () { return common_1.isEven; } });
Object.defineProperty(exports, "sawTooth", { enumerable: true, get: function () { return common_1.sawTooth; } });
Object.defineProperty(exports, "debounce", { enumerable: true, get: function () { return common_1.debounce; } });
var noise_1 = require("./noise");
Object.defineProperty(exports, "Simple1DNoise", { enumerable: true, get: function () { return noise_1.Simple1DNoise; } });
Object.defineProperty(exports, "Perlin2D", { enumerable: true, get: function () { return noise_1.Perlin2D; } });
Object.defineProperty(exports, "Perlin3D", { enumerable: true, get: function () { return noise_1.Perlin3D; } });
Object.defineProperty(exports, "Simplex2D", { enumerable: true, get: function () { return noise_1.Simplex2D; } });
Object.defineProperty(exports, "Worley2D", { enumerable: true, get: function () { return noise_1.Worley2D; } });
Object.defineProperty(exports, "Value2D", { enumerable: true, get: function () { return noise_1.Value2D; } });
Object.defineProperty(exports, "FBM", { enumerable: true, get: function () { return noise_1.FBM; } });
Object.defineProperty(exports, "Ridged", { enumerable: true, get: function () { return noise_1.Ridged; } });
Object.defineProperty(exports, "Turbulence", { enumerable: true, get: function () { return noise_1.Turbulence; } });
Object.defineProperty(exports, "Swiss", { enumerable: true, get: function () { return noise_1.Swiss; } });
Object.defineProperty(exports, "domainWarp2D", { enumerable: true, get: function () { return noise_1.domainWarp2D; } });
Object.defineProperty(exports, "curlNoise2D", { enumerable: true, get: function () { return noise_1.curlNoise2D; } });
Object.defineProperty(exports, "billowNoise2D", { enumerable: true, get: function () { return noise_1.billowNoise2D; } });
Object.defineProperty(exports, "createNoise", { enumerable: true, get: function () { return noise_1.createNoise; } });
//# sourceMappingURL=index.js.map