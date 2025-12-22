/**
 * @fileoverview Immutable 3D Vector class.
 * All operations return new instances, preserving the original vector.
 * This is useful for functional programming patterns and preventing side effects.
 */

import {
    vec3Add, vec3Sub, vec3Mult, vec3Div, vec3Dot, vec3Cross,
    vec3Mag, vec3SquareMag, vec3Normalize, vec3Abs, vec3Max, vec3Min,
    vec3Lerp, vec3Floor, vec3AngleXY, vec3Distance, vec3FromTo,
    vec3TransformCoordinates, vec3MultiplyWithMatrix, vec3AngleBetween,
    vec3SameLike, vec3Negate, vec3Project, vec3Reflect, IVec3
} from "./vec3core";
import { Matrix4 } from "./v3";

const _v3 = (x: number = 0, y: number = 0, z: number = 0) => {
    return new _V3(x, y, z);
}

class _V3 {
    public readonly x: number;
    public readonly y: number;
    public readonly z: number;

    /**
     * Creates a new immutable 3D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @param {number} z - The Z-coordinate.
     */
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // ============================================================================
    // STATIC METHODS
    // ============================================================================

    /**
     * Linearly interpolates between two vectors.
     * @param {_V3} v1 - First vector.
     * @param {_V3} v2 - Second vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {_V3} The interpolated vector.
     */
    public static lerp(v1: _V3, v2: _V3, amt: number): _V3 {
        const r = vec3Lerp(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, amt);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Clones a vector.
     * @param {_V3} v - The vector to clone.
     * @returns {_V3} A new instance with the same values.
     */
    public static clone(v: _V3): _V3 {
        return new _V3(v.x, v.y, v.z);
    }

    /**
     * Creates a zero vector (0, 0, 0).
     * @returns {_V3} A zero vector.
     */
    public static zero(): _V3 {
        return new _V3(0, 0, 0);
    }

    /**
     * Creates an up vector (0, 1, 0).
     * @returns {_V3} An up vector.
     */
    public static up(): _V3 {
        return new _V3(0, 1.0, 0);
    }

    /**
     * Creates a right vector (1, 0, 0).
     * @returns {_V3} A right vector.
     */
    public static right(): _V3 {
        return new _V3(1.0, 0, 0);
    }

    /**
     * Creates a forward vector (0, 0, 1).
     * @returns {_V3} A forward vector.
     */
    public static forward(): _V3 {
        return new _V3(0, 0, 1.0);
    }

    /**
     * Creates a new 3D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @param {number} z - The Z-coordinate.
     * @returns {_V3} A new _V3 instance.
     */
    public static create(x: number, y: number, z: number): _V3 {
        return new _V3(x, y, z);
    }

    /**
     * Adds two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {_V3} The resulting vector.
     */
    public static add(a: _V3, b: _V3): _V3 {
        const r = vec3Add(a.x, a.y, a.z, b.x, b.y, b.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Subtracts vector b from vector a.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {_V3} The resulting vector.
     */
    public static sub(a: _V3, b: _V3): _V3 {
        const r = vec3Sub(a.x, a.y, a.z, b.x, b.y, b.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Alias for `sub`.
     */
    public static subtract(a: _V3, b: _V3): _V3 {
        return _V3.sub(a, b);
    }

    /**
     * Multiplies a vector by a scalar.
     * @param {_V3} v - The vector to multiply.
     * @param {number} factor - The scalar value.
     * @returns {_V3} The scaled vector.
     */
    public static mult(v: _V3, factor: number): _V3 {
        const r = vec3Mult(v.x, v.y, v.z, factor);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Alias for `mult`.
     */
    public static multiply(v: _V3, factor: number): _V3 {
        return _V3.mult(v, factor);
    }

    /**
     * Divides a vector by a scalar.
     * @param {_V3} v - The vector to divide.
     * @param {number} n0 - The scalar divisor.
     * @returns {_V3} The resulting vector.
     */
    public static divide(v: _V3, n0: number): _V3 {
        const r = vec3Div(v.x, v.y, v.z, n0);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Computes the cross product of two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {_V3} The cross product vector.
     */
    public static cross(a: _V3, b: _V3): _V3 {
        const r = vec3Cross(a.x, a.y, a.z, b.x, b.y, b.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Computes the dot product of two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {number} The dot product.
     */
    public static dot(a: _V3, b: _V3): number {
        return vec3Dot(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    /**
     * Returns a vector with absolute values.
     * @param {_V3} v - The vector.
     * @returns {_V3} A new vector with absolute values.
     */
    public static abs(v: _V3): _V3 {
        const r = vec3Abs(v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Returns the component-wise maximum of two vectors.
     * @param {_V3} v1 - First vector.
     * @param {_V3} v2 - Second vector.
     * @returns {_V3} The component-wise maximum.
     */
    public static max(v1: _V3, v2: _V3): _V3 {
        const r = vec3Max(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Returns the component-wise minimum of two vectors.
     * @param {_V3} v1 - First vector.
     * @param {_V3} v2 - Second vector.
     * @returns {_V3} The component-wise minimum.
     */
    public static min(v1: _V3, v2: _V3): _V3 {
        const r = vec3Min(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Returns the negated vector.
     * @param {_V3} v - The vector to negate.
     * @returns {_V3} The negated vector.
     */
    public static negate(v: _V3): _V3 {
        const r = vec3Negate(v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Computes the magnitude (length) of a vector.
     * @param {_V3} v - The vector.
     * @returns {number} The magnitude of the vector.
     */
    public static magnitude(v: _V3): number {
        return vec3Mag(v.x, v.y, v.z);
    }

    /**
     * Computes the squared magnitude of a vector.
     * @param {_V3} v - The vector.
     * @returns {number} The squared magnitude.
     */
    public static squareMagnitude(v: _V3): number {
        return vec3SquareMag(v.x, v.y, v.z);
    }

    /**
     * Computes the distance between two vectors.
     * @param {_V3} v1 - First vector.
     * @param {_V3} v2 - Second vector.
     * @returns {number} The distance.
     */
    public static distance(v1: _V3, v2: _V3): number {
        return vec3Distance(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    }

    /**
     * Creates a vector from point A to point B.
     * @param {_V3} a - The starting point.
     * @param {_V3} b - The ending point.
     * @returns {_V3} The resulting vector.
     */
    public static fromTo(a: _V3, b: _V3): _V3 {
        const r = vec3FromTo(a.x, a.y, a.z, b.x, b.y, b.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Checks if two vectors are identical.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {boolean} True if identical.
     */
    public static sameLike(a: _V3, b: _V3): boolean {
        return vec3SameLike(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    /**
     * Computes the angle between two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {number} The angle in radians.
     */
    public static angleBetween(a: _V3, b: _V3): number {
        return vec3AngleBetween(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    /**
     * Normalizes a vector to unit length.
     * @param {_V3} v - The vector to normalize.
     * @returns {_V3} The unit vector.
     */
    public static unitVec(v: _V3): _V3 {
        const r = vec3Normalize(v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Projects vector v1 onto vector v2.
     * @param {_V3} v1 - The vector to project.
     * @param {_V3} v2 - The vector to project onto.
     * @returns {_V3} The projected vector.
     */
    public static project(v1: _V3, v2: _V3): _V3 {
        const r = vec3Project(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Reflects a vector across a normal.
     * @param {_V3} v - The vector to reflect.
     * @param {_V3} normal - The normal vector.
     * @returns {_V3} The reflected vector.
     */
    public static reflect(v: _V3, normal: _V3): _V3 {
        const r = vec3Reflect(v.x, v.y, v.z, normal.x, normal.y, normal.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Transforms a vector by a 4x4 matrix with perspective division.
     * @param {_V3} v - The vector to transform.
     * @param {Matrix4} mat - The transformation matrix.
     * @returns {_V3} The transformed vector.
     */
    public static transformCoordinates(v: _V3, mat: Matrix4): _V3 {
        const r = vec3TransformCoordinates(v.x, v.y, v.z, mat.m);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Multiplies a vector by a 4x4 matrix without perspective division.
     * @param {_V3} v - The vector to transform.
     * @param {Matrix4} mat - The transformation matrix.
     * @returns {_V3} The transformed vector.
     */
    public static multiplyWithMatrix(v: _V3, mat: Matrix4): _V3 {
        const r = vec3MultiplyWithMatrix(v.x, v.y, v.z, mat.m);
        return new _V3(r.x, r.y, r.z);
    }

    // ============================================================================
    // INSTANCE METHODS (all return new instances - immutable)
    // ============================================================================

    /**
     * Creates a new vector with the same values.
     * @returns {_V3} A new copy of this vector.
     */
    public clone(): _V3 {
        return new _V3(this.x, this.y, this.z);
    }

    /**
     * Adds another vector and returns a new vector.
     * @param {_V3} v - The vector to add.
     * @returns {_V3} A new vector with the result.
     */
    public add(v: _V3): _V3 {
        const r = vec3Add(this.x, this.y, this.z, v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Subtracts another vector and returns a new vector.
     * @param {_V3} v - The vector to subtract.
     * @returns {_V3} A new vector with the result.
     */
    public sub(v: _V3): _V3 {
        const r = vec3Sub(this.x, this.y, this.z, v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Alias for `sub`.
     */
    public subtract(v: _V3): _V3 {
        return this.sub(v);
    }

    /**
     * Multiplies this vector by a scalar and returns a new vector.
     * @param {number} scalar - The scalar to multiply.
     * @returns {_V3} A new vector with the result.
     */
    public mult(scalar: number): _V3 {
        const r = vec3Mult(this.x, this.y, this.z, scalar);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Alias for `mult`.
     */
    public multiply(scalar: number): _V3 {
        return this.mult(scalar);
    }

    /**
     * Divides this vector by a scalar and returns a new vector.
     * @param {number} scalar - The scalar to divide by.
     * @returns {_V3} A new vector with the result.
     */
    public divide(scalar: number): _V3 {
        const r = vec3Div(this.x, this.y, this.z, scalar);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Computes the dot product with another vector.
     * @param {_V3} v - The other vector.
     * @returns {number} The dot product.
     */
    public dot(v: _V3): number {
        return vec3Dot(this.x, this.y, this.z, v.x, v.y, v.z);
    }

    /**
     * Alias for `dot`.
     */
    public dotProd(v: _V3): number {
        return this.dot(v);
    }

    /**
     * Computes the cross product with another vector.
     * @param {_V3} v - The other vector.
     * @returns {_V3} A new vector representing the cross product.
     */
    public cross(v: _V3): _V3 {
        const r = vec3Cross(this.x, this.y, this.z, v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Alias for `cross`.
     */
    public crossProd(v: _V3): _V3 {
        return this.cross(v);
    }

    /**
     * Returns the normalized (unit) vector.
     * @returns {_V3} A new unit vector.
     */
    public normalize(): _V3 {
        const r = vec3Normalize(this.x, this.y, this.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Alias for `normalize`.
     */
    public unitVector(): _V3 {
        return this.normalize();
    }

    /**
     * Returns the negated vector.
     * @returns {_V3} A new negated vector.
     */
    public negate(): _V3 {
        const r = vec3Negate(this.x, this.y, this.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Returns a vector with absolute values.
     * @returns {_V3} A new vector with absolute values.
     */
    public abs(): _V3 {
        const r = vec3Abs(this.x, this.y, this.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Returns the component-wise maximum with another vector.
     * @param {_V3} v - The other vector.
     * @returns {_V3} A new vector with component-wise maximum.
     */
    public max(v: _V3): _V3 {
        const r = vec3Max(this.x, this.y, this.z, v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Returns the component-wise minimum with another vector.
     * @param {_V3} v - The other vector.
     * @returns {_V3} A new vector with component-wise minimum.
     */
    public min(v: _V3): _V3 {
        const r = vec3Min(this.x, this.y, this.z, v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Gets the magnitude (length) of the vector.
     * @returns {number} The magnitude of the vector.
     */
    public get magnitude(): number {
        return vec3Mag(this.x, this.y, this.z);
    }

    /**
     * Alias for `magnitude`.
     */
    public get length(): number {
        return this.magnitude;
    }

    /**
     * Gets the squared magnitude of the vector (faster than `magnitude`).
     * @returns {number} The squared magnitude.
     */
    public get squareMagnitude(): number {
        return vec3SquareMag(this.x, this.y, this.z);
    }

    /**
     * Alias for `squareMagnitude`.
     */
    public lengthSq(): number {
        return this.squareMagnitude;
    }

    /**
     * Computes the distance to another vector.
     * @param {_V3} v - The other vector.
     * @returns {number} The distance.
     */
    public distance(v: _V3): number {
        return vec3Distance(this.x, this.y, this.z, v.x, v.y, v.z);
    }

    /**
     * Checks if this vector is identical to another.
     * @param {_V3} v - The other vector.
     * @returns {boolean} True if identical.
     */
    public sameLike(v: _V3): boolean {
        return vec3SameLike(this.x, this.y, this.z, v.x, v.y, v.z);
    }

    /**
     * Linearly interpolates between this vector and another.
     * @param {_V3} v - The target vector.
     * @param {number} amt - The interpolation amount (0 to 1).
     * @returns {_V3} A new interpolated vector.
     */
    public lerp(v: _V3, amt: number): _V3 {
        const r = vec3Lerp(this.x, this.y, this.z, v.x, v.y, v.z, amt);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Floors the values of the vector components.
     * @returns {_V3} A new vector with floored values.
     */
    public floor(): _V3 {
        const r = vec3Floor(this.x, this.y, this.z);
        return new _V3(r.x, r.y, r.z);
    }

    /**
     * Returns the angle in the XY plane.
     * @returns {number} The angle in radians.
     */
    public angleXY(): number {
        return vec3AngleXY(this.x, this.y);
    }

    /**
     * Converts this vector to an array.
     * @returns {number[]} An array [x, y, z].
     */
    public toArray(): number[] {
        return [this.x, this.y, this.z];
    }
}

export { _v3, _V3 }

