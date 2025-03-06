declare const _v2: (x: number, y: number) => _V2;
declare class _V2 {
    readonly x: number;
    readonly y: number;
    /**
     * Creates a vector from point A to point B.
     * @param {V2} a - The starting point.
     * @param {V2} b - The ending point.
     * @returns {V2} The resulting vector.
     */
    static fromTo(a: _V2, b: _V2): _V2;
    /**
     * Checks if two vectors are identical.
     * @param {_V2} a - First vector.
     * @param {_V2} b - Second vector.
     * @returns {boolean} `true` if the vectors are the same, otherwise `false`.
     */
    static sameLike(a: _V2, b: _V2): boolean;
    /**
     * Computes the intersection of two line segments.
     * @param {_V2} pA - First segment start.
     * @param {_V2} pA2 - First segment end.
     * @param {_V2} pB - Second segment start.
     * @param {_V2} pB2 - Second segment end.
     * @returns {_V2 | false} The intersection point or `false` if no intersection exists.
     */
    static linesIntersect(pA: _V2, pA2: _V2, pB: _V2, pB2: _V2): _V2 | false;
    /**
     * Checks if a point is inside a polygon.
     * @param {_V2} p - The point to check.
     * @param {_V2[]} polygon - An array of vectors defining the polygon.
     * @returns {boolean} `true` if the point is inside, otherwise `false`.
     */
    static isPointInPolygon(p: _V2, polygon: {
        x: number;
        y: number;
    }[]): boolean;
    /**
     * Creates a new 2D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @returns {_V2} A new _V2 instance.
     */
    static create(x: number, y: number): _V2;
    /**
     * Creates a vector using a magnitude and an angle.
     * @param {number} mag - The magnitude (length) of the vector.
     * @param {number} angle - The angle in radians.
     * @returns {_V2} The resulting vector.
     */
    static createByMagnitudeAndAngle(mag: number, angle: number): _V2;
    /**
     * Computes the angle of a vector in radians.
     * @param {_V2} v - The vector.
     * @returns {number} The angle in radians.
     */
    static getAngle(v: _V2): number;
    /**
     * Calculates the angle between two vectors.
     * @param {_V2} a - First vector.
     * @param {_V2} b - Second vector.
     * @returns {number} The angle in radians.
     */
    static angleBetween(a: _V2, b: _V2): number;
    /**
     * Clones a vector.
     * @param {_V2} v - The vector to clone.
     * @returns {_V2} A new instance with the same values.
     */
    static clone(v: _V2): _V2;
    /**
     * Computes the magnitude (length) of a vector.
     * @param {_V2} v - The vector.
     * @returns {number} The magnitude of the vector.
     */
    static magnitude(v: _V2): number;
    /**
     * Computes the squared magnitude of a vector (avoiding square root for performance).
     * @param {_V2} v - The vector.
     * @returns {number} The squared magnitude.
     */
    static squareMagnitude(v: _V2): number;
    /**
     * Computes the distance between two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The distance between `v1` and `v2`.
     */
    static distance(v1: _V2, v2: _V2): number;
    /**
     * Adds two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {_V2} The resulting vector.
     */
    static add(v1: _V2, v2: _V2): _V2;
    /**
     * Subtracts one vector from another.
     * @param {_V2} v1 - The vector to subtract from.
     * @param {_V2} v2 - The vector to subtract.
     * @returns {_V2} The resulting vector.
     */
    static subtract(v1: _V2, v2: _V2): _V2;
    /**
     * Alias for `subtract`.
     * @param {_V2} v1 - The vector to subtract from.
     * @param {_V2} v2 - The vector to subtract.
     * @returns {_V2} The resulting vector.
     */
    static sub(v1: _V2, v2: _V2): _V2;
    /**
     * Multiplies a vector by a scalar.
     * @param {_V2} vector - The vector to multiply.
     * @param {number} scalar - The scalar value.
     * @returns {_V2} The scaled vector.
     */
    static multiply(vector: _V2, scalar: number): _V2;
    /**
     * Multiplies two vectors component-wise.
     * @param {_V2} v0 - First vector.
     * @param {_V2} v1 - Second vector.
     * @returns {_V2} The resulting vector.
     */
    static multVec(v0: _V2, v1: _V2): _V2;
    /**
     * Divides a vector by a scalar.
     * @param {_V2} v - The vector to divide.
     * @param {number} scalar - The scalar value.
     * @returns {_V2} The resulting vector.
     */
    static divide(v: _V2, scalar: number): _V2;
    /**
     * Computes the dot product of two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The dot product.
     */
    static dotprod(v1: _V2, v2: _V2): number;
    /**
     * Alias for `dotprod`.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The dot product.
     */
    static dot(v1: _V2, v2: _V2): number;
    /**
     * Computes the cross product of two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The cross product (a scalar value).
     */
    static crossprod(v1: _V2, v2: _V2): number;
    /**
     * Returns the unit vector (normalized) of a given vector.
     * @param {_V2} v - The vector to normalize.
     * @returns {_V2} The unit vector.
     */
    static unitVec(v: _V2): _V2;
    /**
     * Projects vector `v1` onto vector `v2`.
     * @param {_V2} v1 - The vector to be projected.
     * @param {_V2} v2 - The vector onto which `v1` is projected.
     * @returns {_V2} The projected vector.
     */
    static projectionFromTo(v1: _V2, v2: _V2): _V2;
    /**
     * Rotates a vector around the origin.
     * @param {_V2} v - The vector to rotate.
     * @param {number} angle - The rotation angle in radians.
     * @returns {_V2} The rotated vector.
     */
    static rotate(v: _V2, angle: number): _V2;
    /**
     * Rotates a vector around a pivot point.
     * @param {_V2} point - The vector to rotate.
     * @param {_V2} pivot - The pivot point.
     * @param {number} angleRad - The rotation angle in radians.
     * @returns {_V2} The rotated vector.
     */
    static rotateAroundPivot(point: _V2, pivot: _V2, angleRad: number): _V2;
    /**
     * Computes the left normal of a vector.
     * @param {_V2} v - The vector.
     * @returns {_V2} The left normal vector.
     */
    static normalLeft(v: _V2): _V2;
    /**
     * Computes the right normal of a vector.
     * @param {_V2} v - The vector.
     * @returns {_V2} The right normal vector.
     */
    static normalRight(v: _V2): _V2;
    /**
     * Computes the Manhattan distance between two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The Manhattan distance.
     */
    static manhattanDistance(v1: _V2, v2: _V2): number;
    /**
     * Linearly interpolates between two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {_V2} The interpolated vector.
     */
    static lerp(v1: _V2, v2: _V2, amt: number): _V2;
    /**
     * Creates a new immutable 2D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     */
    constructor(x: number, y: number);
    /**
     * Creates a new vector with the same values.
     * @returns {_V2} A new copy of this vector.
     */
    clone(): _V2;
    /**
     * Adds another vector and returns a new vector.
     * @param {_V2} v - The vector to add.
     * @returns {_V2} A new vector with the result.
     */
    add(v: _V2): _V2;
    /**
     * Subtracts another vector and returns a new vector.
     * @param {_V2} v - The vector to subtract.
     * @returns {_V2} A new vector with the result.
     */
    subtract(v: _V2): _V2;
    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar - The scalar to multiply.
     * @returns {_V2} A new vector with the result.
     */
    multiply(scalar: number): _V2;
    /**
     * Divides this vector by a scalar.
     * @param {number} scalar - The scalar to divide by.
     * @returns {_V2} A new vector with the result.
     */
    divide(scalar: number): _V2;
    /**
     * Computes the dot product with another vector.
     * @param {_V2} v - The other vector.
     * @returns {number} The dot product.
     */
    dot(v: _V2): number;
    /**
     * Computes the cross product with another vector.
     * @param {_V2} v - The other vector.
     * @returns {number} The cross product.
     */
    cross(v: _V2): number;
    /**
     * Returns the normalized (unit) vector.
     * @returns {_V2} A new unit vector.
     */
    normalize(): _V2;
    /**
     * Rotates this vector by a given angle in radians.
     * @param {number} angle - The angle in radians.
     * @returns {_V2} A new rotated vector.
     */
    rotate(angle: number): _V2;
    /**
     * Computes the perpendicular left normal vector (90° counterclockwise).
     * @returns {_V2} A new vector rotated 90° counterclockwise.
     */
    normalLeft(): _V2;
    /**
     * Computes the perpendicular right normal vector (90° clockwise).
     * @returns {_V2} A new vector rotated 90° clockwise.
     */
    normalRight(): _V2;
    /**
     * Gets the magnitude (length) of the vector.
     * @returns {number} The magnitude of the vector.
     */
    get magnitude(): number;
    /**
     * Gets the squared magnitude of the vector (faster than `magnitude()`).
     * @returns {number} The squared magnitude.
     */
    get squareMagnitude(): number;
    /**
     * Computes the distance to another vector.
     * @param {_V2} v - The other vector.
     * @returns {number} The distance.
     */
    distance(v: _V2): number;
    /**
     * Linearly interpolates between this vector and another.
     * @param {_V2} v - The target vector.
     * @param {number} amt - The interpolation amount (0 to 1).
     * @returns {_V2} The interpolated vector.
     */
    lerp(v: _V2, amt: number): _V2;
    /**
     * Floors the values of the vector components.
     * @returns {_V2} A new vector with floored values.
     */
    floor(): _V2;
    /**
     * Checks if this vector is inside a given polygon.
     * @param {_V2[]} polygon - The polygon as an array of vectors.
     * @returns {boolean} `true` if inside, otherwise `false`.
     */
    isInPolygon(polygon: _V2[]): boolean;
}
export { _v2, _V2 };
