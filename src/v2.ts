class V2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static create(x: number, y: number) {
        return new V2(x, y);
    }

    public static createByMagnitudeAndAngle(mag: number, angle: number): V2 {
        return new V2(mag * Math.cos(angle), mag * Math.sin(angle));
    }

    public static getAngle(v: V2): number {
        return Math.atan2(v.y, v.x);
    }

    public static clone(v: V2) {
        return new V2(v.x, v.y)
    }

    public static magnitude(v: V2): number {
        return v.magnitude;
    }

    public static squareMagnitude(v: V2): number {
        return v.squareMagnitude;
    }

    public static distance(v1: V2, v2: V2): number {
        return V2.subtract(v1, v2).magnitude
    }

    public static add(v1: V2, v2: V2): V2 {
        return new V2(v1.x + v2.x, v1.y + v2.y);
    }

    public static subtract(v1: V2, v2: V2): V2 {
        return new V2(v1.x - v2.x, v1.y - v2.y);
    }

    public static multiply(vector: V2, scalar: number): V2 {
        return new V2(
            vector.x * scalar,
            vector.y * scalar
        )
    }

    public static divide(v: V2, scalar: number): V2 {
        return V2.multiply(v, 1 / scalar);
    }

    public static dotprod(v1: V2, v2: V2): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    public static crossprod(v1: V2, v2: V2): number {
        return v1.x * v2.y - v1.y * v2.x;
    }

    public static projectionFromTo(v1: V2, v2: V2): V2 {
        let unitVector = V2.divide(v2,v2.magnitude);
        return V2.multiply(unitVector,V2.dotprod(v1,unitVector));
    }


    // NON STATIC METHODS ARE MUTABLE

    public clone(): V2 {
        return new V2(this.x, this.y);
    }

    public get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    public get degree(): number {
        return 360 / (2 * Math.PI) * Math.atan2(this.y, this.x);
    }

    public get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public get squareMagnitude(): number {
        return this.x * this.x + this.y * this.y;
    }

    public distance(v2: V2): number {
        return v2.subtract(this).magnitude
    }

    public unitVec(): V2 {
        return this.divide(this.magnitude);
    }

    public add(v: V2): this {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public subtract(v: V2): this {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    public multiply(scalar: number): this {

        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    public divide(scalar: number): this {
        return this.multiply(1 / scalar);
    }

    public dotprod(v: V2): number {
        return this.x * v.x + this.y * v.y;
    }

    public crossprod(v: V2): number {
        return this.x * v.y - this.y * v.x;
    }

}

export default V2
