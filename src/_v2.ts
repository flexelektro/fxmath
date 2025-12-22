import {
    vec2Add, vec2Sub, vec2Mult, vec2Div, vec2MultVec,
    vec2Dot, vec2Cross, vec2Mag, vec2SquareMag, vec2Angle,
    vec2AngleBetween, vec2SameLike, vec2ManhattanDist,
    vec2FromTo, vec2FromMagAngle, vec2Normalize,
    vec2Rotate, vec2RotateAroundPivot,
    vec2NormalLeft, vec2NormalRight, vec2Lerp, vec2Project, vec2Floor,
    vec2LinesIntersect, vec2IsPointInPolygon, IVec2
} from "./vec2core";


const _v2 = (x: number, y: number) => {
    return new _V2(x, y)
}

class _V2 {
    public readonly x: number;
    public readonly y: number;

    /**
     * Creates a new immutable 2D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // ============================================================================
    // STATIC METHODS
    // ============================================================================

    /**
     * Creates a vector from point A to point B.
     * @param {_V2} a - The starting point.
     * @param {_V2} b - The ending point.
     * @returns {_V2} The resulting vector.
     */
    public static fromTo(a: _V2, b: _V2): _V2 {
        const r = vec2FromTo(a.x, a.y, b.x, b.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Checks if two vectors are identical.
     * @param {_V2} a - First vector.
     * @param {_V2} b - Second vector.
     * @returns {boolean} `true` if the vectors are the same, otherwise `false`.
     */
    public static sameLike(a: _V2, b: _V2): boolean {
        return vec2SameLike(a.x, a.y, b.x, b.y);
    }

    /**
     * Computes the intersection of two line segments.
     * @param {_V2} pA - First segment start.
     * @param {_V2} pA2 - First segment end.
     * @param {_V2} pB - Second segment start.
     * @param {_V2} pB2 - Second segment end.
     * @returns {_V2 | false} The intersection point or `false` if no intersection exists.
     */
    public static linesIntersect(pA: _V2, pA2: _V2, pB: _V2, pB2: _V2): _V2 | false {
        const r = vec2LinesIntersect(pA.x, pA.y, pA2.x, pA2.y, pB.x, pB.y, pB2.x, pB2.y);
        return r ? new _V2(r.x, r.y) : false;
    }

    /**
     * Checks if a point is inside a polygon.
     * @param {_V2} p - The point to check.
     * @param {IVec2[]} polygon - An array of vectors defining the polygon.
     * @returns {boolean} `true` if the point is inside, otherwise `false`.
     */
    public static isPointInPolygon(p: _V2, polygon: IVec2[]): boolean {
        return vec2IsPointInPolygon(p.x, p.y, polygon);
    }

    /**
     * Creates a new 2D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @returns {_V2} A new _V2 instance.
     */
    public static create(x: number, y: number): _V2 {
        return new _V2(x, y);
    }

    /**
     * Creates a vector using a magnitude and an angle.
     * @param {number} mag - The magnitude (length) of the vector.
     * @param {number} angle - The angle in radians.
     * @returns {_V2} The resulting vector.
     */
    public static createByMagnitudeAndAngle(mag: number, angle: number): _V2 {
        const r = vec2FromMagAngle(mag, angle);
        return new _V2(r.x, r.y);
    }

    /**
     * Computes the angle of a vector in radians.
     * @param {_V2} v - The vector.
     * @returns {number} The angle in radians.
     */
    public static getAngle(v: _V2): number {
        return vec2Angle(v.x, v.y);
    }

    /**
     * Calculates the angle between two vectors.
     * @param {_V2} a - First vector.
     * @param {_V2} b - Second vector.
     * @returns {number} The angle in radians.
     */
    public static angleBetween(a: _V2, b: _V2): number {
        return vec2AngleBetween(a.x, a.y, b.x, b.y);
    }

    /**
     * Clones a vector.
     * @param {_V2} v - The vector to clone.
     * @returns {_V2} A new instance with the same values.
     */
    public static clone(v: _V2): _V2 {
        return new _V2(v.x, v.y);
    }

    /**
     * Computes the magnitude (length) of a vector.
     * @param {_V2} v - The vector.
     * @returns {number} The magnitude of the vector.
     */
    public static magnitude(v: _V2): number {
        return vec2Mag(v.x, v.y);
    }

    /**
     * Computes the squared magnitude of a vector (avoiding square root for performance).
     * @param {_V2} v - The vector.
     * @returns {number} The squared magnitude.
     */
    public static squareMagnitude(v: _V2): number {
        return vec2SquareMag(v.x, v.y);
    }

    /**
     * Computes the distance between two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The distance between `v1` and `v2`.
     */
    public static distance(v1: _V2, v2: _V2): number {
        const r = vec2Sub(v1.x, v1.y, v2.x, v2.y);
        return vec2Mag(r.x, r.y);
    }

    /**
     * Adds two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {_V2} The resulting vector.
     */
    public static add(v1: _V2, v2: _V2): _V2 {
        const r = vec2Add(v1.x, v1.y, v2.x, v2.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Subtracts one vector from another.
     * @param {_V2} v1 - The vector to subtract from.
     * @param {_V2} v2 - The vector to subtract.
     * @returns {_V2} The resulting vector.
     */
    public static subtract(v1: _V2, v2: _V2): _V2 {
        const r = vec2Sub(v1.x, v1.y, v2.x, v2.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Alias for `subtract`.
     * @param {_V2} v1 - The vector to subtract from.
     * @param {_V2} v2 - The vector to subtract.
     * @returns {_V2} The resulting vector.
     */
    public static sub(v1: _V2, v2: _V2): _V2 {
        return _V2.subtract(v1, v2);
    }

    /**
     * Multiplies a vector by a scalar.
     * @param {_V2} vector - The vector to multiply.
     * @param {number} scalar - The scalar value.
     * @returns {_V2} The scaled vector.
     */
    public static multiply(vector: _V2, scalar: number): _V2 {
        const r = vec2Mult(vector.x, vector.y, scalar);
        return new _V2(r.x, r.y);
    }

    /**
     * Multiplies two vectors component-wise.
     * @param {_V2} v0 - First vector.
     * @param {_V2} v1 - Second vector.
     * @returns {_V2} The resulting vector.
     */
    public static multVec(v0: _V2, v1: _V2): _V2 {
        const r = vec2MultVec(v0.x, v0.y, v1.x, v1.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Divides a vector by a scalar.
     * @param {_V2} v - The vector to divide.
     * @param {number} scalar - The scalar value.
     * @returns {_V2} The resulting vector.
     */
    public static divide(v: _V2, scalar: number): _V2 {
        const r = vec2Div(v.x, v.y, scalar);
        return new _V2(r.x, r.y);
    }

    /**
     * Computes the dot product of two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The dot product.
     */
    public static dotprod(v1: _V2, v2: _V2): number {
        return vec2Dot(v1.x, v1.y, v2.x, v2.y);
    }

    /**
     * Alias for `dotprod`.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The dot product.
     */
    public static dot(v1: _V2, v2: _V2): number {
        return _V2.dotprod(v1, v2);
    }

    /**
     * Computes the cross product of two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The cross product (a scalar value).
     */
    public static crossprod(v1: _V2, v2: _V2): number {
        return vec2Cross(v1.x, v1.y, v2.x, v2.y);
    }

    /**
     * Returns the unit vector (normalized) of a given vector.
     * @param {_V2} v - The vector to normalize.
     * @returns {_V2} The unit vector.
     */
    public static unitVec(v: _V2): _V2 {
        const r = vec2Normalize(v.x, v.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Projects vector `v1` onto vector `v2`.
     * @param {_V2} v1 - The vector to be projected.
     * @param {_V2} v2 - The vector onto which `v1` is projected.
     * @returns {_V2} The projected vector.
     */
    public static projectionFromTo(v1: _V2, v2: _V2): _V2 {
        const r = vec2Project(v1.x, v1.y, v2.x, v2.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Rotates a vector around the origin.
     * @param {_V2} v - The vector to rotate.
     * @param {number} angle - The rotation angle in radians.
     * @returns {_V2} The rotated vector.
     */
    public static rotate(v: _V2, angle: number): _V2 {
        const r = vec2Rotate(v.x, v.y, angle);
        return new _V2(r.x, r.y);
    }

    /**
     * Rotates a vector around a pivot point.
     * @param {_V2} point - The vector to rotate.
     * @param {_V2} pivot - The pivot point.
     * @param {number} angleRad - The rotation angle in radians.
     * @returns {_V2} The rotated vector.
     */
    public static rotateAroundPivot(point: _V2, pivot: _V2, angleRad: number): _V2 {
        const r = vec2RotateAroundPivot(point.x, point.y, pivot.x, pivot.y, angleRad);
        return new _V2(r.x, r.y);
    }

    /**
     * Computes the left normal of a vector.
     * @param {_V2} v - The vector.
     * @returns {_V2} The left normal vector.
     */
    public static normalLeft(v: _V2): _V2 {
        const r = vec2NormalLeft(v.x, v.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Computes the right normal of a vector.
     * @param {_V2} v - The vector.
     * @returns {_V2} The right normal vector.
     */
    public static normalRight(v: _V2): _V2 {
        const r = vec2NormalRight(v.x, v.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Computes the Manhattan distance between two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The Manhattan distance.
     */
    public static manhattanDistance(v1: _V2, v2: _V2): number {
        return vec2ManhattanDist(v1.x, v1.y, v2.x, v2.y);
    }

    /**
     * Linearly interpolates between two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {_V2} The interpolated vector.
     */
    public static lerp(v1: _V2, v2: _V2, amt: number): _V2 {
        const r = vec2Lerp(v1.x, v1.y, v2.x, v2.y, amt);
        return new _V2(r.x, r.y);
    }

    // ============================================================================
    // INSTANCE METHODS (all return new instances - immutable)
    // ============================================================================

    /**
     * Creates a new vector with the same values.
     * @returns {_V2} A new copy of this vector.
     */
    public clone(): _V2 {
        return new _V2(this.x, this.y);
    }

    /**
     * Adds another vector and returns a new vector.
     * @param {_V2} v - The vector to add.
     * @returns {_V2} A new vector with the result.
     */
    public add(v: _V2): _V2 {
        const r = vec2Add(this.x, this.y, v.x, v.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Subtracts another vector and returns a new vector.
     * @param {_V2} v - The vector to subtract.
     * @returns {_V2} A new vector with the result.
     */
    public subtract(v: _V2): _V2 {
        const r = vec2Sub(this.x, this.y, v.x, v.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar - The scalar to multiply.
     * @returns {_V2} A new vector with the result.
     */
    public multiply(scalar: number): _V2 {
        const r = vec2Mult(this.x, this.y, scalar);
        return new _V2(r.x, r.y);
    }

    /**
     * Divides this vector by a scalar.
     * @param {number} scalar - The scalar to divide by.
     * @returns {_V2} A new vector with the result.
     */
    public divide(scalar: number): _V2 {
        const r = vec2Div(this.x, this.y, scalar);
        return new _V2(r.x, r.y);
    }

    /**
     * Computes the dot product with another vector.
     * @param {_V2} v - The other vector.
     * @returns {number} The dot product.
     */
    public dot(v: _V2): number {
        return vec2Dot(this.x, this.y, v.x, v.y);
    }

    /**
     * Computes the cross product with another vector.
     * @param {_V2} v - The other vector.
     * @returns {number} The cross product.
     */
    public cross(v: _V2): number {
        return vec2Cross(this.x, this.y, v.x, v.y);
    }

    /**
     * Returns the normalized (unit) vector.
     * @returns {_V2} A new unit vector.
     */
    public normalize(): _V2 {
        const r = vec2Normalize(this.x, this.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Rotates this vector by a given angle in radians.
     * @param {number} angle - The angle in radians.
     * @returns {_V2} A new rotated vector.
     */
    public rotate(angle: number): _V2 {
        const r = vec2Rotate(this.x, this.y, angle);
        return new _V2(r.x, r.y);
    }

    /**
     * Computes the perpendicular left normal vector (90° counterclockwise).
     * @returns {_V2} A new vector rotated 90° counterclockwise.
     */
    public normalLeft(): _V2 {
        const r = vec2NormalLeft(this.x, this.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Computes the perpendicular right normal vector (90° clockwise).
     * @returns {_V2} A new vector rotated 90° clockwise.
     */
    public normalRight(): _V2 {
        const r = vec2NormalRight(this.x, this.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Gets the magnitude (length) of the vector.
     * @returns {number} The magnitude of the vector.
     */
    public get magnitude(): number {
        return vec2Mag(this.x, this.y);
    }

    /**
     * Gets the squared magnitude of the vector (faster than `magnitude()`).
     * @returns {number} The squared magnitude.
     */
    public get squareMagnitude(): number {
        return vec2SquareMag(this.x, this.y);
    }

    /**
     * Computes the distance to another vector.
     * @param {_V2} v - The other vector.
     * @returns {number} The distance.
     */
    public distance(v: _V2): number {
        const r = vec2Sub(this.x, this.y, v.x, v.y);
        return vec2Mag(r.x, r.y);
    }

    /**
     * Linearly interpolates between this vector and another.
     * @param {_V2} v - The target vector.
     * @param {number} amt - The interpolation amount (0 to 1).
     * @returns {_V2} The interpolated vector.
     */
    public lerp(v: _V2, amt: number): _V2 {
        const r = vec2Lerp(this.x, this.y, v.x, v.y, amt);
        return new _V2(r.x, r.y);
    }

    /**
     * Floors the values of the vector components.
     * @returns {_V2} A new vector with floored values.
     */
    public floor(): _V2 {
        const r = vec2Floor(this.x, this.y);
        return new _V2(r.x, r.y);
    }

    /**
     * Checks if this vector is inside a given polygon.
     * @param {_V2[]} polygon - The polygon as an array of vectors.
     * @returns {boolean} `true` if inside, otherwise `false`.
     */
    public isInPolygon(polygon: _V2[]): boolean {
        return vec2IsPointInPolygon(this.x, this.y, polygon);
    }
}

export { _v2, _V2 }

