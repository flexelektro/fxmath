"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2 = exports.v2 = void 0;
const common_1 = require("./common");
const vec2core_1 = require("./vec2core");
const v2 = (x, y) => {
    return new V2(x, y);
};
exports.v2 = v2;
class V2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // ============================================================================
    // STATIC METHODS
    // ============================================================================
    /**
     * Creates a vector from point A to point B.
     * @param {V2} a - The starting point.
     * @param {V2} b - The ending point.
     * @returns {V2} The resulting vector.
     */
    static fromTo(a, b) {
        const r = (0, vec2core_1.vec2FromTo)(a.x, a.y, b.x, b.y);
        return new V2(r.x, r.y);
    }
    /**
     * Checks if two vectors are identical.
     * @param {V2} a - First vector.
     * @param {V2} b - Second vector.
     * @returns {boolean} `true` if the vectors are the same, otherwise `false`.
     */
    static sameLike(a, b) {
        return (0, vec2core_1.vec2SameLike)(a.x, a.y, b.x, b.y);
    }
    /**
     * Computes the intersection of two line segments.
     * @param {V2} pA - First segment start.
     * @param {V2} pA2 - First segment end.
     * @param {V2} pB - Second segment start.
     * @param {V2} pB2 - Second segment end.
     * @returns {V2 | false} The intersection point or `false` if no intersection exists.
     */
    static linesIntersect(pA, pA2, pB, pB2) {
        const r = (0, vec2core_1.vec2LinesIntersect)(pA.x, pA.y, pA2.x, pA2.y, pB.x, pB.y, pB2.x, pB2.y);
        return r ? new V2(r.x, r.y) : false;
    }
    /**
     * Checks if a point is inside a polygon.
     * @param {V2} p - The point to check.
     * @param {V2[]} polygon - An array of vectors defining the polygon.
     * @returns {boolean} `true` if the point is inside, otherwise `false`.
     */
    static isPointInPolygon(p, polygon) {
        return (0, vec2core_1.vec2IsPointInPolygon)(p.x, p.y, polygon);
    }
    /**
     * Creates a new 2D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @returns {V2} A new V2 instance.
     */
    static create(x, y) {
        return new V2(x, y);
    }
    /**
     * Creates a vector using a magnitude and an angle.
     * @param {number} mag - The magnitude (length) of the vector.
     * @param {number} angle - The angle in radians.
     * @returns {V2} The resulting vector.
     */
    static createByMagnitudeAndAngle(mag, angle) {
        const r = (0, vec2core_1.vec2FromMagAngle)(mag, angle);
        return new V2(r.x, r.y);
    }
    /**
     * Computes the angle of a vector in radians.
     * @param {V2} v - The vector.
     * @returns {number} The angle in radians.
     */
    static getAngle(v) {
        return (0, vec2core_1.vec2Angle)(v.x, v.y);
    }
    /**
     * Calculates the angle between two vectors.
     * @param {V2} a - First vector.
     * @param {V2} b - Second vector.
     * @returns {number} The angle in radians.
     */
    static angleBetween(a, b) {
        return (0, vec2core_1.vec2AngleBetween)(a.x, a.y, b.x, b.y);
    }
    /**
     * Clones a vector.
     * @param {V2} v - The vector to clone.
     * @returns {V2} A new instance with the same values.
     */
    static clone(v) {
        return new V2(v.x, v.y);
    }
    /**
     * Computes the magnitude (length) of a vector.
     * @param {V2} v - The vector.
     * @returns {number} The magnitude of the vector.
     */
    static magnitude(v) {
        return (0, vec2core_1.vec2Mag)(v.x, v.y);
    }
    /**
     * Computes the squared magnitude of a vector (avoiding square root for performance).
     * @param {V2} v - The vector.
     * @returns {number} The squared magnitude.
     */
    static squareMagnitude(v) {
        return (0, vec2core_1.vec2SquareMag)(v.x, v.y);
    }
    /**
     * Computes the distance between two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The distance between `v1` and `v2`.
     */
    static distance(v1, v2) {
        const r = (0, vec2core_1.vec2Sub)(v1.x, v1.y, v2.x, v2.y);
        return (0, vec2core_1.vec2Mag)(r.x, r.y);
    }
    /**
     * Adds two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {V2} The resulting vector.
     */
    static add(v1, v2) {
        const r = (0, vec2core_1.vec2Add)(v1.x, v1.y, v2.x, v2.y);
        return new V2(r.x, r.y);
    }
    /**
     * Subtracts one vector from another.
     * @param {V2} v1 - The vector to subtract from.
     * @param {V2} v2 - The vector to subtract.
     * @returns {V2} The resulting vector.
     */
    static subtract(v1, v2) {
        const r = (0, vec2core_1.vec2Sub)(v1.x, v1.y, v2.x, v2.y);
        return new V2(r.x, r.y);
    }
    /**
     * Alias for `subtract`.
     * @param {V2} v1 - The vector to subtract from.
     * @param {V2} v2 - The vector to subtract.
     * @returns {V2} The resulting vector.
     */
    static sub(v1, v2) {
        return V2.subtract(v1, v2);
    }
    /**
     * Multiplies a vector by a scalar.
     * @param {V2} vector - The vector to multiply.
     * @param {number} scalar - The scalar value.
     * @returns {V2} The scaled vector.
     */
    static multiply(vector, scalar) {
        const r = (0, vec2core_1.vec2Mult)(vector.x, vector.y, scalar);
        return new V2(r.x, r.y);
    }
    /**
     * Multiplies two vectors component-wise. (Hadamard-Produkt)
     * @param {V2} v0 - First vector.
     * @param {V2} v1 - Second vector.
     * @returns {V2} The resulting vector.
     */
    static multVec(v0, v1) {
        const r = (0, vec2core_1.vec2MultVec)(v0.x, v0.y, v1.x, v1.y);
        return new V2(r.x, r.y);
    }
    /**
     * Divides a vector by a scalar.
     * @param {V2} v - The vector to divide.
     * @param {number} scalar - The scalar value.
     * @returns {V2} The resulting vector.
     */
    static divide(v, scalar) {
        const r = (0, vec2core_1.vec2Div)(v.x, v.y, scalar);
        return new V2(r.x, r.y);
    }
    /**
     * Computes the dot product of two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The dot product.
     */
    static dotprod(v1, v2) {
        return (0, vec2core_1.vec2Dot)(v1.x, v1.y, v2.x, v2.y);
    }
    /**
     * Alias for `dotprod`.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The dot product.
     */
    static dot(v1, v2) {
        return V2.dotprod(v1, v2);
    }
    /**
     * Computes the cross product of two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The cross product (a scalar value).
     */
    static crossprod(v1, v2) {
        return (0, vec2core_1.vec2Cross)(v1.x, v1.y, v2.x, v2.y);
    }
    /**
     * Returns the unit vector (normalized) of a given vector.
     * @param {V2} v - The vector to normalize.
     * @returns {V2} The unit vector.
     */
    static unitVec(v) {
        const r = (0, vec2core_1.vec2Normalize)(v.x, v.y);
        return new V2(r.x, r.y);
    }
    /**
     * Projects vector `v1` onto vector `v2`.
     * @param {V2} v1 - The vector to be projected.
     * @param {V2} v2 - The vector onto which `v1` is projected.
     * @returns {V2} The projected vector.
     */
    static projectionFromTo(v1, v2) {
        const r = (0, vec2core_1.vec2Project)(v1.x, v1.y, v2.x, v2.y);
        return new V2(r.x, r.y);
    }
    /**
     * Rotates a vector around the origin.
     * @param {V2} v - The vector to rotate.
     * @param {number} angle - The rotation angle in radians.
     * @returns {V2} The rotated vector.
     */
    static rotate(v, angle) {
        const r = (0, vec2core_1.vec2Rotate)(v.x, v.y, angle);
        return new V2(r.x, r.y);
    }
    /**
     * Rotates a vector around a pivot point.
     * @param {V2} point - The vector to rotate.
     * @param {V2} pivot - The pivot point.
     * @param {number} angleRad - The rotation angle in radians.
     * @returns {V2} The rotated vector.
     */
    static rotateAroundPivot(point, pivot, angleRad) {
        const r = (0, vec2core_1.vec2RotateAroundPivot)(point.x, point.y, pivot.x, pivot.y, angleRad);
        return new V2(r.x, r.y);
    }
    /**
     * Computes the left normal of a vector.
     * @param {V2} v - The vector.
     * @returns {V2} The left normal vector.
     */
    static normalLeft(v) {
        const r = (0, vec2core_1.vec2NormalLeft)(v.x, v.y);
        return new V2(r.x, r.y);
    }
    /**
     * Computes the right normal of a vector.
     * @param {V2} v - The vector.
     * @returns {V2} The right normal vector.
     */
    static normalRight(v) {
        const r = (0, vec2core_1.vec2NormalRight)(v.x, v.y);
        return new V2(r.x, r.y);
    }
    /**
     * Computes the Manhattan distance between two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The Manhattan distance.
     */
    static manhattanDistance(v1, v2) {
        return (0, vec2core_1.vec2ManhattanDist)(v1.x, v1.y, v2.x, v2.y);
    }
    /**
     * Linearly interpolates between two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {V2} The interpolated vector.
     */
    static lerp(v1, v2, amt) {
        const r = (0, vec2core_1.vec2Lerp)(v1.x, v1.y, v2.x, v2.y, amt);
        return new V2(r.x, r.y);
    }
    // ============================================================================
    // INSTANCE METHODS
    // ============================================================================
    /**
     * Creates a new copy of this vector.
     * @returns {V2} A new V2 instance with the same coordinates.
     */
    clone() {
        return new V2(this.x, this.y);
    }
    /**
     * Checks if this vector is identical to another vector.
     * @param {V2} v - The vector to compare with.
     * @returns {boolean} `true` if both vectors have the same coordinates, otherwise `false`.
     */
    sameLike(v) {
        return (0, vec2core_1.vec2SameLike)(this.x, this.y, v.x, v.y);
    }
    /**
     * Alias for `clone()`.
     * @returns {V2} A new V2 instance with the same coordinates.
     */
    copy() {
        return this.clone();
    }
    /**
     * Gets the angle of the vector in radians.
     * @returns {number} The angle in radians.
     */
    get angle() {
        return (0, vec2core_1.vec2Angle)(this.x, this.y);
    }
    /**
     * Sets the angle of the vector while keeping its magnitude.
     * @param {number} rad - The new angle in radians.
     */
    set angle(rad) {
        const r = (0, vec2core_1.vec2FromMagAngle)(this.magnitude, rad);
        this.x = r.x;
        this.y = r.y;
    }
    /**
     * Sets the angle of the vector while keeping its magnitude.
     * @param {number} rad - The new angle in radians.
     * @returns {this} The updated vector.
     */
    setAngle(rad) {
        const r = (0, vec2core_1.vec2FromMagAngle)(this.magnitude, rad);
        this.x = r.x;
        this.y = r.y;
        return this;
    }
    /**
     * Gets the angle of the vector in degrees.
     * @returns {number} The angle in degrees.
     */
    get degree() {
        return (360 / (2 * Math.PI)) * (0, vec2core_1.vec2Angle)(this.x, this.y);
    }
    /**
     * Computes the right-hand normal (perpendicular) vector.
     * @returns {this} The updated vector.
     */
    get toNormalRight() {
        const r = (0, vec2core_1.vec2NormalRight)(this.x, this.y);
        this.x = r.x;
        this.y = r.y;
        return this;
    }
    /**
     * Computes the left-hand normal (perpendicular) vector.
     * @returns {this} The updated vector.
     */
    get toNormalLeft() {
        const r = (0, vec2core_1.vec2NormalLeft)(this.x, this.y);
        this.x = r.x;
        this.y = r.y;
        return this;
    }
    /**
     * Sets the angle of the vector in degrees.
     * @param {number} degree - The new angle in degrees.
     */
    set degree(degree) {
        let rad = (Math.PI * 2 / 360) * degree;
        this.setAngle(rad);
    }
    /**
     * Sets the angle of the vector in degrees.
     * @param {number} degree - The new angle in degrees.
     * @returns {this} The updated vector.
     */
    setDegree(degree) {
        let rad = (Math.PI * 2 / 360) * degree;
        return this.setAngle(rad);
    }
    /**
     * Gets the magnitude (length) of the vector.
     * @returns {number} The vector's magnitude.
     */
    get magnitude() {
        return (0, vec2core_1.vec2Mag)(this.x, this.y);
    }
    /**
     * Alias for `magnitude`.
     * @returns {number} The vector's magnitude.
     */
    get length() {
        return this.magnitude;
    }
    /**
     * Gets the squared magnitude of the vector.
     * Useful for performance optimization when the actual magnitude is not needed.
     * @returns {number} The squared magnitude.
     */
    get squareMagnitude() {
        return (0, vec2core_1.vec2SquareMag)(this.x, this.y);
    }
    /**
     * Computes the Euclidean distance from this vector to another vector.
     * @param {V2} v - The other vector.
     * @returns {number} The distance between the two vectors.
     */
    distance(v) {
        const r = (0, vec2core_1.vec2Sub)(this.x, this.y, v.x, v.y);
        return (0, vec2core_1.vec2Mag)(r.x, r.y);
    }
    /**
     * Normalizes the vector to a unit vector (magnitude of 1).
     * @returns {V2} The normalized vector.
     */
    unitVec() {
        const r = (0, vec2core_1.vec2Normalize)(this.x, this.y);
        return new V2(r.x, r.y);
    }
    /**
     * Adds another vector to this vector.
     * @param {V2} v - The vector to add.
     * @returns {this} The updated vector.
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /**
     * Adds a random offset to the vector within a specified range.
     * @param {number} rand - The maximum random deviation per axis.
     * @returns {this} The updated vector.
     */
    addRnd(rand) {
        this.x += (0, common_1.rnd)(-rand, rand);
        this.y += (0, common_1.rnd)(-rand, rand);
        return this;
    }
    /**
     * Subtracts another vector from this vector.
     * @param {V2} v - The vector to subtract.
     * @returns {this} The updated vector.
     */
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /**
     * Alias for `subtract()`.
     * @param {V2} v - The vector to subtract.
     * @returns {this} The updated vector.
     */
    sub(v) {
        return this.subtract(v);
    }
    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar - The scalar value.
     * @returns {this} The updated vector.
     */
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    /**
     * Multiplies this vector component-wise with another vector.
     * @param {V2} v - The vector to multiply by.
     * @returns {this} The updated vector.
     */
    multVec(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    /**
     * Divides this vector by a scalar.
     * @param {number} scalar - The scalar divisor.
     * @returns {this} The updated vector.
     */
    divide(scalar) {
        return this.multiply(1 / scalar);
    }
    /**
     * Computes the dot product with another vector.
     * @param {V2} v - The other vector.
     * @returns {number} The dot product.
     */
    dotprod(v) {
        return (0, vec2core_1.vec2Dot)(this.x, this.y, v.x, v.y);
    }
    /**
     * Alias for `dotprod()`.
     * @param {V2} v - The other vector.
     * @returns {number} The dot product.
     */
    dot(v) {
        return this.dotprod(v);
    }
    /**
     * Computes the cross product with another vector.
     * @param {V2} v - The other vector.
     * @returns {number} The cross product (a scalar).
     */
    crossprod(v) {
        return (0, vec2core_1.vec2Cross)(this.x, this.y, v.x, v.y);
    }
    /**
     * Rotates this vector around the origin (0,0).
     * @param {number} angle - The rotation angle in radians.
     * @returns {this} The updated vector after rotation.
     */
    rotate(angle) {
        return this.rotateAroundPivot(v2(0, 0), angle);
    }
    /**
     * Rotates this vector around a given pivot point.
     * @param {V2} pivot - The pivot point around which the vector rotates.
     * @param {number} angleRad - The rotation angle in radians.
     * @returns {this} The updated vector after rotation.
     */
    rotateAroundPivot(pivot, angleRad) {
        const r = (0, vec2core_1.vec2RotateAroundPivot)(this.x, this.y, pivot.x, pivot.y, angleRad);
        this.x = r.x;
        this.y = r.y;
        return this;
    }
    /**
     * Computes the left-hand normal (perpendicular) of this vector.
     * The result is a vector rotated 90 degrees counterclockwise.
     * @returns {this} The updated vector.
     */
    toNormal() {
        const r = (0, vec2core_1.vec2NormalLeft)(this.x, this.y);
        this.x = r.x;
        this.y = r.y;
        return this;
    }
    /**
     * Computes the left-hand normal (perpendicular) of this vector.
     * The resulting vector is rotated 90 degrees counterclockwise.
     * @returns {V2} A new vector that is perpendicular to this vector.
     */
    normal() {
        const r = (0, vec2core_1.vec2NormalLeft)(this.x, this.y);
        return new V2(r.x, r.y);
    }
    /**
     * Linearly interpolates between this vector and another vector.
     * @param {V2} v - The target vector.
     * @param {number} amt - The interpolation factor (0 to 1).
     * @returns {this} The updated vector after interpolation.
     */
    lerp(v, amt) {
        const r = (0, vec2core_1.vec2Lerp)(this.x, this.y, v.x, v.y, amt);
        this.x = r.x;
        this.y = r.y;
        return this;
    }
    /**
     * Floors the values of the vector components (rounds down to nearest integer).
     * Uses bitwise OR to optimize performance.
     * @returns {this} The updated vector with floored values.
     */
    floorValues() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    /**
     * Checks if this vector is inside a given polygon.
     * @param {V2[]} polygon - An array of vectors representing the polygon's vertices.
     * @returns {boolean} `true` if the vector is inside the polygon, otherwise `false`.
     */
    isInPolygon(polygon) {
        return (0, vec2core_1.vec2IsPointInPolygon)(this.x, this.y, polygon);
    }
}
exports.V2 = V2;
//# sourceMappingURL=v2.js.map