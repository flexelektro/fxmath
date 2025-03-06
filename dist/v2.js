"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2 = exports.v2 = void 0;
const common_1 = require("./common");
const v2 = (x, y) => {
    return new V2(x, y);
};
exports.v2 = v2;
class V2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Creates a vector from point A to point B.
     * @param {V2} a - The starting point.
     * @param {V2} b - The ending point.
     * @returns {V2} The resulting vector.
     */
    static fromTo(a, b) {
        return v2(b.x - a.x, b.y - a.y);
    }
    /**
     * Checks if two vectors are identical.
     * @param {V2} a - First vector.
     * @param {V2} b - Second vector.
     * @returns {boolean} `true` if the vectors are the same, otherwise `false`.
     */
    static sameLike(a, b) {
        return a.x === b.x && a.y === b.y;
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
        let denominator = (pB2.y - pB.y) * (pA2.x - pA.x) - (pB2.x - pB.x) * (pA2.y - pA.y);
        if (denominator === 0)
            return false; // Parallel lines
        let ua = ((pB2.x - pB.x) * (pA.y - pB.y) - (pB2.y - pB.y) * (pA.x - pB.x)) /
            denominator;
        let ub = ((pA2.x - pA.x) * (pA.y - pB.y) - (pA2.y - pA.y) * (pA.x - pB.x)) /
            denominator;
        if (ua < 0 || ua > 1 || ub < 0 || ub > 1)
            return false;
        let x = pA.x + ua * (pA2.x - pA.x);
        let y = pA.y + ua * (pA2.y - pA.y);
        return v2(x, y);
    }
    /**
     * Checks if a point is inside a polygon.
     * @param {V2} p - The point to check.
     * @param {V2[]} polygon - An array of vectors defining the polygon.
     * @returns {boolean} `true` if the point is inside, otherwise `false`.
     */
    static isPointInPolygon(p, polygon) {
        let len = polygon.length;
        let inside = false;
        for (let i = 0, j = len - 1; i < len; j = i++) {
            if ((polygon[i].y > p.y) !== (polygon[j].y > p.y) &&
                p.x <
                    ((polygon[j].x - polygon[i].x) * (p.y - polygon[i].y)) /
                        (polygon[j].y - polygon[i].y) +
                        polygon[i].x) {
                inside = !inside;
            }
        }
        return inside;
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
        return new V2(mag * Math.cos(angle), mag * Math.sin(angle));
    }
    /**
     * Computes the angle of a vector in radians.
     * @param {V2} v - The vector.
     * @returns {number} The angle in radians.
     */
    static getAngle(v) {
        return Math.atan2(v.y, v.x);
    }
    /**
     * Calculates the angle between two vectors.
     * @param {V2} a - First vector.
     * @param {V2} b - Second vector.
     * @returns {number} The angle in radians.
     */
    static angleBetween(a, b) {
        return Math.acos(V2.dotprod(a, b) / (a.magnitude * b.magnitude));
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
        return v.magnitude;
    }
    /**
     * Computes the squared magnitude of a vector (avoiding square root for performance).
     * @param {V2} v - The vector.
     * @returns {number} The squared magnitude.
     */
    static squareMagnitude(v) {
        return v.squareMagnitude;
    }
    /**
     * Computes the distance between two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The distance between `v1` and `v2`.
     */
    static distance(v1, v2) {
        return V2.subtract(v1, v2).magnitude;
    }
    /**
     * Adds two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {V2} The resulting vector.
     */
    static add(v1, v2) {
        return new V2(v1.x + v2.x, v1.y + v2.y);
    }
    /**
     * Subtracts one vector from another.
     * @param {V2} v1 - The vector to subtract from.
     * @param {V2} v2 - The vector to subtract.
     * @returns {V2} The resulting vector.
     */
    static subtract(v1, v2) {
        return new V2(v1.x - v2.x, v1.y - v2.y);
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
        return new V2(vector.x * scalar, vector.y * scalar);
    }
    /**
     * Multiplies two vectors component-wise.
     * @param {V2} v0 - First vector.
     * @param {V2} v1 - Second vector.
     * @returns {V2} The resulting vector.
     */
    static multVec(v0, v1) {
        return new V2(v0.x * v1.x, v0.y * v1.y);
    }
    /**
     * Divides a vector by a scalar.
     * @param {V2} v - The vector to divide.
     * @param {number} scalar - The scalar value.
     * @returns {V2} The resulting vector.
     */
    static divide(v, scalar) {
        return V2.multiply(v, 1 / scalar);
    }
    /**
     * Computes the dot product of two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The dot product.
     */
    static dotprod(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
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
        return v1.x * v2.y - v1.y * v2.x;
    }
    /**
     * Returns the unit vector (normalized) of a given vector.
     * @param {V2} v - The vector to normalize.
     * @returns {V2} The unit vector.
     */
    static unitVec(v) {
        return V2.divide(v, v.magnitude);
    }
    /**
     * Projects vector `v1` onto vector `v2`.
     * @param {V2} v1 - The vector to be projected.
     * @param {V2} v2 - The vector onto which `v1` is projected.
     * @returns {V2} The projected vector.
     */
    static projectionFromTo(v1, v2) {
        let unitVector = V2.unitVec(v2);
        return V2.multiply(unitVector, V2.dotprod(v1, unitVector));
    }
    /**
     * Rotates a vector around the origin.
     * @param {V2} v - The vector to rotate.
     * @param {number} angle - The rotation angle in radians.
     * @returns {V2} The rotated vector.
     */
    static rotate(v, angle) {
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        return new V2(v.x * cosA - v.y * sinA, v.x * sinA + v.y * cosA);
    }
    /**
     * Rotates a vector around a pivot point.
     * @param {V2} point - The vector to rotate.
     * @param {V2} pivot - The pivot point.
     * @param {number} angleRad - The rotation angle in radians.
     * @returns {V2} The rotated vector.
     */
    static rotateAroundPivot(point, pivot, angleRad) {
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        const dx = point.x - pivot.x;
        const dy = point.y - pivot.y;
        return new V2(cos * dx - sin * dy + pivot.x, sin * dx + cos * dy + pivot.y);
    }
    /**
     * Computes the left normal of a vector.
     * @param {V2} v - The vector.
     * @returns {V2} The left normal vector.
     */
    static normalLeft(v) {
        return new V2(-v.y, v.x);
    }
    /**
     * Computes the right normal of a vector.
     * @param {V2} v - The vector.
     * @returns {V2} The right normal vector.
     */
    static normalRight(v) {
        return new V2(v.y, -v.x);
    }
    /**
     * Computes the Manhattan distance between two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The Manhattan distance.
     */
    static manhattanDistance(v1, v2) {
        return Math.abs(v1.x - v2.x) + Math.abs(v1.y - v2.y);
    }
    /**
     * Linearly interpolates between two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {V2} The interpolated vector.
     */
    static lerp(v1, v2, amt) {
        return new V2((0, common_1.lerp)(v1.x, v2.x, amt), (0, common_1.lerp)(v1.y, v2.y, amt));
    }
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
        return this.x === v.x && this.y === v.y;
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
        return Math.atan2(this.y, this.x);
    }
    /**
     * Sets the angle of the vector while keeping its magnitude.
     * @param {number} rad - The new angle in radians.
     */
    set angle(rad) {
        let mag = this.magnitude;
        this.x = mag * Math.cos(rad);
        this.y = mag * Math.sin(rad);
    }
    /**
     * Sets the angle of the vector while keeping its magnitude.
     * @param {number} rad - The new angle in radians.
     * @returns {this} The updated vector.
     */
    setAngle(rad) {
        let mag = this.magnitude;
        this.x = mag * Math.cos(rad);
        this.y = mag * Math.sin(rad);
        return this;
    }
    /**
     * Gets the angle of the vector in degrees.
     * @returns {number} The angle in degrees.
     */
    get degree() {
        return (360 / (2 * Math.PI)) * Math.atan2(this.y, this.x);
    }
    /**
     * Computes the right-hand normal (perpendicular) vector.
     * @returns {this} The updated vector.
     */
    get toNormalRight() {
        let x = -this.y;
        let y = this.x;
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Computes the left-hand normal (perpendicular) vector.
     * @returns {this} The updated vector.
     */
    get toNormalLeft() {
        let x = this.y;
        let y = -this.x;
        this.x = x;
        this.y = y;
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
        return Math.sqrt(this.x * this.x + this.y * this.y);
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
        return this.x * this.x + this.y * this.y;
    }
    /**
     * Computes the Euclidean distance from this vector to another vector.
     * @param {V2} v - The other vector.
     * @returns {number} The distance between the two vectors.
     */
    distance(v) {
        return V2.subtract(this, v).magnitude;
    }
    /**
     * Normalizes the vector to a unit vector (magnitude of 1).
     * @returns {V2} The normalized vector.
     */
    unitVec() {
        return this.divide(this.magnitude);
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
        return this.x * v.x + this.y * v.y;
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
        return this.x * v.y - this.y * v.x;
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
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        const dx = this.x - pivot.x;
        const dy = this.y - pivot.y;
        const x = cos * dx - sin * dy + pivot.x;
        const y = sin * dx + cos * dy + pivot.y;
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Computes the left-hand normal (perpendicular) of this vector.
     * The result is a vector rotated 90 degrees counterclockwise.
     * @returns {this} The updated vector.
     */
    toNormal() {
        let x = -this.y;
        let y = this.x;
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Computes the left-hand normal (perpendicular) of this vector.
     * The resulting vector is rotated 90 degrees counterclockwise.
     * @returns {V2} A new vector that is perpendicular to this vector.
     */
    normal() {
        return new V2(-this.y, this.x);
    }
    /**
     * Linearly interpolates between this vector and another vector.
     * @param {V2} v - The target vector.
     * @param {number} amt - The interpolation factor (0 to 1).
     * @returns {this} The updated vector after interpolation.
     */
    lerp(v, amt) {
        let res = V2.lerp(this, v, amt);
        this.x = res.x;
        this.y = res.y;
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
        return V2.isPointInPolygon(this, polygon);
    }
}
exports.V2 = V2;
//# sourceMappingURL=v2.js.map