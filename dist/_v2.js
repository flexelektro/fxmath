"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._V2 = exports._v2 = void 0;
const vec2core_1 = require("./vec2core");
const _v2 = (x, y) => {
    return new _V2(x, y);
};
exports._v2 = _v2;
class _V2 {
    /**
     * Creates a new immutable 2D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     */
    constructor(x, y) {
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
    static fromTo(a, b) {
        const r = (0, vec2core_1.vec2FromTo)(a.x, a.y, b.x, b.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Checks if two vectors are identical.
     * @param {_V2} a - First vector.
     * @param {_V2} b - Second vector.
     * @returns {boolean} `true` if the vectors are the same, otherwise `false`.
     */
    static sameLike(a, b) {
        return (0, vec2core_1.vec2SameLike)(a.x, a.y, b.x, b.y);
    }
    /**
     * Computes the intersection of two line segments.
     * @param {_V2} pA - First segment start.
     * @param {_V2} pA2 - First segment end.
     * @param {_V2} pB - Second segment start.
     * @param {_V2} pB2 - Second segment end.
     * @returns {_V2 | false} The intersection point or `false` if no intersection exists.
     */
    static linesIntersect(pA, pA2, pB, pB2) {
        const r = (0, vec2core_1.vec2LinesIntersect)(pA.x, pA.y, pA2.x, pA2.y, pB.x, pB.y, pB2.x, pB2.y);
        return r ? new _V2(r.x, r.y) : false;
    }
    /**
     * Checks if a point is inside a polygon.
     * @param {_V2} p - The point to check.
     * @param {IVec2[]} polygon - An array of vectors defining the polygon.
     * @returns {boolean} `true` if the point is inside, otherwise `false`.
     */
    static isPointInPolygon(p, polygon) {
        return (0, vec2core_1.vec2IsPointInPolygon)(p.x, p.y, polygon);
    }
    /**
     * Creates a new 2D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @returns {_V2} A new _V2 instance.
     */
    static create(x, y) {
        return new _V2(x, y);
    }
    /**
     * Creates a vector using a magnitude and an angle.
     * @param {number} mag - The magnitude (length) of the vector.
     * @param {number} angle - The angle in radians.
     * @returns {_V2} The resulting vector.
     */
    static createByMagnitudeAndAngle(mag, angle) {
        const r = (0, vec2core_1.vec2FromMagAngle)(mag, angle);
        return new _V2(r.x, r.y);
    }
    /**
     * Computes the angle of a vector in radians.
     * @param {_V2} v - The vector.
     * @returns {number} The angle in radians.
     */
    static getAngle(v) {
        return (0, vec2core_1.vec2Angle)(v.x, v.y);
    }
    /**
     * Calculates the angle between two vectors.
     * @param {_V2} a - First vector.
     * @param {_V2} b - Second vector.
     * @returns {number} The angle in radians.
     */
    static angleBetween(a, b) {
        return (0, vec2core_1.vec2AngleBetween)(a.x, a.y, b.x, b.y);
    }
    /**
     * Clones a vector.
     * @param {_V2} v - The vector to clone.
     * @returns {_V2} A new instance with the same values.
     */
    static clone(v) {
        return new _V2(v.x, v.y);
    }
    /**
     * Computes the magnitude (length) of a vector.
     * @param {_V2} v - The vector.
     * @returns {number} The magnitude of the vector.
     */
    static magnitude(v) {
        return (0, vec2core_1.vec2Mag)(v.x, v.y);
    }
    /**
     * Computes the squared magnitude of a vector (avoiding square root for performance).
     * @param {_V2} v - The vector.
     * @returns {number} The squared magnitude.
     */
    static squareMagnitude(v) {
        return (0, vec2core_1.vec2SquareMag)(v.x, v.y);
    }
    /**
     * Computes the distance between two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The distance between `v1` and `v2`.
     */
    static distance(v1, v2) {
        const r = (0, vec2core_1.vec2Sub)(v1.x, v1.y, v2.x, v2.y);
        return (0, vec2core_1.vec2Mag)(r.x, r.y);
    }
    /**
     * Adds two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {_V2} The resulting vector.
     */
    static add(v1, v2) {
        const r = (0, vec2core_1.vec2Add)(v1.x, v1.y, v2.x, v2.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Subtracts one vector from another.
     * @param {_V2} v1 - The vector to subtract from.
     * @param {_V2} v2 - The vector to subtract.
     * @returns {_V2} The resulting vector.
     */
    static subtract(v1, v2) {
        const r = (0, vec2core_1.vec2Sub)(v1.x, v1.y, v2.x, v2.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Alias for `subtract`.
     * @param {_V2} v1 - The vector to subtract from.
     * @param {_V2} v2 - The vector to subtract.
     * @returns {_V2} The resulting vector.
     */
    static sub(v1, v2) {
        return _V2.subtract(v1, v2);
    }
    /**
     * Multiplies a vector by a scalar.
     * @param {_V2} vector - The vector to multiply.
     * @param {number} scalar - The scalar value.
     * @returns {_V2} The scaled vector.
     */
    static multiply(vector, scalar) {
        const r = (0, vec2core_1.vec2Mult)(vector.x, vector.y, scalar);
        return new _V2(r.x, r.y);
    }
    /**
     * Multiplies two vectors component-wise.
     * @param {_V2} v0 - First vector.
     * @param {_V2} v1 - Second vector.
     * @returns {_V2} The resulting vector.
     */
    static multVec(v0, v1) {
        const r = (0, vec2core_1.vec2MultVec)(v0.x, v0.y, v1.x, v1.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Divides a vector by a scalar.
     * @param {_V2} v - The vector to divide.
     * @param {number} scalar - The scalar value.
     * @returns {_V2} The resulting vector.
     */
    static divide(v, scalar) {
        const r = (0, vec2core_1.vec2Div)(v.x, v.y, scalar);
        return new _V2(r.x, r.y);
    }
    /**
     * Computes the dot product of two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The dot product.
     */
    static dotprod(v1, v2) {
        return (0, vec2core_1.vec2Dot)(v1.x, v1.y, v2.x, v2.y);
    }
    /**
     * Alias for `dotprod`.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The dot product.
     */
    static dot(v1, v2) {
        return _V2.dotprod(v1, v2);
    }
    /**
     * Computes the cross product of two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The cross product (a scalar value).
     */
    static crossprod(v1, v2) {
        return (0, vec2core_1.vec2Cross)(v1.x, v1.y, v2.x, v2.y);
    }
    /**
     * Returns the unit vector (normalized) of a given vector.
     * @param {_V2} v - The vector to normalize.
     * @returns {_V2} The unit vector.
     */
    static unitVec(v) {
        const r = (0, vec2core_1.vec2Normalize)(v.x, v.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Projects vector `v1` onto vector `v2`.
     * @param {_V2} v1 - The vector to be projected.
     * @param {_V2} v2 - The vector onto which `v1` is projected.
     * @returns {_V2} The projected vector.
     */
    static projectionFromTo(v1, v2) {
        const r = (0, vec2core_1.vec2Project)(v1.x, v1.y, v2.x, v2.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Rotates a vector around the origin.
     * @param {_V2} v - The vector to rotate.
     * @param {number} angle - The rotation angle in radians.
     * @returns {_V2} The rotated vector.
     */
    static rotate(v, angle) {
        const r = (0, vec2core_1.vec2Rotate)(v.x, v.y, angle);
        return new _V2(r.x, r.y);
    }
    /**
     * Rotates a vector around a pivot point.
     * @param {_V2} point - The vector to rotate.
     * @param {_V2} pivot - The pivot point.
     * @param {number} angleRad - The rotation angle in radians.
     * @returns {_V2} The rotated vector.
     */
    static rotateAroundPivot(point, pivot, angleRad) {
        const r = (0, vec2core_1.vec2RotateAroundPivot)(point.x, point.y, pivot.x, pivot.y, angleRad);
        return new _V2(r.x, r.y);
    }
    /**
     * Computes the left normal of a vector.
     * @param {_V2} v - The vector.
     * @returns {_V2} The left normal vector.
     */
    static normalLeft(v) {
        const r = (0, vec2core_1.vec2NormalLeft)(v.x, v.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Computes the right normal of a vector.
     * @param {_V2} v - The vector.
     * @returns {_V2} The right normal vector.
     */
    static normalRight(v) {
        const r = (0, vec2core_1.vec2NormalRight)(v.x, v.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Computes the Manhattan distance between two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @returns {number} The Manhattan distance.
     */
    static manhattanDistance(v1, v2) {
        return (0, vec2core_1.vec2ManhattanDist)(v1.x, v1.y, v2.x, v2.y);
    }
    /**
     * Linearly interpolates between two vectors.
     * @param {_V2} v1 - First vector.
     * @param {_V2} v2 - Second vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {_V2} The interpolated vector.
     */
    static lerp(v1, v2, amt) {
        const r = (0, vec2core_1.vec2Lerp)(v1.x, v1.y, v2.x, v2.y, amt);
        return new _V2(r.x, r.y);
    }
    // ============================================================================
    // INSTANCE METHODS (all return new instances - immutable)
    // ============================================================================
    /**
     * Creates a new vector with the same values.
     * @returns {_V2} A new copy of this vector.
     */
    clone() {
        return new _V2(this.x, this.y);
    }
    /**
     * Adds another vector and returns a new vector.
     * @param {_V2} v - The vector to add.
     * @returns {_V2} A new vector with the result.
     */
    add(v) {
        const r = (0, vec2core_1.vec2Add)(this.x, this.y, v.x, v.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Subtracts another vector and returns a new vector.
     * @param {_V2} v - The vector to subtract.
     * @returns {_V2} A new vector with the result.
     */
    subtract(v) {
        const r = (0, vec2core_1.vec2Sub)(this.x, this.y, v.x, v.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar - The scalar to multiply.
     * @returns {_V2} A new vector with the result.
     */
    multiply(scalar) {
        const r = (0, vec2core_1.vec2Mult)(this.x, this.y, scalar);
        return new _V2(r.x, r.y);
    }
    /**
     * Divides this vector by a scalar.
     * @param {number} scalar - The scalar to divide by.
     * @returns {_V2} A new vector with the result.
     */
    divide(scalar) {
        const r = (0, vec2core_1.vec2Div)(this.x, this.y, scalar);
        return new _V2(r.x, r.y);
    }
    /**
     * Computes the dot product with another vector.
     * @param {_V2} v - The other vector.
     * @returns {number} The dot product.
     */
    dot(v) {
        return (0, vec2core_1.vec2Dot)(this.x, this.y, v.x, v.y);
    }
    /**
     * Computes the cross product with another vector.
     * @param {_V2} v - The other vector.
     * @returns {number} The cross product.
     */
    cross(v) {
        return (0, vec2core_1.vec2Cross)(this.x, this.y, v.x, v.y);
    }
    /**
     * Returns the normalized (unit) vector.
     * @returns {_V2} A new unit vector.
     */
    normalize() {
        const r = (0, vec2core_1.vec2Normalize)(this.x, this.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Rotates this vector by a given angle in radians.
     * @param {number} angle - The angle in radians.
     * @returns {_V2} A new rotated vector.
     */
    rotate(angle) {
        const r = (0, vec2core_1.vec2Rotate)(this.x, this.y, angle);
        return new _V2(r.x, r.y);
    }
    /**
     * Computes the perpendicular left normal vector (90° counterclockwise).
     * @returns {_V2} A new vector rotated 90° counterclockwise.
     */
    normalLeft() {
        const r = (0, vec2core_1.vec2NormalLeft)(this.x, this.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Computes the perpendicular right normal vector (90° clockwise).
     * @returns {_V2} A new vector rotated 90° clockwise.
     */
    normalRight() {
        const r = (0, vec2core_1.vec2NormalRight)(this.x, this.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Gets the magnitude (length) of the vector.
     * @returns {number} The magnitude of the vector.
     */
    get magnitude() {
        return (0, vec2core_1.vec2Mag)(this.x, this.y);
    }
    /**
     * Gets the squared magnitude of the vector (faster than `magnitude()`).
     * @returns {number} The squared magnitude.
     */
    get squareMagnitude() {
        return (0, vec2core_1.vec2SquareMag)(this.x, this.y);
    }
    /**
     * Computes the distance to another vector.
     * @param {_V2} v - The other vector.
     * @returns {number} The distance.
     */
    distance(v) {
        const r = (0, vec2core_1.vec2Sub)(this.x, this.y, v.x, v.y);
        return (0, vec2core_1.vec2Mag)(r.x, r.y);
    }
    /**
     * Linearly interpolates between this vector and another.
     * @param {_V2} v - The target vector.
     * @param {number} amt - The interpolation amount (0 to 1).
     * @returns {_V2} The interpolated vector.
     */
    lerp(v, amt) {
        const r = (0, vec2core_1.vec2Lerp)(this.x, this.y, v.x, v.y, amt);
        return new _V2(r.x, r.y);
    }
    /**
     * Floors the values of the vector components.
     * @returns {_V2} A new vector with floored values.
     */
    floor() {
        const r = (0, vec2core_1.vec2Floor)(this.x, this.y);
        return new _V2(r.x, r.y);
    }
    /**
     * Checks if this vector is inside a given polygon.
     * @param {_V2[]} polygon - The polygon as an array of vectors.
     * @returns {boolean} `true` if inside, otherwise `false`.
     */
    isInPolygon(polygon) {
        return (0, vec2core_1.vec2IsPointInPolygon)(this.x, this.y, polygon);
    }
}
exports._V2 = _V2;
//# sourceMappingURL=_v2.js.map