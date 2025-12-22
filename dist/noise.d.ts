interface INoiseOptions {
    octaves: number;
    lacunarity: number;
    gain: number;
    amplitude: number;
    frequency: number;
    seed: number;
}
interface IFBMOptions {
    octaves: number;
    lacunarity: number;
    gain: number;
}
/**
 * Simple 1D value noise with octaves (FBM).
 * Good for simple animations and procedural values.
 */
export declare class Simple1DNoise {
    octaves: number;
    lacunarity: number;
    gain: number;
    amplitude: number;
    frequency: number;
    seed: number;
    constructor(options?: Partial<INoiseOptions>);
    noise(x: number): number;
}
/**
 * Classic Perlin noise in 2D.
 * Produces smooth, natural-looking gradients.
 * Great for terrain, clouds, textures.
 */
export declare class Perlin2D {
    private perm;
    seed: number;
    constructor(seed?: number);
    reseed(seed: number): void;
    /**
     * Get noise value at (x, y).
     * @returns Value in range [-1, 1]
     */
    noise(x: number, y: number): number;
    /**
     * Get noise value normalized to [0, 1].
     */
    noise01(x: number, y: number): number;
}
/**
 * Classic Perlin noise in 3D.
 * Useful for volumetric effects, animated 2D textures.
 */
export declare class Perlin3D {
    private perm;
    seed: number;
    constructor(seed?: number);
    reseed(seed: number): void;
    /**
     * Get noise value at (x, y, z).
     * @returns Value in range [-1, 1]
     */
    noise(x: number, y: number, z: number): number;
    /**
     * Get noise value normalized to [0, 1].
     */
    noise01(x: number, y: number, z: number): number;
}
/**
 * Simplex noise in 2D.
 * Faster than Perlin, fewer directional artifacts.
 * Excellent for organic shapes and flow fields.
 */
export declare class Simplex2D {
    private perm;
    seed: number;
    private static F2;
    private static G2;
    constructor(seed?: number);
    reseed(seed: number): void;
    /**
     * Get noise value at (x, y).
     * @returns Value in range approximately [-1, 1]
     */
    noise(x: number, y: number): number;
    /**
     * Get noise value normalized to [0, 1].
     */
    noise01(x: number, y: number): number;
}
/**
 * Worley/Cellular noise in 2D.
 * Creates cell-like patterns, great for:
 * - Stone/cobblestone textures
 * - Biological cells
 * - Cracks and veins
 * - Water caustics
 */
export declare class Worley2D {
    seed: number;
    constructor(seed?: number);
    /**
     * Get noise value at (x, y).
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param k - Which closest point (0 = closest, 1 = second closest, etc.)
     * @returns Distance to the k-th closest point
     */
    noise(x: number, y: number, k?: number): number;
    /**
     * F1 - Distance to closest point. Creates rounded cells.
     */
    f1(x: number, y: number): number;
    /**
     * F2 - Distance to second closest point.
     */
    f2(x: number, y: number): number;
    /**
     * F2 - F1: Creates cell edges/boundaries.
     */
    edge(x: number, y: number): number;
    /**
     * Manhattan distance variant - creates more angular cells.
     */
    manhattan(x: number, y: number): number;
}
/**
 * Simple value noise in 2D.
 * Faster than Perlin but with more visible grid artifacts.
 * Good for quick prototyping.
 */
export declare class Value2D {
    seed: number;
    constructor(seed?: number);
    /**
     * Get noise value at (x, y).
     * @returns Value in range [0, 1]
     */
    noise(x: number, y: number): number;
}
/**
 * Fractal Brownian Motion - layers multiple octaves of noise.
 * Can wrap any noise function.
 */
export declare class FBM {
    octaves: number;
    lacunarity: number;
    gain: number;
    constructor(options?: Partial<IFBMOptions>);
    /**
     * Apply FBM to a 2D noise function.
     */
    get2D(noiseFn: (x: number, y: number) => number, x: number, y: number): number;
    /**
     * Apply FBM to a 3D noise function.
     */
    get3D(noiseFn: (x: number, y: number, z: number) => number, x: number, y: number, z: number): number;
}
/**
 * Ridged multi-fractal noise.
 * Creates sharp ridges - perfect for mountains, lightning, veins.
 */
export declare class Ridged {
    octaves: number;
    lacunarity: number;
    gain: number;
    offset: number;
    constructor(options?: Partial<IFBMOptions & {
        offset: number;
    }>);
    /**
     * Apply ridged fractal to a 2D noise function.
     */
    get2D(noiseFn: (x: number, y: number) => number, x: number, y: number): number;
}
/**
 * Turbulence - absolute value of noise layers.
 * Creates billowy, cloud-like patterns.
 */
export declare class Turbulence {
    octaves: number;
    lacunarity: number;
    gain: number;
    constructor(options?: Partial<IFBMOptions>);
    /**
     * Apply turbulence to a 2D noise function.
     */
    get2D(noiseFn: (x: number, y: number) => number, x: number, y: number): number;
}
/**
 * Domain warping - uses noise to distort the input coordinates.
 * Creates organic, flowing patterns.
 */
export declare const domainWarp2D: (noiseFn: (x: number, y: number) => number, x: number, y: number, amount?: number, iterations?: number) => number;
/**
 * Computes curl of 2D noise for divergence-free flow fields.
 * Perfect for fluid simulations, particle systems.
 * @returns [dx, dy] - velocity vector
 */
export declare const curlNoise2D: (noiseFn: (x: number, y: number) => number, x: number, y: number, epsilon?: number) => [number, number];
/**
 * Billow noise - similar to turbulence but with different characteristics.
 * Creates puffy, cloud-like formations.
 */
export declare const billowNoise2D: (noiseFn: (x: number, y: number) => number, x: number, y: number) => number;
/**
 * Swiss noise - combines ridged noise with domain warping.
 * Creates natural terrain-like patterns with valleys.
 */
export declare class Swiss {
    octaves: number;
    lacunarity: number;
    gain: number;
    warp: number;
    constructor(options?: Partial<IFBMOptions & {
        warp: number;
    }>);
    get2D(noiseFn: (x: number, y: number) => number, x: number, y: number): number;
}
/**
 * Factory to create pre-configured noise instances.
 */
export declare const createNoise: {
    perlin2D: (seed?: number) => Perlin2D;
    perlin3D: (seed?: number) => Perlin3D;
    simplex2D: (seed?: number) => Simplex2D;
    worley2D: (seed?: number) => Worley2D;
    value2D: (seed?: number) => Value2D;
    fbm: (options?: Partial<IFBMOptions>) => FBM;
    ridged: (options?: Partial<IFBMOptions>) => Ridged;
    turbulence: (options?: Partial<IFBMOptions>) => Turbulence;
    swiss: (options?: Partial<IFBMOptions & {
        warp: number;
    }>) => Swiss;
};
export {};
