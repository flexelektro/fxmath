interface INoiseOptions {
    octaves: number;
    lactunarity: number;
    gain: number;
    amplitude: number;
    frequency: number;
    seed: number;
}
export declare class Simple1DNoise {
    octaves: number;
    lactunarity: number;
    gain: number;
    amplitude: number;
    frequency: number;
    seed: number;
    constructor(options?: Partial<INoiseOptions>);
    noise(x: number): number;
}
export {};
