/**
 * @fileoverview Immutable 3D Vector class.
 * All operations return new instances, preserving the original vector.
 * This is useful for functional programming patterns and preventing side effects.
 */
import { Matrix4 } from "./v3";
declare const _v3: (x?: number, y?: number, z?: number) => _V3;
declare class _V3 {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    /**
     * Creates a new immutable 3D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @param {number} z - The Z-coordinate.
     */
    constructor(x: number, y: number, z: number);
    /**
     * Linearly interpolates between two vectors.
     * @param {_V3} v1 - First vector.
     * @param {_V3} v2 - Second vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {_V3} The interpolated vector.
     */
    static lerp(v1: _V3, v2: _V3, amt: number): _V3;
    /**
     * Clones a vector.
     * @param {_V3} v - The vector to clone.
     * @returns {_V3} A new instance with the same values.
     */
    static clone(v: _V3): _V3;
    /**
     * Creates a zero vector (0, 0, 0).
     * @returns {_V3} A zero vector.
     */
    static zero(): _V3;
    /**
     * Creates an up vector (0, 1, 0).
     * @returns {_V3} An up vector.
     */
    static up(): _V3;
    /**
     * Creates a right vector (1, 0, 0).
     * @returns {_V3} A right vector.
     */
    static right(): _V3;
    /**
     * Creates a forward vector (0, 0, 1).
     * @returns {_V3} A forward vector.
     */
    static forward(): _V3;
    /**
     * Creates a new 3D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @param {number} z - The Z-coordinate.
     * @returns {_V3} A new _V3 instance.
     */
    static create(x: number, y: number, z: number): _V3;
    /**
     * Adds two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {_V3} The resulting vector.
     */
    static add(a: _V3, b: _V3): _V3;
    /**
     * Subtracts vector b from vector a.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {_V3} The resulting vector.
     */
    static sub(a: _V3, b: _V3): _V3;
    /**
     * Alias for `sub`.
     */
    static subtract(a: _V3, b: _V3): _V3;
    /**
     * Multiplies a vector by a scalar.
     * @param {_V3} v - The vector to multiply.
     * @param {number} factor - The scalar value.
     * @returns {_V3} The scaled vector.
     */
    static mult(v: _V3, factor: number): _V3;
    /**
     * Alias for `mult`.
     */
    static multiply(v: _V3, factor: number): _V3;
    /**
     * Divides a vector by a scalar.
     * @param {_V3} v - The vector to divide.
     * @param {number} n0 - The scalar divisor.
     * @returns {_V3} The resulting vector.
     */
    static divide(v: _V3, n0: number): _V3;
    /**
     * Computes the cross product of two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {_V3} The cross product vector.
     */
    static cross(a: _V3, b: _V3): _V3;
    /**
     * Computes the dot product of two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {number} The dot product.
     */
    static dot(a: _V3, b: _V3): number;
    /**
     * Returns a vector with absolute values.
     * @param {_V3} v - The vector.
     * @returns {_V3} A new vector with absolute values.
     */
    static abs(v: _V3): _V3;
    /**
     * Returns the component-wise maximum of two vectors.
     * @param {_V3} v1 - First vector.
     * @param {_V3} v2 - Second vector.
     * @returns {_V3} The component-wise maximum.
     */
    static max(v1: _V3, v2: _V3): _V3;
    /**
     * Returns the component-wise minimum of two vectors.
     * @param {_V3} v1 - First vector.
     * @param {_V3} v2 - Second vector.
     * @returns {_V3} The component-wise minimum.
     */
    static min(v1: _V3, v2: _V3): _V3;
    /**
     * Returns the negated vector.
     * @param {_V3} v - The vector to negate.
     * @returns {_V3} The negated vector.
     */
    static negate(v: _V3): _V3;
    /**
     * Computes the magnitude (length) of a vector.
     * @param {_V3} v - The vector.
     * @returns {number} The magnitude of the vector.
     */
    static magnitude(v: _V3): number;
    /**
     * Computes the squared magnitude of a vector.
     * @param {_V3} v - The vector.
     * @returns {number} The squared magnitude.
     */
    static squareMagnitude(v: _V3): number;
    /**
     * Computes the distance between two vectors.
     * @param {_V3} v1 - First vector.
     * @param {_V3} v2 - Second vector.
     * @returns {number} The distance.
     */
    static distance(v1: _V3, v2: _V3): number;
    /**
     * Creates a vector from point A to point B.
     * @param {_V3} a - The starting point.
     * @param {_V3} b - The ending point.
     * @returns {_V3} The resulting vector.
     */
    static fromTo(a: _V3, b: _V3): _V3;
    /**
     * Checks if two vectors are identical.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {boolean} True if identical.
     */
    static sameLike(a: _V3, b: _V3): boolean;
    /**
     * Computes the angle between two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {number} The angle in radians.
     */
    static angleBetween(a: _V3, b: _V3): number;
    /**
     * Normalizes a vector to unit length.
     * @param {_V3} v - The vector to normalize.
     * @returns {_V3} The unit vector.
     */
    static unitVec(v: _V3): _V3;
    /**
     * Projects vector v1 onto vector v2.
     * @param {_V3} v1 - The vector to project.
     * @param {_V3} v2 - The vector to project onto.
     * @returns {_V3} The projected vector.
     */
    static project(v1: _V3, v2: _V3): _V3;
    /**
     * Reflects a vector across a normal.
     * @param {_V3} v - The vector to reflect.
     * @param {_V3} normal - The normal vector.
     * @returns {_V3} The reflected vector.
     */
    static reflect(v: _V3, normal: _V3): _V3;
    /**
     * Transforms a vector by a 4x4 matrix with perspective division.
     * @param {_V3} v - The vector to transform.
     * @param {Matrix4} mat - The transformation matrix.
     * @returns {_V3} The transformed vector.
     */
    static transformCoordinates(v: _V3, mat: Matrix4): _V3;
    /**
     * Multiplies a vector by a 4x4 matrix without perspective division.
     * @param {_V3} v - The vector to transform.
     * @param {Matrix4} mat - The transformation matrix.
     * @returns {_V3} The transformed vector.
     */
    static multiplyWithMatrix(v: _V3, mat: Matrix4): _V3;
    /**
     * Creates a new vector with the same values.
     * @returns {_V3} A new copy of this vector.
     */
    clone(): _V3;
    /**
     * Adds another vector and returns a new vector.
     * @param {_V3} v - The vector to add.
     * @returns {_V3} A new vector with the result.
     */
    add(v: _V3): _V3;
    /**
     * Subtracts another vector and returns a new vector.
     * @param {_V3} v - The vector to subtract.
     * @returns {_V3} A new vector with the result.
     */
    sub(v: _V3): _V3;
    /**
     * Alias for `sub`.
     */
    subtract(v: _V3): _V3;
    /**
     * Multiplies this vector by a scalar and returns a new vector.
     * @param {number} scalar - The scalar to multiply.
     * @returns {_V3} A new vector with the result.
     */
    mult(scalar: number): _V3;
    /**
     * Alias for `mult`.
     */
    multiply(scalar: number): _V3;
    /**
     * Divides this vector by a scalar and returns a new vector.
     * @param {number} scalar - The scalar to divide by.
     * @returns {_V3} A new vector with the result.
     */
    divide(scalar: number): _V3;
    /**
     * Computes the dot product with another vector.
     * @param {_V3} v - The other vector.
     * @returns {number} The dot product.
     */
    dot(v: _V3): number;
    /**
     * Alias for `dot`.
     */
    dotProd(v: _V3): number;
    /**
     * Computes the cross product with another vector.
     * @param {_V3} v - The other vector.
     * @returns {_V3} A new vector representing the cross product.
     */
    cross(v: _V3): _V3;
    /**
     * Alias for `cross`.
     */
    crossProd(v: _V3): _V3;
    /**
     * Returns the normalized (unit) vector.
     * @returns {_V3} A new unit vector.
     */
    normalize(): _V3;
    /**
     * Alias for `normalize`.
     */
    unitVector(): _V3;
    /**
     * Returns the negated vector.
     * @returns {_V3} A new negated vector.
     */
    negate(): _V3;
    /**
     * Returns a vector with absolute values.
     * @returns {_V3} A new vector with absolute values.
     */
    abs(): _V3;
    /**
     * Returns the component-wise maximum with another vector.
     * @param {_V3} v - The other vector.
     * @returns {_V3} A new vector with component-wise maximum.
     */
    max(v: _V3): _V3;
    /**
     * Returns the component-wise minimum with another vector.
     * @param {_V3} v - The other vector.
     * @returns {_V3} A new vector with component-wise minimum.
     */
    min(v: _V3): _V3;
    /**
     * Gets the magnitude (length) of the vector.
     * @returns {number} The magnitude of the vector.
     */
    get magnitude(): number;
    /**
     * Alias for `magnitude`.
     */
    get length(): number;
    /**
     * Gets the squared magnitude of the vector (faster than `magnitude`).
     * @returns {number} The squared magnitude.
     */
    get squareMagnitude(): number;
    /**
     * Alias for `squareMagnitude`.
     */
    lengthSq(): number;
    /**
     * Computes the distance to another vector.
     * @param {_V3} v - The other vector.
     * @returns {number} The distance.
     */
    distance(v: _V3): number;
    /**
     * Checks if this vector is identical to another.
     * @param {_V3} v - The other vector.
     * @returns {boolean} True if identical.
     */
    sameLike(v: _V3): boolean;
    /**
     * Linearly interpolates between this vector and another.
     * @param {_V3} v - The target vector.
     * @param {number} amt - The interpolation amount (0 to 1).
     * @returns {_V3} A new interpolated vector.
     */
    lerp(v: _V3, amt: number): _V3;
    /**
     * Floors the values of the vector components.
     * @returns {_V3} A new vector with floored values.
     */
    floor(): _V3;
    /**
     * Returns the angle in the XY plane.
     * @returns {number} The angle in radians.
     */
    angleXY(): number;
    /**
     * Converts this vector to an array.
     * @returns {number[]} An array [x, y, z].
     */
    toArray(): number[];
}
export { _v3, _V3 };
