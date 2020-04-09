declare class V2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static create(x: number, y: number): V2;
    clone(): V2;
    static createByMagnitudeAndAngle(mag: number, angle: number): V2;
    get angle(): number;
    static getAngle(v: V2): number;
    get degree(): number;
}
export default V2;
