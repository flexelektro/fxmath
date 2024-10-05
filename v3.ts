import {atan2, lerp} from 'imports/libs/fxmath/common'

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

    static lerp(v1: V3, v2: V3, amt: number) {
        let x = lerp(v1.x, v2.x, amt);
        let y = lerp(v1.y, v2.y, amt);
        let z = lerp(v1.z, v2.z, amt);
        return v3(x, y, z);
    }

    static clone(v: V3) {
        return v3(v.x, v.y, v.z);
    }

    static zero() {
        return v3(0, 0, 0);
    }

    static up() {
        return v3(0, 1.0, 0);
    }

    static add(a: V3, b: V3) {
        let x = a.x + b.x;
        let y = a.y + b.y;
        let z = a.z + b.z;
        return v3(x, y, z);
    }

    static sub(a: V3, b: V3) {
        let x = a.x - b.x;
        let y = a.y - b.y;
        let z = a.z - b.z;
        return v3(x, y, z);
    }

    static mult(v: V3, factor: number) {
        let x = v.x * factor;
        let y = v.y * factor;
        let z = v.z * factor;
        return v3(x, y, z);
    }

    static multiply(v: V3, factor: number) {
        return V3.mult(v, factor);
    }


    static divide(v: V3, n0: number) {
        if (n0 === 0) {
            throw Error("Division by 0")
        }
        let n = 1 / n0;
        return V3.mult(v, n);
    }

    static cross(a: V3, b: V3) {

        let x = a.y * b.z - a.z * b.y;
        let y = a.z * b.x - a.x * b.z;
        let z = a.x * b.y - a.y * b.x;

        return new V3(x, y, z)

    }

    static dot(a: V3, b: V3) {
        return (a.x * b.x + a.y * b.y + a.z * b.z)
    }

    static abs(v: V3){
        return v3(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
    }

    static max(v1:V3, v2:V3){
        let x = Math.max(v1.x, v2.x);
        let y = Math.max(v1.y, v2.y);
        let z = Math.max(v1.z, v2.z);

        return v3(x, y, z);
    }


    zero(): V3 {
        this.x = this.y = this.z = 0;
        return this;
    }

    clone() {
        return v3(this.x, this.y, this.z);
    }

    abs(){
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }

    add(v: V3): V3 {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
        this.z = this.z + v.z;
        return this;
    }

    max(v2:V3){
        this.x = Math.max(this.x, v2.x);
        this.y = Math.max(this.y, v2.y);
        this.z = Math.max(this.z, v2.z);
    }

    sub(v: V3): V3 {
        this.x = this.x - v.x;
        this.y = this.y - v.y;
        this.z = this.z - v.z;
        return this;
    }

    mult(n: number): V3 {
        this.x = this.x * n;
        this.y = this.y * n;
        this.z = this.z * n;
        return this;
    }

    multiply(n: number): V3 {
        return this.mult(n);
    }


    public divide(n0: number): V3 {
        let n = 1 / n0;
        this.x = this.x * n;
        this.y = this.y * n;
        this.z = this.z * n;
        return this;
    }

    dot(v: V3) {
        return (this.x * v.x + this.y * v.y + this.z * v.z)
    }

    dotProd(v: V3) {
        return this.dot(v);
    }


    cross(b: V3) {
        const ax = this.x, ay = this.y, az = this.z;
        const bx = b.x, by = b.y, bz = b.z;

        let x = ay * bz - az * by;
        let y = az * bx - ax * bz;
        let z = ax * by - ay * bx;

        return new V3(x, y, z)

    }

    crossProd(b: V3) {
        return this.cross(b)
    }

    lengthSq() {

        return this.x * this.x + this.y * this.y + this.z * this.z;

    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    magnitude() {
        return this.length();
    }

    normalize() {
        return this.divide(this.length() || 1);
    }

    unitVector() {
        return this.normalize();
    }


    static transformCoordinates(v: V3, mat: Matrix4) {
        const {x, y, z} = v;
        let m = mat.m;
        const rx = x * m[0] + y * m[4] + z * m[8] + m[12];
        const ry = x * m[1] + y * m[5] + z * m[9] + m[13];
        const rz = x * m[2] + y * m[6] + z * m[10] + m[14];
        const rw = x * m[3] + y * m[7] + z * m[11] + m[15];

        return v3(rx/rw, ry/rw, rz)

    }

    static multiplyWithMatrix(v: V3, mat: Matrix4){
        const {x, y, z} = v;
        let m = mat.m;
        const rx = x * m[0] + y * m[4] + z * m[8] + m[12];
        const ry = x * m[1] + y * m[5] + z * m[9] + m[13];
        const rz = x * m[2] + y * m[6] + z * m[10] + m[14];
        const rw = x * m[3] + y * m[7] + z * m[11] + m[15];

        return v3(rx, ry, rz)
    }

    floorValues() {
        this.x = this.x|0;
        this.y = this.y|0;
        this.z = this.z|0;
        return this;
    }

    angleXY() {
        return atan2(this.x, this.y);
    }

    toArray() {
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
