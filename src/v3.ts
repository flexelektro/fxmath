import {
    vec3Add, vec3Sub, vec3Mult, vec3Div, vec3Dot, vec3Cross,
    vec3Mag, vec3SquareMag, vec3Normalize, vec3Abs, vec3Max, vec3Min,
    vec3Lerp, vec3Floor, vec3AngleXY, vec3Distance, vec3FromTo,
    vec3TransformCoordinates, vec3MultiplyWithMatrix, vec3AngleBetween,
    vec3SameLike, vec3Negate, vec3Project, vec3Reflect, IVec3
} from "./vec3core";

export const v3 = (x: number = 0, y: number = 0, z: number = 0) => {
    return new V3(x, y, z);
}

export class V3 {
    public x: number;
    public y: number;
    public z: number;

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
     * @param {V3} v1 - First vector.
     * @param {V3} v2 - Second vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {V3} The interpolated vector.
     */
    static lerp(v1: V3, v2: V3, amt: number): V3 {
        const r = vec3Lerp(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, amt);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Clones a vector.
     * @param {V3} v - The vector to clone.
     * @returns {V3} A new instance with the same values.
     */
    static clone(v: V3): V3 {
        return new V3(v.x, v.y, v.z);
    }

    /**
     * Creates a zero vector (0, 0, 0).
     * @returns {V3} A zero vector.
     */
    static zero(): V3 {
        return new V3(0, 0, 0);
    }

    /**
     * Creates an up vector (0, 1, 0).
     * @returns {V3} An up vector.
     */
    static up(): V3 {
        return new V3(0, 1.0, 0);
    }

    /**
     * Creates a right vector (1, 0, 0).
     * @returns {V3} A right vector.
     */
    static right(): V3 {
        return new V3(1.0, 0, 0);
    }

    /**
     * Creates a forward vector (0, 0, 1).
     * @returns {V3} A forward vector.
     */
    static forward(): V3 {
        return new V3(0, 0, 1.0);
    }

    /**
     * Adds two vectors.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {V3} The resulting vector.
     */
    static add(a: V3, b: V3): V3 {
        const r = vec3Add(a.x, a.y, a.z, b.x, b.y, b.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Subtracts vector b from vector a.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {V3} The resulting vector.
     */
    static sub(a: V3, b: V3): V3 {
        const r = vec3Sub(a.x, a.y, a.z, b.x, b.y, b.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Alias for `sub`.
     */
    static subtract(a: V3, b: V3): V3 {
        return V3.sub(a, b);
    }

    /**
     * Multiplies a vector by a scalar.
     * @param {V3} v - The vector to multiply.
     * @param {number} factor - The scalar value.
     * @returns {V3} The scaled vector.
     */
    static mult(v: V3, factor: number): V3 {
        const r = vec3Mult(v.x, v.y, v.z, factor);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Alias for `mult`.
     */
    static multiply(v: V3, factor: number): V3 {
        return V3.mult(v, factor);
    }

    /**
     * Divides a vector by a scalar.
     * @param {V3} v - The vector to divide.
     * @param {number} n0 - The scalar divisor.
     * @returns {V3} The resulting vector.
     */
    static divide(v: V3, n0: number): V3 {
        const r = vec3Div(v.x, v.y, v.z, n0);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Computes the cross product of two vectors.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {V3} The cross product vector.
     */
    static cross(a: V3, b: V3): V3 {
        const r = vec3Cross(a.x, a.y, a.z, b.x, b.y, b.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Computes the dot product of two vectors.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {number} The dot product.
     */
    static dot(a: V3, b: V3): number {
        return vec3Dot(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    /**
     * Returns a vector with absolute values.
     * @param {V3} v - The vector.
     * @returns {V3} A new vector with absolute values.
     */
    static abs(v: V3): V3 {
        const r = vec3Abs(v.x, v.y, v.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Returns the component-wise maximum of two vectors.
     * @param {V3} v1 - First vector.
     * @param {V3} v2 - Second vector.
     * @returns {V3} The component-wise maximum.
     */
    static max(v1: V3, v2: V3): V3 {
        const r = vec3Max(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Returns the component-wise minimum of two vectors.
     * @param {V3} v1 - First vector.
     * @param {V3} v2 - Second vector.
     * @returns {V3} The component-wise minimum.
     */
    static min(v1: V3, v2: V3): V3 {
        const r = vec3Min(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Returns the negated vector.
     * @param {V3} v - The vector to negate.
     * @returns {V3} The negated vector.
     */
    static negate(v: V3): V3 {
        const r = vec3Negate(v.x, v.y, v.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Computes the magnitude (length) of a vector.
     * @param {V3} v - The vector.
     * @returns {number} The magnitude of the vector.
     */
    static magnitude(v: V3): number {
        return vec3Mag(v.x, v.y, v.z);
    }

    /**
     * Computes the squared magnitude of a vector.
     * @param {V3} v - The vector.
     * @returns {number} The squared magnitude.
     */
    static squareMagnitude(v: V3): number {
        return vec3SquareMag(v.x, v.y, v.z);
    }

    /**
     * Computes the distance between two vectors.
     * @param {V3} v1 - First vector.
     * @param {V3} v2 - Second vector.
     * @returns {number} The distance.
     */
    static distance(v1: V3, v2: V3): number {
        return vec3Distance(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    }

    /**
     * Creates a vector from point A to point B.
     * @param {V3} a - The starting point.
     * @param {V3} b - The ending point.
     * @returns {V3} The resulting vector.
     */
    static fromTo(a: V3, b: V3): V3 {
        const r = vec3FromTo(a.x, a.y, a.z, b.x, b.y, b.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Checks if two vectors are identical.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {boolean} True if identical.
     */
    static sameLike(a: V3, b: V3): boolean {
        return vec3SameLike(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    /**
     * Computes the angle between two vectors.
     * @param {V3} a - First vector.
     * @param {V3} b - Second vector.
     * @returns {number} The angle in radians.
     */
    static angleBetween(a: V3, b: V3): number {
        return vec3AngleBetween(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    /**
     * Normalizes a vector to unit length.
     * @param {V3} v - The vector to normalize.
     * @returns {V3} The unit vector.
     */
    static unitVec(v: V3): V3 {
        const r = vec3Normalize(v.x, v.y, v.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Projects vector v1 onto vector v2.
     * @param {V3} v1 - The vector to project.
     * @param {V3} v2 - The vector to project onto.
     * @returns {V3} The projected vector.
     */
    static project(v1: V3, v2: V3): V3 {
        const r = vec3Project(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Reflects a vector across a normal.
     * @param {V3} v - The vector to reflect.
     * @param {V3} normal - The normal vector.
     * @returns {V3} The reflected vector.
     */
    static reflect(v: V3, normal: V3): V3 {
        const r = vec3Reflect(v.x, v.y, v.z, normal.x, normal.y, normal.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Transforms a vector by a 4x4 matrix with perspective division.
     * @param {V3} v - The vector to transform.
     * @param {Matrix4} mat - The transformation matrix.
     * @returns {V3} The transformed vector.
     */
    static transformCoordinates(v: V3, mat: Matrix4): V3 {
        const r = vec3TransformCoordinates(v.x, v.y, v.z, mat.m);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Multiplies a vector by a 4x4 matrix without perspective division.
     * @param {V3} v - The vector to transform.
     * @param {Matrix4} mat - The transformation matrix.
     * @returns {V3} The transformed vector.
     */
    static multiplyWithMatrix(v: V3, mat: Matrix4): V3 {
        const r = vec3MultiplyWithMatrix(v.x, v.y, v.z, mat.m);
        return new V3(r.x, r.y, r.z);
    }

    // ============================================================================
    // INSTANCE METHODS
    // ============================================================================

    /**
     * Sets all components to zero.
     * @returns {V3} This vector.
     */
    zero(): V3 {
        this.x = this.y = this.z = 0;
        return this;
    }

    /**
     * Creates a copy of this vector.
     * @returns {V3} A new vector with the same values.
     */
    clone(): V3 {
        return new V3(this.x, this.y, this.z);
    }

    /**
     * Sets all components to their absolute values.
     * @returns {V3} This vector.
     */
    abs(): V3 {
        const r = vec3Abs(this.x, this.y, this.z);
        this.x = r.x;
        this.y = r.y;
        this.z = r.z;
        return this;
    }

    /**
     * Adds another vector to this vector.
     * @param {V3} v - The vector to add.
     * @returns {V3} This vector.
     */
    add(v: V3): V3 {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    /**
     * Sets this vector to the component-wise maximum with another vector.
     * @param {V3} v2 - The other vector.
     * @returns {V3} This vector.
     */
    max(v2: V3): V3 {
        const r = vec3Max(this.x, this.y, this.z, v2.x, v2.y, v2.z);
        this.x = r.x;
        this.y = r.y;
        this.z = r.z;
        return this;
    }

    /**
     * Sets this vector to the component-wise minimum with another vector.
     * @param {V3} v2 - The other vector.
     * @returns {V3} This vector.
     */
    min(v2: V3): V3 {
        const r = vec3Min(this.x, this.y, this.z, v2.x, v2.y, v2.z);
        this.x = r.x;
        this.y = r.y;
        this.z = r.z;
        return this;
    }

    /**
     * Subtracts another vector from this vector.
     * @param {V3} v - The vector to subtract.
     * @returns {V3} This vector.
     */
    sub(v: V3): V3 {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    /**
     * Alias for `sub`.
     */
    subtract(v: V3): V3 {
        return this.sub(v);
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} n - The scalar value.
     * @returns {V3} This vector.
     */
    mult(n: number): V3 {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    }

    /**
     * Alias for `mult`.
     */
    multiply(n: number): V3 {
        return this.mult(n);
    }

    /**
     * Divides this vector by a scalar.
     * @param {number} n0 - The scalar divisor.
     * @returns {V3} This vector.
     */
    public divide(n0: number): V3 {
        const n = 1 / n0;
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    }

    /**
     * Computes the dot product with another vector.
     * @param {V3} v - The other vector.
     * @returns {number} The dot product.
     */
    dot(v: V3): number {
        return vec3Dot(this.x, this.y, this.z, v.x, v.y, v.z);
    }

    /**
     * Alias for `dot`.
     */
    dotProd(v: V3): number {
        return this.dot(v);
    }

    /**
     * Computes the cross product with another vector.
     * @param {V3} b - The other vector.
     * @returns {V3} A new vector representing the cross product.
     */
    cross(b: V3): V3 {
        const r = vec3Cross(this.x, this.y, this.z, b.x, b.y, b.z);
        return new V3(r.x, r.y, r.z);
    }

    /**
     * Alias for `cross`.
     */
    crossProd(b: V3): V3 {
        return this.cross(b);
    }

    /**
     * Returns the squared length of this vector.
     * @returns {number} The squared length.
     */
    lengthSq(): number {
        return vec3SquareMag(this.x, this.y, this.z);
    }

    /**
     * Returns the length (magnitude) of this vector.
     * @returns {number} The length.
     */
    length(): number {
        return vec3Mag(this.x, this.y, this.z);
    }

    /**
     * Alias for `length`.
     */
    magnitude(): number {
        return this.length();
    }

    /**
     * Normalizes this vector to unit length.
     * @returns {V3} This vector.
     */
    normalize(): V3 {
        return this.divide(this.length() || 1);
    }

    /**
     * Alias for `normalize`.
     */
    unitVector(): V3 {
        return this.normalize();
    }

    /**
     * Negates this vector.
     * @returns {V3} This vector.
     */
    negate(): V3 {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    /**
     * Computes the distance to another vector.
     * @param {V3} v - The other vector.
     * @returns {number} The distance.
     */
    distance(v: V3): number {
        return vec3Distance(this.x, this.y, this.z, v.x, v.y, v.z);
    }

    /**
     * Checks if this vector is identical to another.
     * @param {V3} v - The other vector.
     * @returns {boolean} True if identical.
     */
    sameLike(v: V3): boolean {
        return vec3SameLike(this.x, this.y, this.z, v.x, v.y, v.z);
    }

    /**
     * Linearly interpolates this vector towards another.
     * @param {V3} v - The target vector.
     * @param {number} amt - Interpolation amount (0 to 1).
     * @returns {V3} This vector.
     */
    lerp(v: V3, amt: number): V3 {
        const r = vec3Lerp(this.x, this.y, this.z, v.x, v.y, v.z, amt);
        this.x = r.x;
        this.y = r.y;
        this.z = r.z;
        return this;
    }

    /**
     * Floors all components using bitwise OR.
     * @returns {V3} This vector.
     */
    floorValues(): V3 {
        this.x = this.x | 0;
        this.y = this.y | 0;
        this.z = this.z | 0;
        return this;
    }

    /**
     * Returns the angle in the XY plane.
     * @returns {number} The angle in radians.
     */
    angleXY(): number {
        return vec3AngleXY(this.x, this.y);
    }

    /**
     * Converts this vector to an array.
     * @returns {number[]} An array [x, y, z].
     */
    toArray(): number[] {
        return [this.x, this.y, this.z];
    }
}

export class Matrix4 {
    m: number[];

    constructor() {
        this.m = [];
    }


    public determinant(): number {
        var temp1 = (this.m[10] * this.m[15]) - (this.m[11] * this.m[14]);
        var temp2 = (this.m[9] * this.m[15]) - (this.m[11] * this.m[13]);
        var temp3 = (this.m[9] * this.m[14]) - (this.m[10] * this.m[13]);
        var temp4 = (this.m[8] * this.m[15]) - (this.m[11] * this.m[12]);
        var temp5 = (this.m[8] * this.m[14]) - (this.m[10] * this.m[12]);
        var temp6 = (this.m[8] * this.m[13]) - (this.m[9] * this.m[12]);
        return ((((this.m[0] * (((this.m[5] * temp1) - (this.m[6] * temp2)) + (this.m[7] * temp3))) - (this.m[1] * (((this.m[4] * temp1) - (this.m[6] * temp4)) + (this.m[7] * temp5)))) + (this.m[2] * (((this.m[4] * temp2) - (this.m[5] * temp4)) + (this.m[7] * temp6)))) - (this.m[3] * (((this.m[4] * temp3) - (this.m[5] * temp5)) + (this.m[6] * temp6))));
    }

    public toArray(): any[] {
        return this.m;
    }

    public invert(): void {
        var l1 = this.m[0];
        var l2 = this.m[1];
        var l3 = this.m[2];
        var l4 = this.m[3];
        var l5 = this.m[4];
        var l6 = this.m[5];
        var l7 = this.m[6];
        var l8 = this.m[7];
        var l9 = this.m[8];
        var l10 = this.m[9];
        var l11 = this.m[10];
        var l12 = this.m[11];
        var l13 = this.m[12];
        var l14 = this.m[13];
        var l15 = this.m[14];
        var l16 = this.m[15];
        var l17 = (l11 * l16) - (l12 * l15);
        var l18 = (l10 * l16) - (l12 * l14);
        var l19 = (l10 * l15) - (l11 * l14);
        var l20 = (l9 * l16) - (l12 * l13);
        var l21 = (l9 * l15) - (l11 * l13);
        var l22 = (l9 * l14) - (l10 * l13);
        var l23 = ((l6 * l17) - (l7 * l18)) + (l8 * l19);
        var l24 = -(((l5 * l17) - (l7 * l20)) + (l8 * l21));
        var l25 = ((l5 * l18) - (l6 * l20)) + (l8 * l22);
        var l26 = -(((l5 * l19) - (l6 * l21)) + (l7 * l22));
        var l27 = 1.0 / ((((l1 * l23) + (l2 * l24)) + (l3 * l25)) + (l4 * l26));
        var l28 = (l7 * l16) - (l8 * l15);
        var l29 = (l6 * l16) - (l8 * l14);
        var l30 = (l6 * l15) - (l7 * l14);
        var l31 = (l5 * l16) - (l8 * l13);
        var l32 = (l5 * l15) - (l7 * l13);
        var l33 = (l5 * l14) - (l6 * l13);
        var l34 = (l7 * l12) - (l8 * l11);
        var l35 = (l6 * l12) - (l8 * l10);
        var l36 = (l6 * l11) - (l7 * l10);
        var l37 = (l5 * l12) - (l8 * l9);
        var l38 = (l5 * l11) - (l7 * l9);
        var l39 = (l5 * l10) - (l6 * l9);
        this.m[0] = l23 * l27;
        this.m[4] = l24 * l27;
        this.m[8] = l25 * l27;
        this.m[12] = l26 * l27;
        this.m[1] = -(((l2 * l17) - (l3 * l18)) + (l4 * l19)) * l27;
        this.m[5] = (((l1 * l17) - (l3 * l20)) + (l4 * l21)) * l27;
        this.m[9] = -(((l1 * l18) - (l2 * l20)) + (l4 * l22)) * l27;
        this.m[13] = (((l1 * l19) - (l2 * l21)) + (l3 * l22)) * l27;
        this.m[2] = (((l2 * l28) - (l3 * l29)) + (l4 * l30)) * l27;
        this.m[6] = -(((l1 * l28) - (l3 * l31)) + (l4 * l32)) * l27;
        this.m[10] = (((l1 * l29) - (l2 * l31)) + (l4 * l33)) * l27;
        this.m[14] = -(((l1 * l30) - (l2 * l32)) + (l3 * l33)) * l27;
        this.m[3] = -(((l2 * l34) - (l3 * l35)) + (l4 * l36)) * l27;
        this.m[7] = (((l1 * l34) - (l3 * l37)) + (l4 * l38)) * l27;
        this.m[11] = -(((l1 * l35) - (l2 * l37)) + (l4 * l39)) * l27;
        this.m[15] = (((l1 * l36) - (l2 * l38)) + (l3 * l39)) * l27;
    }

    public multiply(other: Matrix4): Matrix4 {
        let result = new Matrix4();
        result.m[0] = this.m[0] * other.m[0] + this.m[1] * other.m[4] + this.m[2] * other.m[8] + this.m[3] * other.m[12];
        result.m[1] = this.m[0] * other.m[1] + this.m[1] * other.m[5] + this.m[2] * other.m[9] + this.m[3] * other.m[13];
        result.m[2] = this.m[0] * other.m[2] + this.m[1] * other.m[6] + this.m[2] * other.m[10] + this.m[3] * other.m[14];
        result.m[3] = this.m[0] * other.m[3] + this.m[1] * other.m[7] + this.m[2] * other.m[11] + this.m[3] * other.m[15];
        result.m[4] = this.m[4] * other.m[0] + this.m[5] * other.m[4] + this.m[6] * other.m[8] + this.m[7] * other.m[12];
        result.m[5] = this.m[4] * other.m[1] + this.m[5] * other.m[5] + this.m[6] * other.m[9] + this.m[7] * other.m[13];
        result.m[6] = this.m[4] * other.m[2] + this.m[5] * other.m[6] + this.m[6] * other.m[10] + this.m[7] * other.m[14];
        result.m[7] = this.m[4] * other.m[3] + this.m[5] * other.m[7] + this.m[6] * other.m[11] + this.m[7] * other.m[15];
        result.m[8] = this.m[8] * other.m[0] + this.m[9] * other.m[4] + this.m[10] * other.m[8] + this.m[11] * other.m[12];
        result.m[9] = this.m[8] * other.m[1] + this.m[9] * other.m[5] + this.m[10] * other.m[9] + this.m[11] * other.m[13];
        result.m[10] = this.m[8] * other.m[2] + this.m[9] * other.m[6] + this.m[10] * other.m[10] + this.m[11] * other.m[14];
        result.m[11] = this.m[8] * other.m[3] + this.m[9] * other.m[7] + this.m[10] * other.m[11] + this.m[11] * other.m[15];
        result.m[12] = this.m[12] * other.m[0] + this.m[13] * other.m[4] + this.m[14] * other.m[8] + this.m[15] * other.m[12];
        result.m[13] = this.m[12] * other.m[1] + this.m[13] * other.m[5] + this.m[14] * other.m[9] + this.m[15] * other.m[13];
        result.m[14] = this.m[12] * other.m[2] + this.m[13] * other.m[6] + this.m[14] * other.m[10] + this.m[15] * other.m[14];
        result.m[15] = this.m[12] * other.m[3] + this.m[13] * other.m[7] + this.m[14] * other.m[11] + this.m[15] * other.m[15];
        return result;
    }

    public equals(value: Matrix4): boolean {
        return (this.m[0] === value.m[0] && this.m[1] === value.m[1] && this.m[2] === value.m[2] && this.m[3] === value.m[3] && this.m[4] === value.m[4] && this.m[5] === value.m[5] && this.m[6] === value.m[6] && this.m[7] === value.m[7] && this.m[8] === value.m[8] && this.m[9] === value.m[9] && this.m[10] === value.m[10] && this.m[11] === value.m[11] && this.m[12] === value.m[12] && this.m[13] === value.m[13] && this.m[14] === value.m[14] && this.m[15] === value.m[15]);
    }

    static fromValues(initialM11: number, initialM12: number, initialM13: number, initialM14: number, initialM21: number, initialM22: number, initialM23: number, initialM24: number, initialM31: number, initialM32: number, initialM33: number, initialM34: number, initialM41: number, initialM42: number, initialM43: number, initialM44: number): Matrix4 {
        var result = new Matrix4();
        result.m[0] = initialM11;
        result.m[1] = initialM12;
        result.m[2] = initialM13;
        result.m[3] = initialM14;
        result.m[4] = initialM21;
        result.m[5] = initialM22;
        result.m[6] = initialM23;
        result.m[7] = initialM24;
        result.m[8] = initialM31;
        result.m[9] = initialM32;
        result.m[10] = initialM33;
        result.m[11] = initialM34;
        result.m[12] = initialM41;
        result.m[13] = initialM42;
        result.m[14] = initialM43;
        result.m[15] = initialM44;
        return result;
    }

    static identity(): Matrix4 {
        return Matrix4.fromValues(
            1.0, 0, 0, 0,
            0, 1.0, 0, 0,
            0, 0, 1.0, 0,
            0, 0, 0, 1.0
        );
    }

    static zero(): Matrix4 {
        return Matrix4.fromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    static copy(source: Matrix4): Matrix4 {
        return Matrix4.fromValues(source.m[0], source.m[1], source.m[2], source.m[3], source.m[4], source.m[5], source.m[6], source.m[7], source.m[8], source.m[9], source.m[10], source.m[11], source.m[12], source.m[13], source.m[14], source.m[15]);
    }

    static rotationX(angle: number): Matrix4 {
        var result = Matrix4.zero();
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        result.m[0] = 1.0;
        result.m[15] = 1.0;
        result.m[5] = c;
        result.m[10] = c;
        result.m[9] = -s;
        result.m[6] = s;
        return result;
    }

    static rotationY(angle: number): Matrix4 {
        var result = Matrix4.zero();
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        result.m[5] = 1.0;
        result.m[15] = 1.0;
        result.m[0] = c;
        result.m[2] = -s;
        result.m[8] = s;
        result.m[10] = c;
        return result;
    }

    static rotationZ(angle: number): Matrix4 {
        var result = Matrix4.zero();
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        result.m[10] = 1.0;
        result.m[15] = 1.0;
        result.m[0] = c;
        result.m[1] = s;
        result.m[4] = -s;
        result.m[5] = c;
        return result;
    }

    static rotationAxis(axis: V3, angle: number): Matrix4 {
        var s = Math.sin(-angle);
        var c = Math.cos(-angle);
        var c1 = 1 - c;
        axis.normalize();
        var result = Matrix4.zero();
        result.m[0] = (axis.x * axis.x) * c1 + c;
        result.m[1] = (axis.x * axis.y) * c1 - (axis.z * s);
        result.m[2] = (axis.x * axis.z) * c1 + (axis.y * s);
        result.m[3] = 0.0;
        result.m[4] = (axis.y * axis.x) * c1 + (axis.z * s);
        result.m[5] = (axis.y * axis.y) * c1 + c;
        result.m[6] = (axis.y * axis.z) * c1 - (axis.x * s);
        result.m[7] = 0.0;
        result.m[8] = (axis.z * axis.x) * c1 - (axis.y * s);
        result.m[9] = (axis.z * axis.y) * c1 + (axis.x * s);
        result.m[10] = (axis.z * axis.z) * c1 + c;
        result.m[11] = 0.0;
        result.m[15] = 1.0;
        return result;
    }

    static rotationYawPitchRoll(yaw: number, pitch: number, roll: number): Matrix4 {
        return Matrix4.rotationZ(roll).multiply(Matrix4.rotationX(pitch)).multiply(Matrix4.rotationY(yaw));
    }

    static scaling(x: number, y: number, z: number): Matrix4 {
        var result = Matrix4.zero();
        result.m[0] = x;
        result.m[5] = y;
        result.m[10] = z;
        result.m[15] = 1.0;
        return result;
    }

    static translation(x: number, y: number, z: number): Matrix4 {
        var result = Matrix4.identity();
        result.m[12] = x;
        result.m[13] = y;
        result.m[14] = z;
        return result;
    }

    static lookAtLH(eye: V3, target: V3, up: V3): Matrix4 {
        var zAxis = target.clone().sub(eye);
        zAxis.normalize();
        var xAxis = V3.cross(up, zAxis);
        xAxis.normalize();
        var yAxis = V3.cross(zAxis, xAxis);
        yAxis.normalize();
        var ex = -V3.dot(xAxis, eye);
        var ey = -V3.dot(yAxis, eye);
        var ez = -V3.dot(zAxis, eye);
        return Matrix4.fromValues(
            xAxis.x, yAxis.x, zAxis.x, 0,
            xAxis.y, yAxis.y, zAxis.y, 0,
            xAxis.z, yAxis.z, zAxis.z, 0,
            ex, ey, ez, 1);
    }


    static orthoLH(left: number, right:number, top:number, bottom: number, znear: number, zfar: number): Matrix4 {
        var M4 = Matrix4.zero();
        M4.m[0] = 2.0 / (right-left);
        M4.m[1] = 0;
        M4.m[2] = 0;
        M4.m[3] = 0;
        //---
        M4.m[4] = 0;
        M4.m[5] = 2.0 / (top-bottom);
        M4.m[6] = 0;
        M4.m[7] = 0;
        //---
        M4.m[8] = 0;
        M4.m[9] = 0;
        M4.m[10] = 2.0 / (znear - zfar);
        M4.m[11] = 0;
        //---
        M4.m[12] = -(right+left) / (right-left);
        M4.m[13] = -(top+bottom) / (top-bottom);
        M4.m[14] = (zfar+znear) / (zfar-znear);
        M4.m[15] = 1.0;
        return M4;
    }




    static perspectiveFovLH(fov: number, aspect: number, znear: number, zfar: number): Matrix4 {
        var M4 = Matrix4.zero();
        var tan = 1.0 / (Math.tan(fov*0.5));

        M4.m[0] = tan / aspect;
        M4.m[1] = 0;
        M4.m[2] = 0;
        M4.m[3] = 0;
        //---
        M4.m[4] = 0;
        M4.m[5] = tan;
        M4.m[6] = 0;
        M4.m[7] = 0.0;
        //---
        M4.m[8] = 0;
        M4.m[9] = 0;
        M4.m[10] = -zfar / (znear - zfar);
        M4.m[11] = 1.0;
        //---
        M4.m[12] = 0;
        M4.m[13] = 0;
        M4.m[14] = (znear * zfar) / (znear - zfar);
        M4.m[15] = 0;

        return M4;
    }

     static perspectiveFovLHToRef(
        fov: number,
        aspect: number,
        znear: number,
        zfar: number,
        isVerticalFovFixed = true,
        halfZRange?: boolean,
        projectionPlaneTilt: number = 0,
        reverseDepthBufferMode: boolean = false
    ) {
        const n = znear;
        const f = zfar;

        const t = 1.0 / Math.tan(fov * 0.5);
        const a = isVerticalFovFixed ? t / aspect : t;
        const b = isVerticalFovFixed ? t : t * aspect;
        const c = reverseDepthBufferMode && n === 0 ? -1 : f !== 0 ? (f + n) / (f - n) : 1;
        const d = reverseDepthBufferMode && n === 0 ? 2 * f : f !== 0 ? (-2.0 * f * n) / (f - n) : -2 * n;
        const rot = Math.tan(projectionPlaneTilt);

        return Matrix4.fromValues(a, 0.0, 0.0, 0.0, 0.0, b, 0.0, rot, 0.0, 0.0, c, 1.0, 0.0, 0.0, d, 0.0);


    }

    static transpose(mat: Matrix4): Matrix4 {
        let result = new Matrix4();
        result.m[0] = mat.m[0];
        result.m[1] = mat.m[4];
        result.m[2] = mat.m[8];
        result.m[3] = mat.m[12];
        result.m[4] = mat.m[1];
        result.m[5] = mat.m[5];
        result.m[6] = mat.m[9];
        result.m[7] = mat.m[13];
        result.m[8] = mat.m[2];
        result.m[9] = mat.m[6];
        result.m[10] = mat.m[10];
        result.m[11] = mat.m[14];
        result.m[12] = mat.m[3];
        result.m[13] = mat.m[7];
        result.m[14] = mat.m[11];
        result.m[15] = mat.m[15];
        return result;
    }


}
