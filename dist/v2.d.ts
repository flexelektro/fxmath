declare const v2: (x: number, y: number) => V2;
declare class V2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    /**
     * Creates a vector from point A to point B.
     * @param {V2} a - The starting point.
     * @param {V2} b - The ending point.
     * @returns {V2} The resulting vector.
     */
    static fromTo(a: V2, b: V2): V2;
    /**
     * Checks if two vectors are identical.
     * @param {V2} a - First vector.
     * @param {V2} b - Second vector.
     * @returns {boolean} `true` if the vectors are the same, otherwise `false`.
     */
    static sameLike(a: V2, b: V2): boolean;
    /**
     * Computes the intersection of two line segments.
     * @param {V2} pA - First segment start.
     * @param {V2} pA2 - First segment end.
     * @param {V2} pB - Second segment start.
     * @param {V2} pB2 - Second segment end.
     * @returns {V2 | false} The intersection point or `false` if no intersection exists.
     */
    static linesIntersect(pA: V2, pA2: V2, pB: V2, pB2: V2): V2 | false;
    /**
     * Checks if a point is inside a polygon.
     * @param {V2} p - The point to check.
     * @param {V2[]} polygon - An array of vectors defining the polygon.
     * @returns {boolean} `true` if the point is inside, otherwise `false`.
     */
    static isPointInPolygon(p: V2, polygon: V2[]): boolean;
    /**
     * Creates a new 2D vector.
     * @param {number} x - The X-coordinate.
     * @param {number} y - The Y-coordinate.
     * @returns {V2} A new V2 instance.
     */
    static create(x: number, y: number): V2;
    /**
     * Creates a vector using a magnitude and an angle.
     * @param {number} mag - The magnitude (length) of the vector.
     * @param {number} angle - The angle in radians.
     * @returns {V2} The resulting vector.
     */
    static createByMagnitudeAndAngle(mag: number, angle: number): V2;
    /**
     * Computes the angle of a vector in radians.
     * @param {V2} v - The vector.
     * @returns {number} The angle in radians.
     */
    static getAngle(v: V2): number;
    /**
     * Calculates the angle between two vectors.
     * @param {V2} a - First vector.
     * @param {V2} b - Second vector.
     * @returns {number} The angle in radians.
     */
    static angleBetween(a: V2, b: V2): number;
    /**
     * Clones a vector.
     * @param {V2} v - The vector to clone.
     * @returns {V2} A new instance with the same values.
     */
    static clone(v: V2): V2;
    /**
     * Computes the magnitude (length) of a vector.
     * @param {V2} v - The vector.
     * @returns {number} The magnitude of the vector.
     */
    static magnitude(v: V2): number;
    /**
     * Computes the squared magnitude of a vector (avoiding square root for performance).
     * @param {V2} v - The vector.
     * @returns {number} The squared magnitude.
     */
    static squareMagnitude(v: V2): number;
    /**
     * Computes the distance between two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The distance between `v1` and `v2`.
     */
    static distance(v1: V2, v2: V2): number;
    /**
     * Adds two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {V2} The resulting vector.
     */
    static add(v1: V2, v2: V2): V2;
    /**
     * Subtracts one vector from another.
     * @param {V2} v1 - The vector to subtract from.
     * @param {V2} v2 - The vector to subtract.
     * @returns {V2} The resulting vector.
     */
    static subtract(v1: V2, v2: V2): V2;
    /**
     * Alias for `subtract`.
     * @param {V2} v1 - The vector to subtract from.
     * @param {V2} v2 - The vector to subtract.
     * @returns {V2} The resulting vector.
     */
    static sub(v1: V2, v2: V2): V2;
    /**
     * Multiplies a vector by a scalar.
     * @param {V2} vector - The vector to multiply.
     * @param {number} scalar - The scalar value.
     * @returns {V2} The scaled vector.
     */
    static multiply(vector: V2, scalar: number): V2;
    /**
     * Multiplies two vectors component-wise.
     * @param {V2} v0 - First vector.
     * @param {V2} v1 - Second vector.
     * @returns {V2} The resulting vector.
     */
    static multVec(v0: V2, v1: V2): V2;
    /**
     * Divides a vector by a scalar.
     * @param {V2} v - The vector to divide.
     * @param {number} scalar - The scalar value.
     * @returns {V2} The resulting vector.
     */
    static divide(v: V2, scalar: number): V2;
    /**
     * Computes the dot product of two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The dot product.
     */
    static dotprod(v1: V2, v2: V2): number;
    /**
     * Alias for `dotprod`.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The dot product.
     */
    static dot(v1: V2, v2: V2): number;
    /**
     * Computes the cross product of two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The cross product (a scalar value).
     */
    static crossprod(v1: V2, v2: V2): number;
    /**
     * Returns the unit vector (normalized) of a given vector.
     * @param {V2} v - The vector to normalize.
     * @returns {V2} The unit vector.
     */
    static unitVec(v: V2): V2;
    /**
     * Projects vector `v1` onto vector `v2`.
     * @param {V2} v1 - The vector to be projected.
     * @param {V2} v2 - The vector onto which `v1` is projected.
     * @returns {V2} The projected vector.
     */
    static projectionFromTo(v1: V2, v2: V2): V2;
    /**
     * Rotates a vector around the origin.
     * @param {V2} v - The vector to rotate.
     * @param {number} angle - The rotation angle in radians.
     * @returns {V2} The rotated vector.
     */
    static rotate(v: V2, angle: number): V2;
    /**
     * Rotates a vector around a pivot point.
     * @param {V2} point - The vector to rotate.
     * @param {V2} pivot - The pivot point.
     * @param {number} angleRad - The rotation angle in radians.
     * @returns {V2} The rotated vector.
     */
    static rotateAroundPivot(point: V2, pivot: V2, angleRad: number): V2;
    /**
     * Computes the left normal of a vector.
     * @param {V2} v - The vector.
     * @returns {V2} The left normal vector.
     */
    static normalLeft(v: V2): V2;
    /**
     * Computes the right normal of a vector.
     * @param {V2} v - The vector.
     * @returns {V2} The right normal vector.
     */
    static normalRight(v: V2): V2;
    /**
     * Computes the Manhattan distance between two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @returns {number} The Manhattan distance.
     */
    static manhattanDistance(v1: V2, v2: V2): number;
    /**
     * Linearly interpolates between two vectors.
     * @param {V2} v1 - First vector.
     * @param {V2} v2 - Second vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {V2} The interpolated vector.
     */
    static lerp(v1: V2, v2: V2, amt: number): V2;
    /**
     * Creates a new copy of this vector.
     * @returns {V2} A new V2 instance with the same coordinates.
     */
    clone(): V2;
    /**
     * Checks if this vector is identical to another vector.
     * @param {V2} v - The vector to compare with.
     * @returns {boolean} `true` if both vectors have the same coordinates, otherwise `false`.
     */
    sameLike(v: V2): boolean;
    /**
     * Alias for `clone()`.
     * @returns {V2} A new V2 instance with the same coordinates.
     */
    copy(): V2;
    /**
     * Gets the angle of the vector in radians.
     * @returns {number} The angle in radians.
     */
    get angle(): number;
    /**
     * Sets the angle of the vector while keeping its magnitude.
     * @param {number} rad - The new angle in radians.
     */
    set angle(rad: number);
    /**
     * Sets the angle of the vector while keeping its magnitude.
     * @param {number} rad - The new angle in radians.
     * @returns {this} The updated vector.
     */
    setAngle(rad: number): this;
    /**
     * Gets the angle of the vector in degrees.
     * @returns {number} The angle in degrees.
     */
    get degree(): number;
    /**
     * Computes the right-hand normal (perpendicular) vector.
     * @returns {this} The updated vector.
     */
    get toNormalRight(): this;
    /**
     * Computes the left-hand normal (perpendicular) vector.
     * @returns {this} The updated vector.
     */
    get toNormalLeft(): this;
    /**
     * Sets the angle of the vector in degrees.
     * @param {number} degree - The new angle in degrees.
     */
    set degree(degree: number);
    /**
     * Sets the angle of the vector in degrees.
     * @param {number} degree - The new angle in degrees.
     * @returns {this} The updated vector.
     */
    setDegree(degree: number): this;
    /**
     * Gets the magnitude (length) of the vector.
     * @returns {number} The vector's magnitude.
     */
    get magnitude(): number;
    /**
     * Alias for `magnitude`.
     * @returns {number} The vector's magnitude.
     */
    get length(): number;
    /**
     * Gets the squared magnitude of the vector.
     * Useful for performance optimization when the actual magnitude is not needed.
     * @returns {number} The squared magnitude.
     */
    get squareMagnitude(): number;
    /**
     * Computes the Euclidean distance from this vector to another vector.
     * @param {V2} v - The other vector.
     * @returns {number} The distance between the two vectors.
     */
    distance(v: V2): number;
    /**
     * Normalizes the vector to a unit vector (magnitude of 1).
     * @returns {V2} The normalized vector.
     */
    unitVec(): V2;
    /**
     * Adds another vector to this vector.
     * @param {V2} v - The vector to add.
     * @returns {this} The updated vector.
     */
    add(v: V2): this;
    /**
     * Adds a random offset to the vector within a specified range.
     * @param {number} rand - The maximum random deviation per axis.
     * @returns {this} The updated vector.
     */
    addRnd(rand: number): this;
    /**
     * Subtracts another vector from this vector.
     * @param {V2} v - The vector to subtract.
     * @returns {this} The updated vector.
     */
    subtract(v: V2): this;
    /**
     * Alias for `subtract()`.
     * @param {V2} v - The vector to subtract.
     * @returns {this} The updated vector.
     */
    sub(v: V2): this;
    /**
     * Multiplies this vector by a scalar.
     * @param {number} scalar - The scalar value.
     * @returns {this} The updated vector.
     */
    multiply(scalar: number): this;
    /**
     * Multiplies this vector component-wise with another vector.
     * @param {V2} v - The vector to multiply by.
     * @returns {this} The updated vector.
     */
    multVec(v: V2): this;
    /**
     * Divides this vector by a scalar.
     * @param {number} scalar - The scalar divisor.
     * @returns {this} The updated vector.
     */
    divide(scalar: number): this;
    /**
     * Computes the dot product with another vector.
     * @param {V2} v - The other vector.
     * @returns {number} The dot product.
     */
    dotprod(v: V2): number;
    /**
     * Alias for `dotprod()`.
     * @param {V2} v - The other vector.
     * @returns {number} The dot product.
     */
    dot(v: V2): number;
    /**
     * Computes the cross product with another vector.
     * @param {V2} v - The other vector.
     * @returns {number} The cross product (a scalar).
     */
    crossprod(v: V2): number;
    /**
     * Rotates this vector around the origin (0,0).
     * @param {number} angle - The rotation angle in radians.
     * @returns {this} The updated vector after rotation.
     */
    rotate(angle: number): this;
    /**
     * Rotates this vector around a given pivot point.
     * @param {V2} pivot - The pivot point around which the vector rotates.
     * @param {number} angleRad - The rotation angle in radians.
     * @returns {this} The updated vector after rotation.
     */
    rotateAroundPivot(pivot: V2, angleRad: number): this;
    /**
     * Computes the left-hand normal (perpendicular) of this vector.
     * The result is a vector rotated 90 degrees counterclockwise.
     * @returns {this} The updated vector.
     */
    toNormal(): this;
    /**
     * Computes the left-hand normal (perpendicular) of this vector.
     * The resulting vector is rotated 90 degrees counterclockwise.
     * @returns {V2} A new vector that is perpendicular to this vector.
     */
    normal(): V2;
    /**
     * Linearly interpolates between this vector and another vector.
     * @param {V2} v - The target vector.
     * @param {number} amt - The interpolation factor (0 to 1).
     * @returns {this} The updated vector after interpolation.
     */
    lerp(v: V2, amt: number): this;
    /**
     * Floors the values of the vector components (rounds down to nearest integer).
     * Uses bitwise OR to optimize performance.
     * @returns {this} The updated vector with floored values.
     */
    floorValues(): this;
    /**
     * Checks if this vector is inside a given polygon.
     * @param {V2[]} polygon - An array of vectors representing the polygon's vertices.
     * @returns {boolean} `true` if the vector is inside the polygon, otherwise `false`.
     */
    isInPolygon(polygon: V2[]): boolean;
}
export { v2, V2 };
