import {rnd,lerp} from "./common";


const v2 = (x: number, y: number) => {
  return new V2(x, y)
}

class V2{
  public x: number;
  public y: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }

  /**
   * Creates a vector from point A to point B.
   * @param {V2} a - The starting point.
   * @param {V2} b - The ending point.
   * @returns {V2} The resulting vector.
   */
  public static fromTo(a: V2, b: V2): V2 {
    return v2(b.x - a.x, b.y - a.y);
  }

  /**
   * Checks if two vectors are identical.
   * @param {V2} a - First vector.
   * @param {V2} b - Second vector.
   * @returns {boolean} `true` if the vectors are the same, otherwise `false`.
   */
  public static sameLike(a: V2, b: V2): boolean {
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
  public static linesIntersect(pA: V2, pA2: V2, pB: V2, pB2: V2): V2 | false {
    let denominator =
        (pB2.y - pB.y) * (pA2.x - pA.x) - (pB2.x - pB.x) * (pA2.y - pA.y);

    if (denominator === 0) return false; // Parallel lines

    let ua =
        ((pB2.x - pB.x) * (pA.y - pB.y) - (pB2.y - pB.y) * (pA.x - pB.x)) /
        denominator;
    let ub =
        ((pA2.x - pA.x) * (pA.y - pB.y) - (pA2.y - pA.y) * (pA.x - pB.x)) /
        denominator;

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return false;

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
  public static isPointInPolygon(p: V2, polygon: V2[]): boolean {
    let len = polygon.length;
    let inside = false;
    for (let i = 0, j = len - 1; i < len; j = i++) {
      if (
          (polygon[i].y > p.y) !== (polygon[j].y > p.y) &&
          p.x <
          ((polygon[j].x - polygon[i].x) * (p.y - polygon[i].y)) /
          (polygon[j].y - polygon[i].y) +
          polygon[i].x
      ) {
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
  public static create(x: number, y: number): V2 {
    return new V2(x, y);
  }

  /**
   * Creates a vector using a magnitude and an angle.
   * @param {number} mag - The magnitude (length) of the vector.
   * @param {number} angle - The angle in radians.
   * @returns {V2} The resulting vector.
   */
  public static createByMagnitudeAndAngle(mag: number, angle: number): V2 {
    return new V2(mag * Math.cos(angle), mag * Math.sin(angle));
  }

  /**
   * Computes the angle of a vector in radians.
   * @param {V2} v - The vector.
   * @returns {number} The angle in radians.
   */
  public static getAngle(v: V2): number {
    return Math.atan2(v.y, v.x);
  }

  /**
   * Calculates the angle between two vectors.
   * @param {V2} a - First vector.
   * @param {V2} b - Second vector.
   * @returns {number} The angle in radians.
   */
  public static angleBetween(a: V2, b: V2): number {
    return Math.acos(V2.dotprod(a, b) / (a.magnitude * b.magnitude));
  }

  /**
   * Clones a vector.
   * @param {V2} v - The vector to clone.
   * @returns {V2} A new instance with the same values.
   */
  public static clone(v: V2): V2 {
    return new V2(v.x, v.y);
  }

  /**
   * Computes the magnitude (length) of a vector.
   * @param {V2} v - The vector.
   * @returns {number} The magnitude of the vector.
   */
  public static magnitude(v: V2): number {
    return v.magnitude;
  }

  /**
   * Computes the squared magnitude of a vector (avoiding square root for performance).
   * @param {V2} v - The vector.
   * @returns {number} The squared magnitude.
   */
  public static squareMagnitude(v: V2): number {
    return v.squareMagnitude;
  }

  /**
   * Computes the distance between two vectors.
   * @param {V2} v1 - First vector.
   * @param {V2} v2 - Second vector.
   * @returns {number} The distance between `v1` and `v2`.
   */
  public static distance(v1: V2, v2: V2): number {
    return V2.subtract(v1, v2).magnitude;
  }

  /**
   * Adds two vectors.
   * @param {V2} v1 - First vector.
   * @param {V2} v2 - Second vector.
   * @returns {V2} The resulting vector.
   */
  public static add(v1: V2, v2: V2): V2 {
    return new V2(v1.x + v2.x, v1.y + v2.y);
  }

  /**
   * Subtracts one vector from another.
   * @param {V2} v1 - The vector to subtract from.
   * @param {V2} v2 - The vector to subtract.
   * @returns {V2} The resulting vector.
   */
  public static subtract(v1: V2, v2: V2): V2 {
    return new V2(v1.x - v2.x, v1.y - v2.y);
  }

  /**
   * Alias for `subtract`.
   * @param {V2} v1 - The vector to subtract from.
   * @param {V2} v2 - The vector to subtract.
   * @returns {V2} The resulting vector.
   */
  public static sub(v1: V2, v2: V2): V2 {
    return V2.subtract(v1, v2);
  }

  /**
   * Multiplies a vector by a scalar.
   * @param {V2} vector - The vector to multiply.
   * @param {number} scalar - The scalar value.
   * @returns {V2} The scaled vector.
   */
  public static multiply(vector: V2, scalar: number): V2 {
    return new V2(vector.x * scalar, vector.y * scalar);
  }

  /**
   * Multiplies two vectors component-wise. (Hadamard-Produkt)
   * @param {V2} v0 - First vector.
   * @param {V2} v1 - Second vector.
   * @returns {V2} The resulting vector.
   */
  public static multVec(v0: V2, v1: V2): V2 {
    return new V2(v0.x * v1.x, v0.y * v1.y);
  }

  /**
   * Divides a vector by a scalar.
   * @param {V2} v - The vector to divide.
   * @param {number} scalar - The scalar value.
   * @returns {V2} The resulting vector.
   */
  public static divide(v: V2, scalar: number): V2 {
    return V2.multiply(v, 1 / scalar);
  }

  /**
   * Computes the dot product of two vectors.
   * @param {V2} v1 - First vector.
   * @param {V2} v2 - Second vector.
   * @returns {number} The dot product.
   */
  public static dotprod(v1: V2, v2: V2): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  /**
   * Alias for `dotprod`.
   * @param {V2} v1 - First vector.
   * @param {V2} v2 - Second vector.
   * @returns {number} The dot product.
   */
  public static dot(v1: V2, v2: V2): number {
    return V2.dotprod(v1, v2);
  }

  /**
   * Computes the cross product of two vectors.
   * @param {V2} v1 - First vector.
   * @param {V2} v2 - Second vector.
   * @returns {number} The cross product (a scalar value).
   */
  public static crossprod(v1: V2, v2: V2): number {
    return v1.x * v2.y - v1.y * v2.x;
  }

  /**
   * Returns the unit vector (normalized) of a given vector.
   * @param {V2} v - The vector to normalize.
   * @returns {V2} The unit vector.
   */
  public static unitVec(v: V2): V2 {
    return V2.divide(v, v.magnitude);
  }

  /**
   * Projects vector `v1` onto vector `v2`.
   * @param {V2} v1 - The vector to be projected.
   * @param {V2} v2 - The vector onto which `v1` is projected.
   * @returns {V2} The projected vector.
   */
  public static projectionFromTo(v1: V2, v2: V2): V2 {
    let unitVector = V2.unitVec(v2);
    return V2.multiply(unitVector, V2.dotprod(v1, unitVector));
  }

  /**
   * Rotates a vector around the origin.
   * @param {V2} v - The vector to rotate.
   * @param {number} angle - The rotation angle in radians.
   * @returns {V2} The rotated vector.
   */
  public static rotate(v: V2, angle: number): V2 {
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
  public static rotateAroundPivot(point: V2, pivot: V2, angleRad: number): V2 {
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const dx = point.x - pivot.x;
    const dy = point.y - pivot.y;

    return new V2(
        cos * dx - sin * dy + pivot.x,
        sin * dx + cos * dy + pivot.y
    );
  }

  /**
   * Computes the left normal of a vector.
   * @param {V2} v - The vector.
   * @returns {V2} The left normal vector.
   */
  public static normalLeft(v: V2): V2 {
    return new V2(-v.y, v.x);
  }

  /**
   * Computes the right normal of a vector.
   * @param {V2} v - The vector.
   * @returns {V2} The right normal vector.
   */
  public static normalRight(v: V2): V2 {
    return new V2(v.y, -v.x);
  }

  /**
   * Computes the Manhattan distance between two vectors.
   * @param {V2} v1 - First vector.
   * @param {V2} v2 - Second vector.
   * @returns {number} The Manhattan distance.
   */
  public static manhattanDistance(v1: V2, v2: V2): number {
    return Math.abs(v1.x - v2.x) + Math.abs(v1.y - v2.y);
  }

  /**
   * Linearly interpolates between two vectors.
   * @param {V2} v1 - First vector.
   * @param {V2} v2 - Second vector.
   * @param {number} amt - Interpolation amount (0 to 1).
   * @returns {V2} The interpolated vector.
   */
  public static lerp(v1: V2, v2: V2, amt: number): V2 {
    return new V2(
        lerp(v1.x, v2.x, amt),
        lerp(v1.y, v2.y, amt)
    );
  }

  /**
   * Creates a new copy of this vector.
   * @returns {V2} A new V2 instance with the same coordinates.
   */
  public clone(): V2 {
    return new V2(this.x, this.y);
  }

  /**
   * Checks if this vector is identical to another vector.
   * @param {V2} v - The vector to compare with.
   * @returns {boolean} `true` if both vectors have the same coordinates, otherwise `false`.
   */
  public sameLike(v: V2): boolean {
    return this.x === v.x && this.y === v.y;
  }

  /**
   * Alias for `clone()`.
   * @returns {V2} A new V2 instance with the same coordinates.
   */
  public copy(): V2 {
    return this.clone();
  }

  /**
   * Gets the angle of the vector in radians.
   * @returns {number} The angle in radians.
   */
  public get angle(): number {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Sets the angle of the vector while keeping its magnitude.
   * @param {number} rad - The new angle in radians.
   */
  public set angle(rad: number) {
    let mag = this.magnitude;
    this.x = mag * Math.cos(rad);
    this.y = mag * Math.sin(rad);
  }

  /**
   * Sets the angle of the vector while keeping its magnitude.
   * @param {number} rad - The new angle in radians.
   * @returns {this} The updated vector.
   */
  public setAngle(rad: number): this {
    let mag = this.magnitude;
    this.x = mag * Math.cos(rad);
    this.y = mag * Math.sin(rad);
    return this;
  }

  /**
   * Gets the angle of the vector in degrees.
   * @returns {number} The angle in degrees.
   */
  public get degree(): number {
    return (360 / (2 * Math.PI)) * Math.atan2(this.y, this.x);
  }

  /**
   * Computes the right-hand normal (perpendicular) vector.
   * @returns {this} The updated vector.
   */
  public get toNormalRight(): this {
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
  public get toNormalLeft(): this {
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
  public set degree(degree: number) {
    let rad = (Math.PI * 2 / 360) * degree;
    this.setAngle(rad);
  }

  /**
   * Sets the angle of the vector in degrees.
   * @param {number} degree - The new angle in degrees.
   * @returns {this} The updated vector.
   */
  public setDegree(degree: number): this {
    let rad = (Math.PI * 2 / 360) * degree;
    return this.setAngle(rad);
  }

  /**
   * Gets the magnitude (length) of the vector.
   * @returns {number} The vector's magnitude.
   */
  public get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Alias for `magnitude`.
   * @returns {number} The vector's magnitude.
   */
  public get length(): number {
    return this.magnitude;
  }

  /**
   * Gets the squared magnitude of the vector.
   * Useful for performance optimization when the actual magnitude is not needed.
   * @returns {number} The squared magnitude.
   */
  public get squareMagnitude(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Computes the Euclidean distance from this vector to another vector.
   * @param {V2} v - The other vector.
   * @returns {number} The distance between the two vectors.
   */
  public distance(v: V2): number {
    return V2.subtract(this, v).magnitude;
  }

  /**
   * Normalizes the vector to a unit vector (magnitude of 1).
   * @returns {V2} The normalized vector.
   */
  public unitVec(): V2 {
    return this.divide(this.magnitude);
  }

  /**
   * Adds another vector to this vector.
   * @param {V2} v - The vector to add.
   * @returns {this} The updated vector.
   */
  public add(v: V2): this {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /**
   * Adds a random offset to the vector within a specified range.
   * @param {number} rand - The maximum random deviation per axis.
   * @returns {this} The updated vector.
   */
  public addRnd(rand: number): this {
    this.x += rnd(-rand, rand);
    this.y += rnd(-rand, rand);
    return this;
  }

  /**
   * Subtracts another vector from this vector.
   * @param {V2} v - The vector to subtract.
   * @returns {this} The updated vector.
   */
  public subtract(v: V2): this {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /**
   * Alias for `subtract()`.
   * @param {V2} v - The vector to subtract.
   * @returns {this} The updated vector.
   */
  public sub(v: V2): this {
    return this.subtract(v);
  }

  /**
   * Multiplies this vector by a scalar.
   * @param {number} scalar - The scalar value.
   * @returns {this} The updated vector.
   */
  public multiply(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   * Multiplies this vector component-wise with another vector.
   * @param {V2} v - The vector to multiply by.
   * @returns {this} The updated vector.
   */
  public multVec(v: V2): this {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  /**
   * Divides this vector by a scalar.
   * @param {number} scalar - The scalar divisor.
   * @returns {this} The updated vector.
   */
  public divide(scalar: number): this {
    return this.multiply(1 / scalar);
  }

  /**
   * Computes the dot product with another vector.
   * @param {V2} v - The other vector.
   * @returns {number} The dot product.
   */
  public dotprod(v: V2): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Alias for `dotprod()`.
   * @param {V2} v - The other vector.
   * @returns {number} The dot product.
   */
  public dot(v: V2): number {
    return this.dotprod(v)
  }

  /**
   * Computes the cross product with another vector.
   * @param {V2} v - The other vector.
   * @returns {number} The cross product (a scalar).
   */
  public crossprod(v: V2): number {
    return this.x * v.y - this.y * v.x;
  }


  /**
   * Rotates this vector around the origin (0,0).
   * @param {number} angle - The rotation angle in radians.
   * @returns {this} The updated vector after rotation.
   */
  public rotate(angle: number): this {
    return this.rotateAroundPivot(v2(0, 0), angle);
  }


  /**
   * Rotates this vector around a given pivot point.
   * @param {V2} pivot - The pivot point around which the vector rotates.
   * @param {number} angleRad - The rotation angle in radians.
   * @returns {this} The updated vector after rotation.
   */
  public rotateAroundPivot(pivot: V2, angleRad: number): this {
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
  public toNormal(): this {
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
  public normal(): V2 {
    return new V2(-this.y, this.x);
  }

  /**
   * Linearly interpolates between this vector and another vector.
   * @param {V2} v - The target vector.
   * @param {number} amt - The interpolation factor (0 to 1).
   * @returns {this} The updated vector after interpolation.
   */
  public lerp(v: V2, amt: number): this {
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
  public floorValues(): this {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  /**
   * Checks if this vector is inside a given polygon.
   * @param {V2[]} polygon - An array of vectors representing the polygon's vertices.
   * @returns {boolean} `true` if the vector is inside the polygon, otherwise `false`.
   */
  public isInPolygon(polygon: V2[]): boolean {
    return V2.isPointInPolygon(this, polygon);
  }

}

export { v2,V2 }

