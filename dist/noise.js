"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNoise = exports.Swiss = exports.billowNoise2D = exports.curlNoise2D = exports.domainWarp2D = exports.Turbulence = exports.Ridged = exports.FBM = exports.Value2D = exports.Worley2D = exports.Simplex2D = exports.Perlin3D = exports.Perlin2D = exports.Simple1DNoise = void 0;
const common_1 = require("./common");
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
/** Hash function for 2D coordinates */
const hash2D = (x, y, seed) => {
    let h = seed + x * 374761393 + y * 668265263;
    h = (h ^ (h >> 13)) * 1274126177;
    return ((h ^ (h >> 16)) >>> 0) / 4294967296;
};
/** Hash function for 3D coordinates */
const hash3D = (x, y, z, seed) => {
    let h = seed + x * 374761393 + y * 668265263 + z * 1013904223;
    h = (h ^ (h >> 13)) * 1274126177;
    return ((h ^ (h >> 16)) >>> 0) / 4294967296;
};
/** Gradient vectors for 2D Perlin noise */
const grad2D = (hash, x, y) => {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
};
/** Gradient vectors for 3D Perlin noise */
const grad3D = (hash, x, y, z) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
};
/** Quintic interpolation (smoother than smoothstep) */
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
// ============================================================================
// SIMPLE 1D NOISE
// ============================================================================
/**
 * Simple 1D value noise with octaves (FBM).
 * Good for simple animations and procedural values.
 */
class Simple1DNoise {
    constructor(options) {
        this.octaves = 4;
        this.lacunarity = 2;
        this.gain = 0.5;
        this.amplitude = 1;
        this.frequency = 1;
        this.seed = 351263;
        if (options) {
            for (let key in options) {
                this[key] = options[key];
            }
        }
    }
    noise(x) {
        let y = 0;
        let amplitude = this.amplitude;
        let frequency = this.frequency;
        for (let j = 0; j < this.octaves; j++) {
            const xi = Math.floor(x * frequency);
            const t = (0, common_1.smoothstep)(0, 1, (0, common_1.fract)(x * frequency));
            y += amplitude * (0, common_1.mix)((0, common_1.random2)(xi, this.seed), (0, common_1.random2)(xi + 1, this.seed), t);
            frequency *= this.lacunarity;
            amplitude *= this.gain;
        }
        return y;
    }
}
exports.Simple1DNoise = Simple1DNoise;
// ============================================================================
// PERLIN NOISE 2D
// ============================================================================
/**
 * Classic Perlin noise in 2D.
 * Produces smooth, natural-looking gradients.
 * Great for terrain, clouds, textures.
 */
class Perlin2D {
    constructor(seed = 12345) {
        this.seed = seed;
        this.perm = new Uint8Array(512);
        this.reseed(seed);
    }
    reseed(seed) {
        this.seed = seed;
        // Generate permutation table
        for (let i = 0; i < 256; i++) {
            this.perm[i] = i;
        }
        // Shuffle using seed
        for (let i = 255; i > 0; i--) {
            const j = Math.floor(hash2D(i, seed, seed) * (i + 1));
            [this.perm[i], this.perm[j]] = [this.perm[j], this.perm[i]];
        }
        // Duplicate for overflow
        for (let i = 0; i < 256; i++) {
            this.perm[i + 256] = this.perm[i];
        }
    }
    /**
     * Get noise value at (x, y).
     * @returns Value in range [-1, 1]
     */
    noise(x, y) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        const u = fade(x);
        const v = fade(y);
        const A = this.perm[X] + Y;
        const B = this.perm[X + 1] + Y;
        return (0, common_1.lerp)((0, common_1.lerp)(grad2D(this.perm[A], x, y), grad2D(this.perm[B], x - 1, y), u), (0, common_1.lerp)(grad2D(this.perm[A + 1], x, y - 1), grad2D(this.perm[B + 1], x - 1, y - 1), u), v);
    }
    /**
     * Get noise value normalized to [0, 1].
     */
    noise01(x, y) {
        return (this.noise(x, y) + 1) * 0.5;
    }
}
exports.Perlin2D = Perlin2D;
// ============================================================================
// PERLIN NOISE 3D
// ============================================================================
/**
 * Classic Perlin noise in 3D.
 * Useful for volumetric effects, animated 2D textures.
 */
class Perlin3D {
    constructor(seed = 12345) {
        this.seed = seed;
        this.perm = new Uint8Array(512);
        this.reseed(seed);
    }
    reseed(seed) {
        this.seed = seed;
        for (let i = 0; i < 256; i++) {
            this.perm[i] = i;
        }
        for (let i = 255; i > 0; i--) {
            const j = Math.floor(hash3D(i, seed, seed, seed) * (i + 1));
            [this.perm[i], this.perm[j]] = [this.perm[j], this.perm[i]];
        }
        for (let i = 0; i < 256; i++) {
            this.perm[i + 256] = this.perm[i];
        }
    }
    /**
     * Get noise value at (x, y, z).
     * @returns Value in range [-1, 1]
     */
    noise(x, y, z) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        const u = fade(x);
        const v = fade(y);
        const w = fade(z);
        const A = this.perm[X] + Y;
        const AA = this.perm[A] + Z;
        const AB = this.perm[A + 1] + Z;
        const B = this.perm[X + 1] + Y;
        const BA = this.perm[B] + Z;
        const BB = this.perm[B + 1] + Z;
        return (0, common_1.lerp)((0, common_1.lerp)((0, common_1.lerp)(grad3D(this.perm[AA], x, y, z), grad3D(this.perm[BA], x - 1, y, z), u), (0, common_1.lerp)(grad3D(this.perm[AB], x, y - 1, z), grad3D(this.perm[BB], x - 1, y - 1, z), u), v), (0, common_1.lerp)((0, common_1.lerp)(grad3D(this.perm[AA + 1], x, y, z - 1), grad3D(this.perm[BA + 1], x - 1, y, z - 1), u), (0, common_1.lerp)(grad3D(this.perm[AB + 1], x, y - 1, z - 1), grad3D(this.perm[BB + 1], x - 1, y - 1, z - 1), u), v), w);
    }
    /**
     * Get noise value normalized to [0, 1].
     */
    noise01(x, y, z) {
        return (this.noise(x, y, z) + 1) * 0.5;
    }
}
exports.Perlin3D = Perlin3D;
// ============================================================================
// SIMPLEX NOISE 2D
// ============================================================================
/**
 * Simplex noise in 2D.
 * Faster than Perlin, fewer directional artifacts.
 * Excellent for organic shapes and flow fields.
 */
class Simplex2D {
    constructor(seed = 12345) {
        this.seed = seed;
        this.perm = new Uint8Array(512);
        this.reseed(seed);
    }
    reseed(seed) {
        this.seed = seed;
        for (let i = 0; i < 256; i++) {
            this.perm[i] = i;
        }
        for (let i = 255; i > 0; i--) {
            const j = Math.floor(hash2D(i, seed, seed) * (i + 1));
            [this.perm[i], this.perm[j]] = [this.perm[j], this.perm[i]];
        }
        for (let i = 0; i < 256; i++) {
            this.perm[i + 256] = this.perm[i];
        }
    }
    /**
     * Get noise value at (x, y).
     * @returns Value in range approximately [-1, 1]
     */
    noise(x, y) {
        const F2 = Simplex2D.F2;
        const G2 = Simplex2D.G2;
        // Skew input space to determine simplex cell
        const s = (x + y) * F2;
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const t = (i + j) * G2;
        const X0 = i - t;
        const Y0 = j - t;
        const x0 = x - X0;
        const y0 = y - Y0;
        // Determine which simplex we're in
        const i1 = x0 > y0 ? 1 : 0;
        const j1 = x0 > y0 ? 0 : 1;
        const x1 = x0 - i1 + G2;
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1 + 2 * G2;
        const y2 = y0 - 1 + 2 * G2;
        const ii = i & 255;
        const jj = j & 255;
        // Calculate contributions from the three corners
        let n0 = 0, n1 = 0, n2 = 0;
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            t0 *= t0;
            n0 = t0 * t0 * grad2D(this.perm[ii + this.perm[jj]], x0, y0);
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            t1 *= t1;
            n1 = t1 * t1 * grad2D(this.perm[ii + i1 + this.perm[jj + j1]], x1, y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            t2 *= t2;
            n2 = t2 * t2 * grad2D(this.perm[ii + 1 + this.perm[jj + 1]], x2, y2);
        }
        // Scale to [-1, 1]
        return 70 * (n0 + n1 + n2);
    }
    /**
     * Get noise value normalized to [0, 1].
     */
    noise01(x, y) {
        return (this.noise(x, y) + 1) * 0.5;
    }
}
exports.Simplex2D = Simplex2D;
// Skewing factors for 2D
Simplex2D.F2 = 0.5 * (Math.sqrt(3) - 1);
Simplex2D.G2 = (3 - Math.sqrt(3)) / 6;
// ============================================================================
// WORLEY (CELLULAR/VORONOI) NOISE
// ============================================================================
/**
 * Worley/Cellular noise in 2D.
 * Creates cell-like patterns, great for:
 * - Stone/cobblestone textures
 * - Biological cells
 * - Cracks and veins
 * - Water caustics
 */
class Worley2D {
    constructor(seed = 12345) {
        this.seed = seed;
    }
    /**
     * Get noise value at (x, y).
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param k - Which closest point (0 = closest, 1 = second closest, etc.)
     * @returns Distance to the k-th closest point
     */
    noise(x, y, k = 0) {
        const xi = Math.floor(x);
        const yi = Math.floor(y);
        const distances = [];
        // Check 3x3 grid of cells
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const cx = xi + dx;
                const cy = yi + dy;
                // Random point within cell
                const px = cx + hash2D(cx, cy, this.seed);
                const py = cy + hash2D(cx, cy, this.seed + 1);
                const dist = Math.sqrt(Math.pow((x - px), 2) + Math.pow((y - py), 2));
                distances.push(dist);
            }
        }
        distances.sort((a, b) => a - b);
        return distances[Math.min(k, distances.length - 1)];
    }
    /**
     * F1 - Distance to closest point. Creates rounded cells.
     */
    f1(x, y) {
        return this.noise(x, y, 0);
    }
    /**
     * F2 - Distance to second closest point.
     */
    f2(x, y) {
        return this.noise(x, y, 1);
    }
    /**
     * F2 - F1: Creates cell edges/boundaries.
     */
    edge(x, y) {
        return this.f2(x, y) - this.f1(x, y);
    }
    /**
     * Manhattan distance variant - creates more angular cells.
     */
    manhattan(x, y) {
        const xi = Math.floor(x);
        const yi = Math.floor(y);
        let minDist = Infinity;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const cx = xi + dx;
                const cy = yi + dy;
                const px = cx + hash2D(cx, cy, this.seed);
                const py = cy + hash2D(cx, cy, this.seed + 1);
                const dist = Math.abs(x - px) + Math.abs(y - py);
                minDist = Math.min(minDist, dist);
            }
        }
        return minDist;
    }
}
exports.Worley2D = Worley2D;
// ============================================================================
// VALUE NOISE 2D
// ============================================================================
/**
 * Simple value noise in 2D.
 * Faster than Perlin but with more visible grid artifacts.
 * Good for quick prototyping.
 */
class Value2D {
    constructor(seed = 12345) {
        this.seed = seed;
    }
    /**
     * Get noise value at (x, y).
     * @returns Value in range [0, 1]
     */
    noise(x, y) {
        const xi = Math.floor(x);
        const yi = Math.floor(y);
        const xf = x - xi;
        const yf = y - yi;
        // Smooth interpolation
        const u = fade(xf);
        const v = fade(yf);
        // Hash corners
        const n00 = hash2D(xi, yi, this.seed);
        const n10 = hash2D(xi + 1, yi, this.seed);
        const n01 = hash2D(xi, yi + 1, this.seed);
        const n11 = hash2D(xi + 1, yi + 1, this.seed);
        // Bilinear interpolation
        return (0, common_1.lerp)((0, common_1.lerp)(n00, n10, u), (0, common_1.lerp)(n01, n11, u), v);
    }
}
exports.Value2D = Value2D;
// ============================================================================
// FBM (FRACTAL BROWNIAN MOTION)
// ============================================================================
/**
 * Fractal Brownian Motion - layers multiple octaves of noise.
 * Can wrap any noise function.
 */
class FBM {
    constructor(options) {
        var _a, _b, _c;
        this.octaves = (_a = options === null || options === void 0 ? void 0 : options.octaves) !== null && _a !== void 0 ? _a : 6;
        this.lacunarity = (_b = options === null || options === void 0 ? void 0 : options.lacunarity) !== null && _b !== void 0 ? _b : 2.0;
        this.gain = (_c = options === null || options === void 0 ? void 0 : options.gain) !== null && _c !== void 0 ? _c : 0.5;
    }
    /**
     * Apply FBM to a 2D noise function.
     */
    get2D(noiseFn, x, y) {
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        let maxValue = 0;
        for (let i = 0; i < this.octaves; i++) {
            value += amplitude * noiseFn(x * frequency, y * frequency);
            maxValue += amplitude;
            amplitude *= this.gain;
            frequency *= this.lacunarity;
        }
        return value / maxValue;
    }
    /**
     * Apply FBM to a 3D noise function.
     */
    get3D(noiseFn, x, y, z) {
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        let maxValue = 0;
        for (let i = 0; i < this.octaves; i++) {
            value += amplitude * noiseFn(x * frequency, y * frequency, z * frequency);
            maxValue += amplitude;
            amplitude *= this.gain;
            frequency *= this.lacunarity;
        }
        return value / maxValue;
    }
}
exports.FBM = FBM;
// ============================================================================
// RIDGED NOISE
// ============================================================================
/**
 * Ridged multi-fractal noise.
 * Creates sharp ridges - perfect for mountains, lightning, veins.
 */
class Ridged {
    constructor(options) {
        var _a, _b, _c, _d;
        this.octaves = (_a = options === null || options === void 0 ? void 0 : options.octaves) !== null && _a !== void 0 ? _a : 6;
        this.lacunarity = (_b = options === null || options === void 0 ? void 0 : options.lacunarity) !== null && _b !== void 0 ? _b : 2.0;
        this.gain = (_c = options === null || options === void 0 ? void 0 : options.gain) !== null && _c !== void 0 ? _c : 0.5;
        this.offset = (_d = options === null || options === void 0 ? void 0 : options.offset) !== null && _d !== void 0 ? _d : 1.0;
    }
    /**
     * Apply ridged fractal to a 2D noise function.
     */
    get2D(noiseFn, x, y) {
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        let weight = 1;
        for (let i = 0; i < this.octaves; i++) {
            let signal = noiseFn(x * frequency, y * frequency);
            signal = this.offset - Math.abs(signal);
            signal *= signal;
            signal *= weight;
            weight = Math.min(Math.max(signal * this.gain, 0), 1);
            value += signal * amplitude;
            frequency *= this.lacunarity;
            amplitude *= this.gain;
        }
        return value;
    }
}
exports.Ridged = Ridged;
// ============================================================================
// TURBULENCE
// ============================================================================
/**
 * Turbulence - absolute value of noise layers.
 * Creates billowy, cloud-like patterns.
 */
class Turbulence {
    constructor(options) {
        var _a, _b, _c;
        this.octaves = (_a = options === null || options === void 0 ? void 0 : options.octaves) !== null && _a !== void 0 ? _a : 6;
        this.lacunarity = (_b = options === null || options === void 0 ? void 0 : options.lacunarity) !== null && _b !== void 0 ? _b : 2.0;
        this.gain = (_c = options === null || options === void 0 ? void 0 : options.gain) !== null && _c !== void 0 ? _c : 0.5;
    }
    /**
     * Apply turbulence to a 2D noise function.
     */
    get2D(noiseFn, x, y) {
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        let maxValue = 0;
        for (let i = 0; i < this.octaves; i++) {
            value += amplitude * Math.abs(noiseFn(x * frequency, y * frequency));
            maxValue += amplitude;
            amplitude *= this.gain;
            frequency *= this.lacunarity;
        }
        return value / maxValue;
    }
}
exports.Turbulence = Turbulence;
// ============================================================================
// DOMAIN WARPING
// ============================================================================
/**
 * Domain warping - uses noise to distort the input coordinates.
 * Creates organic, flowing patterns.
 */
const domainWarp2D = (noiseFn, x, y, amount = 4, iterations = 1) => {
    let qx = x, qy = y;
    for (let i = 0; i < iterations; i++) {
        const nx = noiseFn(qx, qy);
        const ny = noiseFn(qx + 5.2, qy + 1.3);
        qx = x + amount * nx;
        qy = y + amount * ny;
    }
    return noiseFn(qx, qy);
};
exports.domainWarp2D = domainWarp2D;
// ============================================================================
// CURL NOISE (for flow fields)
// ============================================================================
/**
 * Computes curl of 2D noise for divergence-free flow fields.
 * Perfect for fluid simulations, particle systems.
 * @returns [dx, dy] - velocity vector
 */
const curlNoise2D = (noiseFn, x, y, epsilon = 0.0001) => {
    // Partial derivatives
    const dndx = (noiseFn(x + epsilon, y) - noiseFn(x - epsilon, y)) / (2 * epsilon);
    const dndy = (noiseFn(x, y + epsilon) - noiseFn(x, y - epsilon)) / (2 * epsilon);
    // Curl in 2D: rotate gradient 90 degrees
    return [dndy, -dndx];
};
exports.curlNoise2D = curlNoise2D;
// ============================================================================
// BILLOW NOISE
// ============================================================================
/**
 * Billow noise - similar to turbulence but with different characteristics.
 * Creates puffy, cloud-like formations.
 */
const billowNoise2D = (noiseFn, x, y) => {
    return 2 * Math.abs(noiseFn(x, y)) - 1;
};
exports.billowNoise2D = billowNoise2D;
// ============================================================================
// SWISS NOISE (Warped Ridged Noise)
// ============================================================================
/**
 * Swiss noise - combines ridged noise with domain warping.
 * Creates natural terrain-like patterns with valleys.
 */
class Swiss {
    constructor(options) {
        var _a, _b, _c, _d;
        this.octaves = (_a = options === null || options === void 0 ? void 0 : options.octaves) !== null && _a !== void 0 ? _a : 6;
        this.lacunarity = (_b = options === null || options === void 0 ? void 0 : options.lacunarity) !== null && _b !== void 0 ? _b : 2.0;
        this.gain = (_c = options === null || options === void 0 ? void 0 : options.gain) !== null && _c !== void 0 ? _c : 0.5;
        this.warp = (_d = options === null || options === void 0 ? void 0 : options.warp) !== null && _d !== void 0 ? _d : 0.15;
    }
    get2D(noiseFn, x, y) {
        let sum = 0;
        let freq = 1;
        let amp = 1;
        let dsum = 0;
        for (let i = 0; i < this.octaves; i++) {
            const n = noiseFn(x * freq + dsum * this.warp, y * freq + dsum * this.warp);
            const n2 = 1 - Math.abs(n);
            dsum += amp * n;
            sum += amp * n2 * n2;
            freq *= this.lacunarity;
            amp *= this.gain * Math.max(n2, 0.5);
        }
        return sum;
    }
}
exports.Swiss = Swiss;
// ============================================================================
// CONVENIENCE FACTORY
// ============================================================================
/**
 * Factory to create pre-configured noise instances.
 */
exports.createNoise = {
    perlin2D: (seed) => new Perlin2D(seed),
    perlin3D: (seed) => new Perlin3D(seed),
    simplex2D: (seed) => new Simplex2D(seed),
    worley2D: (seed) => new Worley2D(seed),
    value2D: (seed) => new Value2D(seed),
    fbm: (options) => new FBM(options),
    ridged: (options) => new Ridged(options),
    turbulence: (options) => new Turbulence(options),
    swiss: (options) => new Swiss(options),
};
//# sourceMappingURL=noise.js.map