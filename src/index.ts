// Weiterer Test
import {V2,v2} from "./v2";
import {_V2,_v2} from "./_v2";
import {V3,v3, Matrix4} from "./v3";
import {_V3,_v3} from "./_v3";

export {V2, v2,_V2,_v2,
    V3, v3, _V3, _v3, Matrix4}
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
    isEven, sawTooth, debounce,

    // Types
    IPos
} from './common';

export {
    Simple1DNoise,
    Perlin2D,
    Perlin3D,
    Simplex2D,
    Worley2D,
    Value2D,
    FBM,
    Ridged,
    Turbulence,
    Swiss,
    domainWarp2D,
    curlNoise2D,
    billowNoise2D,
    createNoise
} from './noise';
