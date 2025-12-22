"use strict";
/**
 * @fileoverview Immutable 3D Vector class.
 * All operations return new instances, preserving the original vector.
 * This is useful for functional programming patterns and preventing side effects.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._V3 = exports._v3 = void 0;
const vec3core_1 = require("./vec3core");
const _v3 = (x = 0, y = 0, z = 0) => {
    return new _V3(x, y, z);
};
exports._v3 = _v3;
class _V3 {
    /**
     * Creates a new immutable 3D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @param {number} z - The Z-coordinate.
     */
    constructor(x, y, z) {
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
    static lerp(v1, v2, amt) {
        const r = (0, vec3core_1.vec3Lerp)(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, amt);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Clones a vector.
     * @param {_V3} v - The vector to clone.
     * @returns {_V3} A new instance with the same values.
     */
    static clone(v) {
        return new _V3(v.x, v.y, v.z);
    }
    /**
     * Creates a zero vector (0, 0, 0).
     * @returns {_V3} A zero vector.
     */
    static zero() {
        return new _V3(0, 0, 0);
    }
    /**
     * Creates an up vector (0, 1, 0).
     * @returns {_V3} An up vector.
     */
    static up() {
        return new _V3(0, 1.0, 0);
    }
    /**
     * Creates a right vector (1, 0, 0).
     * @returns {_V3} A right vector.
     */
    static right() {
        return new _V3(1.0, 0, 0);
    }
    /**
     * Creates a forward vector (0, 0, 1).
     * @returns {_V3} A forward vector.
     */
    static forward() {
        return new _V3(0, 0, 1.0);
    }
    /**
     * Creates a new 3D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @param {number} z - The Z-coordinate.
     * @returns {_V3} A new _V3 instance.
     */
    static create(x, y, z) {
        return new _V3(x, y, z);
    }
    /**
     * Adds two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {_V3} The resulting vector.
     */
    static add(a, b) {
        const r = (0, vec3core_1.vec3Add)(a.x, a.y, a.z, b.x, b.y, b.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Subtracts vector b from vector a.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {_V3} The resulting vector.
     */
    static sub(a, b) {
        const r = (0, vec3core_1.vec3Sub)(a.x, a.y, a.z, b.x, b.y, b.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Alias for `sub`.
     */
    static subtract(a, b) {
        return _V3.sub(a, b);
    }
    /**
     * Multiplies a vector by a scalar.
     * @param {_V3} v - The vector to multiply.
     * @param {number} factor - The scalar value.
     * @returns {_V3} The scaled vector.
     */
    static mult(v, factor) {
        const r = (0, vec3core_1.vec3Mult)(v.x, v.y, v.z, factor);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Alias for `mult`.
     */
    static multiply(v, factor) {
        return _V3.mult(v, factor);
    }
    /**
     * Divides a vector by a scalar.
     * @param {_V3} v - The vector to divide.
     * @param {number} n0 - The scalar divisor.
     * @returns {_V3} The resulting vector.
     */
    static divide(v, n0) {
        const r = (0, vec3core_1.vec3Div)(v.x, v.y, v.z, n0);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Computes the cross product of two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {_V3} The cross product vector.
     */
    static cross(a, b) {
        const r = (0, vec3core_1.vec3Cross)(a.x, a.y, a.z, b.x, b.y, b.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Computes the dot product of two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {number} The dot product.
     */
    static dot(a, b) {
        return (0, vec3core_1.vec3Dot)(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    /**
     * Returns a vector with absolute values.
     * @param {_V3} v - The vector.
     * @returns {_V3} A new vector with absolute values.
     */
    static abs(v) {
        const r = (0, vec3core_1.vec3Abs)(v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Returns the component-wise maximum of two vectors.
     * @param {_V3} v1 - First vector.
     * @param {_V3} v2 - Second vector.
     * @returns {_V3} The component-wise maximum.
     */
    static max(v1, v2) {
        const r = (0, vec3core_1.vec3Max)(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Returns the component-wise minimum of two vectors.
     * @param {_V3} v1 - First vector.
     * @param {_V3} v2 - Second vector.
     * @returns {_V3} The component-wise minimum.
     */
    static min(v1, v2) {
        const r = (0, vec3core_1.vec3Min)(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Returns the negated vector.
     * @param {_V3} v - The vector to negate.
     * @returns {_V3} The negated vector.
     */
    static negate(v) {
        const r = (0, vec3core_1.vec3Negate)(v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Computes the magnitude (length) of a vector.
     * @param {_V3} v - The vector.
     * @returns {number} The magnitude of the vector.
     */
    static magnitude(v) {
        return (0, vec3core_1.vec3Mag)(v.x, v.y, v.z);
    }
    /**
     * Computes the squared magnitude of a vector.
     * @param {_V3} v - The vector.
     * @returns {number} The squared magnitude.
     */
    static squareMagnitude(v) {
        return (0, vec3core_1.vec3SquareMag)(v.x, v.y, v.z);
    }
    /**
     * Computes the distance between two vectors.
     * @param {_V3} v1 - First vector.
     * @param {_V3} v2 - Second vector.
     * @returns {number} The distance.
     */
    static distance(v1, v2) {
        return (0, vec3core_1.vec3Distance)(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    }
    /**
     * Creates a vector from point A to point B.
     * @param {_V3} a - The starting point.
     * @param {_V3} b - The ending point.
     * @returns {_V3} The resulting vector.
     */
    static fromTo(a, b) {
        const r = (0, vec3core_1.vec3FromTo)(a.x, a.y, a.z, b.x, b.y, b.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Checks if two vectors are identical.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {boolean} True if identical.
     */
    static sameLike(a, b) {
        return (0, vec3core_1.vec3SameLike)(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    /**
     * Computes the angle between two vectors.
     * @param {_V3} a - First vector.
     * @param {_V3} b - Second vector.
     * @returns {number} The angle in radians.
     */
    static angleBetween(a, b) {
        return (0, vec3core_1.vec3AngleBetween)(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    /**
     * Normalizes a vector to unit length.
     * @param {_V3} v - The vector to normalize.
     * @returns {_V3} The unit vector.
     */
    static unitVec(v) {
        const r = (0, vec3core_1.vec3Normalize)(v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Projects vector v1 onto vector v2.
     * @param {_V3} v1 - The vector to project.
     * @param {_V3} v2 - The vector to project onto.
     * @returns {_V3} The projected vector.
     */
    static project(v1, v2) {
        const r = (0, vec3core_1.vec3Project)(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Reflects a vector across a normal.
     * @param {_V3} v - The vector to reflect.
     * @param {_V3} normal - The normal vector.
     * @returns {_V3} The reflected vector.
     */
    static reflect(v, normal) {
        const r = (0, vec3core_1.vec3Reflect)(v.x, v.y, v.z, normal.x, normal.y, normal.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Transforms a vector by a 4x4 matrix with perspective division.
     * @param {_V3} v - The vector to transform.
     * @param {Matrix4} mat - The transformation matrix.
     * @returns {_V3} The transformed vector.
     */
    static transformCoordinates(v, mat) {
        const r = (0, vec3core_1.vec3TransformCoordinates)(v.x, v.y, v.z, mat.m);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Multiplies a vector by a 4x4 matrix without perspective division.
     * @param {_V3} v - The vector to transform.
     * @param {Matrix4} mat - The transformation matrix.
     * @returns {_V3} The transformed vector.
     */
    static multiplyWithMatrix(v, mat) {
        const r = (0, vec3core_1.vec3MultiplyWithMatrix)(v.x, v.y, v.z, mat.m);
        return new _V3(r.x, r.y, r.z);
    }
    // ============================================================================
    // INSTANCE METHODS (all return new instances - immutable)
    // ============================================================================
    /**
     * Creates a new vector with the same values.
     * @returns {_V3} A new copy of this vector.
     */
    clone() {
        return new _V3(this.x, this.y, this.z);
    }
    /**
     * Adds another vector and returns a new vector.
     * @param {_V3} v - The vector to add.
     * @returns {_V3} A new vector with the result.
     */
    add(v) {
        const r = (0, vec3core_1.vec3Add)(this.x, this.y, this.z, v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Subtracts another vector and returns a new vector.
     * @param {_V3} v - The vector to subtract.
     * @returns {_V3} A new vector with the result.
     */
    sub(v) {
        const r = (0, vec3core_1.vec3Sub)(this.x, this.y, this.z, v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Alias for `sub`.
     */
    subtract(v) {
        return this.sub(v);
    }
    /**
     * Multiplies this vector by a scalar and returns a new vector.
     * @param {number} scalar - The scalar to multiply.
     * @returns {_V3} A new vector with the result.
     */
    mult(scalar) {
        const r = (0, vec3core_1.vec3Mult)(this.x, this.y, this.z, scalar);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Alias for `mult`.
     */
    multiply(scalar) {
        return this.mult(scalar);
    }
    /**
     * Divides this vector by a scalar and returns a new vector.
     * @param {number} scalar - The scalar to divide by.
     * @returns {_V3} A new vector with the result.
     */
    divide(scalar) {
        const r = (0, vec3core_1.vec3Div)(this.x, this.y, this.z, scalar);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Computes the dot product with another vector.
     * @param {_V3} v - The other vector.
     * @returns {number} The dot product.
     */
    dot(v) {
        return (0, vec3core_1.vec3Dot)(this.x, this.y, this.z, v.x, v.y, v.z);
    }
    /**
     * Alias for `dot`.
     */
    dotProd(v) {
        return this.dot(v);
    }
    /**
     * Computes the cross product with another vector.
     * @param {_V3} v - The other vector.
     * @returns {_V3} A new vector representing the cross product.
     */
    cross(v) {
        const r = (0, vec3core_1.vec3Cross)(this.x, this.y, this.z, v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Alias for `cross`.
     */
    crossProd(v) {
        return this.cross(v);
    }
    /**
     * Returns the normalized (unit) vector.
     * @returns {_V3} A new unit vector.
     */
    normalize() {
        const r = (0, vec3core_1.vec3Normalize)(this.x, this.y, this.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Alias for `normalize`.
     */
    unitVector() {
        return this.normalize();
    }
    /**
     * Returns the negated vector.
     * @returns {_V3} A new negated vector.
     */
    negate() {
        const r = (0, vec3core_1.vec3Negate)(this.x, this.y, this.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Returns a vector with absolute values.
     * @returns {_V3} A new vector with absolute values.
     */
    abs() {
        const r = (0, vec3core_1.vec3Abs)(this.x, this.y, this.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Returns the component-wise maximum with another vector.
     * @param {_V3} v - The other vector.
     * @returns {_V3} A new vector with component-wise maximum.
     */
    max(v) {
        const r = (0, vec3core_1.vec3Max)(this.x, this.y, this.z, v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Returns the component-wise minimum with another vector.
     * @param {_V3} v - The other vector.
     * @returns {_V3} A new vector with component-wise minimum.
     */
    min(v) {
        const r = (0, vec3core_1.vec3Min)(this.x, this.y, this.z, v.x, v.y, v.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Gets the magnitude (length) of the vector.
     * @returns {number} The magnitude of the vector.
     */
    get magnitude() {
        return (0, vec3core_1.vec3Mag)(this.x, this.y, this.z);
    }
    /**
     * Alias for `magnitude`.
     */
    get length() {
        return this.magnitude;
    }
    /**
     * Gets the squared magnitude of the vector (faster than `magnitude`).
     * @returns {number} The squared magnitude.
     */
    get squareMagnitude() {
        return (0, vec3core_1.vec3SquareMag)(this.x, this.y, this.z);
    }
    /**
     * Alias for `squareMagnitude`.
     */
    lengthSq() {
        return this.squareMagnitude;
    }
    /**
     * Computes the distance to another vector.
     * @param {_V3} v - The other vector.
     * @returns {number} The distance.
     */
    distance(v) {
        return (0, vec3core_1.vec3Distance)(this.x, this.y, this.z, v.x, v.y, v.z);
    }
    /**
     * Checks if this vector is identical to another.
     * @param {_V3} v - The other vector.
     * @returns {boolean} True if identical.
     */
    sameLike(v) {
        return (0, vec3core_1.vec3SameLike)(this.x, this.y, this.z, v.x, v.y, v.z);
    }
    /**
     * Linearly interpolates between this vector and another.
     * @param {_V3} v - The target vector.
     * @param {number} amt - The interpolation amount (0 to 1).
     * @returns {_V3} A new interpolated vector.
     */
    lerp(v, amt) {
        const r = (0, vec3core_1.vec3Lerp)(this.x, this.y, this.z, v.x, v.y, v.z, amt);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Floors the values of the vector components.
     * @returns {_V3} A new vector with floored values.
     */
    floor() {
        const r = (0, vec3core_1.vec3Floor)(this.x, this.y, this.z);
        return new _V3(r.x, r.y, r.z);
    }
    /**
     * Returns the angle in the XY plane.
     * @returns {number} The angle in radians.
     */
    angleXY() {
        return (0, vec3core_1.vec3AngleXY)(this.x, this.y);
    }
    /**
     * Converts this vector to an array.
     * @returns {number[]} An array [x, y, z].
     */
    toArray() {
        return [this.x, this.y, this.z];
    }
}
exports._V3 = _V3;
//# sourceMappingURL=_v3.js.map