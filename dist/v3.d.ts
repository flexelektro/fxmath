export declare const v3: (x?: number, y?: number, z?: number) => V3;
export declare class V3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    /**
     * Linearly interpolates between two vectors.
     * @param {V3} v1 - First vector.
     * @param {V3} v2 - Second vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {V3} The interpolated vector.
     */
    static lerp(v1: V3, v2: V3, amt: number): V3;
    /**
     * Clones a vector.
     * @param {V3} v - The vector to clone.
     * @returns {V3} A new instance with the same values.
     */
    static clone(v: V3): V3;
    /**
     * Creates a zero vector (0, 0, 0).
     * @returns {V3} A zero vector.
     */
    static zero(): V3;
    /**
     * Creates an up vector (0, 1, 0).
     * @returns {V3} An up vector.
     */
    static up(): V3;
    /**
     * Creates a right vector (1, 0, 0).
     * @returns {V3} A right vector.
     */
    static right(): V3;
    /**
     * Creates a forward vector (0, 0, 1).
     * @returns {V3} A forward vector.
     */
    static forward(): V3;
    /**
     * Adds two vectors.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {V3} The resulting vector.
     */
    static add(a: V3, b: V3): V3;
    /**
     * Subtracts vector b from vector a.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {V3} The resulting vector.
     */
    static sub(a: V3, b: V3): V3;
    /**
     * Alias for `sub`.
     */
    static subtract(a: V3, b: V3): V3;
    /**
     * Multiplies a vector by a scalar.
     * @param {V3} v - The vector to multiply.
     * @param {number} factor - The scalar value.
     * @returns {V3} The scaled vector.
     */
    static mult(v: V3, factor: number): V3;
    /**
     * Alias for `mult`.
     */
    static multiply(v: V3, factor: number): V3;
    /**
     * Divides a vector by a scalar.
     * @param {V3} v - The vector to divide.
     * @param {number} n0 - The scalar divisor.
     * @returns {V3} The resulting vector.
     */
    static divide(v: V3, n0: number): V3;
    /**
     * Computes the cross product of two vectors.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {V3} The cross product vector.
     */
    static cross(a: V3, b: V3): V3;
    /**
     * Computes the dot product of two vectors.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {number} The dot product.
     */
    static dot(a: V3, b: V3): number;
    /**
     * Returns a vector with absolute values.
     * @param {V3} v - The vector.
     * @returns {V3} A new vector with absolute values.
     */
    static abs(v: V3): V3;
    /**
     * Returns the component-wise maximum of two vectors.
     * @param {V3} v1 - First vector.
     * @param {V3} v2 - Second vector.
     * @returns {V3} The component-wise maximum.
     */
    static max(v1: V3, v2: V3): V3;
    /**
     * Returns the component-wise minimum of two vectors.
     * @param {V3} v1 - First vector.
     * @param {V3} v2 - Second vector.
     * @returns {V3} The component-wise minimum.
     */
    static min(v1: V3, v2: V3): V3;
    /**
     * Returns the negated vector.
     * @param {V3} v - The vector to negate.
     * @returns {V3} The negated vector.
     */
    static negate(v: V3): V3;
    /**
     * Computes the magnitude (length) of a vector.
     * @param {V3} v - The vector.
     * @returns {number} The magnitude of the vector.
     */
    static magnitude(v: V3): number;
    /**
     * Computes the squared magnitude of a vector.
     * @param {V3} v - The vector.
     * @returns {number} The squared magnitude.
     */
    static squareMagnitude(v: V3): number;
    /**
     * Computes the distance between two vectors.
     * @param {V3} v1 - First vector.
     * @param {V3} v2 - Second vector.
     * @returns {number} The distance.
     */
    static distance(v1: V3, v2: V3): number;
    /**
     * Creates a vector from point A to point B.
     * @param {V3} a - The starting point.
     * @param {V3} b - The ending point.
     * @returns {V3} The resulting vector.
     */
    static fromTo(a: V3, b: V3): V3;
    /**
     * Checks if two vectors are identical.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {boolean} True if identical.
     */
    static sameLike(a: V3, b: V3): boolean;
    /**
     * Computes the angle between two vectors.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {number} The angle in radians.
     */
    static angleBetween(a: V3, b: V3): number;
    /**
     * Normalizes a vector to unit length.
     * @param {V3} v - The vector to normalize.
     * @returns {V3} The unit vector.
     */
    static unitVec(v: V3): V3;
    /**
     * Projects vector v1 onto vector v2.
     * @param {V3} v1 - The vector to project.
     * @param {V3} v2 - The vector to project onto.
     * @returns {V3} The projected vector.
     */
    static project(v1: V3, v2: V3): V3;
    /**
     * Reflects a vector across a normal.
     * @param {V3} v - The vector to reflect.
     * @param {V3} normal - The normal vector.
     * @returns {V3} The reflected vector.
     */
    static reflect(v: V3, normal: V3): V3;
    /**
     * Transforms a vector by a 4x4 matrix with perspective division.
     * @param {V3} v - The vector to transform.
     * @param {Matrix4} mat - The transformation matrix.
     * @returns {V3} The transformed vector.
     */
    static transformCoordinates(v: V3, mat: Matrix4): V3;
    /**
     * Multiplies a vector by a 4x4 matrix without perspective division.
     * @param {V3} v - The vector to transform.
     * @param {Matrix4} mat - The transformation matrix.
     * @returns {V3} The transformed vector.
     */
    static multiplyWithMatrix(v: V3, mat: Matrix4): V3;
    /**
     * Sets all components to zero.
     * @returns {V3} This vector.
     */
    zero(): V3;
    /**
     * Creates a copy of this vector.
     * @returns {V3} A new vector with the same values.
     */
    clone(): V3;
    /**
     * Sets all components to their absolute values.
     * @returns {V3} This vector.
     */
    abs(): V3;
    /**
     * Adds another vector to this vector.
     * @param {V3} v - The vector to add.
     * @returns {V3} This vector.
     */
    add(v: V3): V3;
    /**
     * Sets this vector to the component-wise maximum with another vector.
     * @param {V3} v2 - The other vector.
     * @returns {V3} This vector.
     */
    max(v2: V3): V3;
    /**
     * Sets this vector to the component-wise minimum with another vector.
     * @param {V3} v2 - The other vector.
     * @returns {V3} This vector.
     */
    min(v2: V3): V3;
    /**
     * Subtracts another vector from this vector.
     * @param {V3} v - The vector to subtract.
     * @returns {V3} This vector.
     */
    sub(v: V3): V3;
    /**
     * Alias for `sub`.
     */
    subtract(v: V3): V3;
    /**
     * Multiplies this vector by a scalar.
     * @param {number} n - The scalar value.
     * @returns {V3} This vector.
     */
    mult(n: number): V3;
    /**
     * Alias for `mult`.
     */
    multiply(n: number): V3;
    /**
     * Divides this vector by a scalar.
     * @param {number} n0 - The scalar divisor.
     * @returns {V3} This vector.
     */
    divide(n0: number): V3;
    /**
     * Computes the dot product with another vector.
     * @param {V3} v - The other vector.
     * @returns {number} The dot product.
     */
    dot(v: V3): number;
    /**
     * Alias for `dot`.
     */
    dotProd(v: V3): number;
    /**
     * Computes the cross product with another vector.
     * @param {V3} b - The other vector.
     * @returns {V3} A new vector representing the cross product.
     */
    cross(b: V3): V3;
    /**
     * Alias for `cross`.
     */
    crossProd(b: V3): V3;
    /**
     * Returns the squared length of this vector.
     * @returns {number} The squared length.
     */
    lengthSq(): number;
    /**
     * Returns the length (magnitude) of this vector.
     * @returns {number} The length.
     */
    length(): number;
    /**
     * Alias for `length`.
     */
    magnitude(): number;
    /**
     * Normalizes this vector to unit length.
     * @returns {V3} This vector.
     */
    normalize(): V3;
    /**
     * Alias for `normalize`.
     */
    unitVector(): V3;
    /**
     * Negates this vector.
     * @returns {V3} This vector.
     */
    negate(): V3;
    /**
     * Computes the distance to another vector.
     * @param {V3} v - The other vector.
     * @returns {number} The distance.
     */
    distance(v: V3): number;
    /**
     * Checks if this vector is identical to another.
     * @param {V3} v - The other vector.
     * @returns {boolean} True if identical.
     */
    sameLike(v: V3): boolean;
    /**
     * Linearly interpolates this vector towards another.
     * @param {V3} v - The target vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {V3} This vector.
     */
    lerp(v: V3, amt: number): V3;
    /**
     * Floors all components using bitwise OR.
     * @returns {V3} This vector.
     */
    floorValues(): V3;
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
export declare class Matrix4 {
    m: number[];
    constructor();
    determinant(): number;
    toArray(): any[];
    invert(): void;
    multiply(other: Matrix4): Matrix4;
    equals(value: Matrix4): boolean;
    static fromValues(initialM11: number, initialM12: number, initialM13: number, initialM14: number, initialM21: number, initialM22: number, initialM23: number, initialM24: number, initialM31: number, initialM32: number, initialM33: number, initialM34: number, initialM41: number, initialM42: number, initialM43: number, initialM44: number): Matrix4;
    static identity(): Matrix4;
    static zero(): Matrix4;
    static copy(source: Matrix4): Matrix4;
    static rotationX(angle: number): Matrix4;
    static rotationY(angle: number): Matrix4;
    static rotationZ(angle: number): Matrix4;
    static rotationAxis(axis: V3, angle: number): Matrix4;
    static rotationYawPitchRoll(yaw: number, pitch: number, roll: number): Matrix4;
    static scaling(x: number, y: number, z: number): Matrix4;
    static translation(x: number, y: number, z: number): Matrix4;
    static lookAtLH(eye: V3, target: V3, up: V3): Matrix4;
    static orthoLH(left: number, right: number, top: number, bottom: number, znear: number, zfar: number): Matrix4;
    static perspectiveFovLH(fov: number, aspect: number, znear: number, zfar: number): Matrix4;
    static perspectiveFovLHToRef(fov: number, aspect: number, znear: number, zfar: number, isVerticalFovFixed?: boolean, halfZRange?: boolean, projectionPlaneTilt?: number, reverseDepthBufferMode?: boolean): Matrix4;
    static transpose(mat: Matrix4): Matrix4;
}
