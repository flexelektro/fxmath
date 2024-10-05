"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v2 = void 0;
const common_1 = require("./common");
const lerp = (start, stop, amt) => {
    return amt * (stop - start) + start;
};
const v2 = (x, y) => {
    return new V2(x, y);
};
exports.v2 = v2;
class V2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromTo(a, b) {
        return v2(b.x - a.x, b.y - a.y);
    }
    static sameLike(a, b) {
        return a.x === b.x && a.y === b.y;
    }
    static linesIntersect(pA, pA2, pB, pB2) {
        // See Paul Bourke http://paulbourke.net/geometry/pointlineplane/
        let x1 = pA.x;
        let y1 = pA.y;
        let x2 = pA2.x;
        let y2 = pA2.y;
        let x3 = pB.x;
        let y3 = pB.y;
        let x4 = pB2.x;
        let y4 = pB2.y;
        let a = V2.subtract(pA2, pA);
        let b = V2.subtract(pB, pB2);
        if (a.magnitude === 0 || b.magnitude === 0)
            return false;
        let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        // Lines are parallel
        if (denominator === 0) {
            return false;
        }
        let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
        let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
        // is the intersection along the segments
        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
            return false;
        }
        // Return a object with the x and y coordinates of the intersection
        let x = x1 + ua * (x2 - x1);
        let y = y1 + ua * (y2 - y1);
        return v2(x, y);
    }
    static isPointInPolygon(p, poly) {
        let len = poly.length;
        let inside = false;
        for (let i = 0, j = len - 1; i < len; j = i++) {
            if (((poly[i].y > p.y) !== (poly[j].y > p.y)) &&
                (p.x < (poly[j].x - poly[i].x) * (p.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)) {
                inside = !inside;
            }
        }
        return inside;
    }
    static create(x, y) {
        return new V2(x, y);
    }
    static createByMagnitudeAndAngle(mag, angle) {
        return new V2(mag * Math.cos(angle), mag * Math.sin(angle));
    }
    static getAngle(v) {
        return Math.atan2(v.y, v.x);
    }
    static angleBetween(a, b) {
        return Math.acos(V2.dotprod(a, b) / (a.magnitude * b.magnitude));
    }
    static clone(v) {
        return new V2(v.x, v.y);
    }
    static magnitude(v) {
        return v.magnitude;
    }
    static length_(v) {
        return v.magnitude;
    }
    static squareMagnitude(v) {
        return v.squareMagnitude;
    }
    static distance(v1, v2) {
        return V2.subtract(v1, v2).magnitude;
    }
    static add(v1, v2) {
        return new V2(v1.x + v2.x, v1.y + v2.y);
    }
    static subtract(v1, v2) {
        return new V2(v1.x - v2.x, v1.y - v2.y);
    }
    static multiply(vector, scalar) {
        return new V2(vector.x * scalar, vector.y * scalar);
    }
    static multVec(v0, v1) {
        return new V2(v0.x * v1.x, v0.y * v1.y);
    }
    static divide(v, scalar) {
        return V2.multiply(v, 1 / scalar);
    }
    static dotprod(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static crossprod(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }
    static unitVec(v) {
        return V2.divide(v, v.magnitude);
    }
    static projectionFromTo(v1, v2) {
        let unitVector = V2.unitVec(v2);
        return V2.multiply(unitVector, V2.dotprod(v1, unitVector));
    }
    static rotate(v, angle) {
        const a00 = Math.cos(angle);
        const a01 = -Math.sin(angle);
        const a10 = Math.sin(angle);
        const a11 = Math.cos(angle);
        const ux = v.x * a00 + v.y * a01;
        const uy = v.x * a10 + v.y * a11;
        return new V2(ux, uy);
    }
    static rotateAroundPivot(point, pivot, angleRad) {
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        const dx = point.x - pivot.x;
        const dy = point.y - pivot.y;
        const x = cos * dx - sin * dy + pivot.x;
        const y = sin * dx + cos * dy + pivot.y;
        return new V2(x, y);
    }
    static normal(v) {
        return new V2(-v.y, v.x);
    }
    static normalLeft(v) {
        return new V2(-v.y, v.x);
    }
    static normalRight(v) {
        return new V2(v.y, -v.x);
    }
    static manhattanDistance(v1, v2) {
        return Math.abs(v1.x - v2.x) + Math.abs(v1.y - v2.y);
    }
    static lerp(v1, v2, amt) {
        let x = lerp(v1.x, v2.x, amt);
        let y = lerp(v1.y, v2.y, amt);
        return new V2(x, y);
    }
    clone() {
        return new V2(this.x, this.y);
    }
    sameLike(v) {
        return this.x === v.x && this.y === v.y;
    }
    // Same as clone
    copy() {
        return new V2(this.x, this.y);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    set angle(rad) {
        let mag = this.magnitude;
        this.x = mag * Math.cos(rad);
        this.y = mag * Math.sin(rad);
    }
    setAngle(rad) {
        let mag = this.magnitude;
        this.x = mag * Math.cos(rad);
        this.y = mag * Math.sin(rad);
        return this;
    }
    get degree() {
        return 360 / (2 * Math.PI) * Math.atan2(this.y, this.x);
    }
    get normalRight() {
        let x = -this.y;
        let y = this.x;
        this.x = x;
        this.y = y;
        return this;
    }
    get normalLeft() {
        let x = this.y;
        let y = -this.x;
        this.x = x;
        this.y = y;
        return this;
    }
    set degree(degree) {
        let rad = (Math.PI * 2 / 360) * degree;
        this.setAngle(rad);
    }
    setDegree(degree) {
        let rad = (Math.PI * 2 / 360) * degree;
        return this.setAngle(rad);
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get squareMagnitude() {
        return this.x * this.x + this.y * this.y;
    }
    distance(v) {
        return V2.subtract(this, v).magnitude;
    }
    unitVec() {
        return this.divide(this.magnitude);
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    addRnd(rand) {
        this.x += (0, common_1.rnd)(-rand, rand);
        this.y += (0, common_1.rnd)(-rand, rand);
        return this;
    }
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    multVec(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    divide(scalar) {
        return this.multiply(1 / scalar);
    }
    dotprod(v) {
        return this.x * v.x + this.y * v.y;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    crossprod(v) {
        return this.x * v.y - this.y * v.x;
    }
    rotate(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        let x = (this.x * c - this.y * s);
        let y = (this.x * s + this.y * c);
        this.x = x;
        this.y = y;
        return this;
    }
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
    normal() {
        let x = -this.y;
        let y = this.x;
        this.x = x;
        this.y = y;
        return this;
    }
    lerp(v, amt) {
        let x = lerp(this.x, v.x, amt);
        let y = lerp(this.y, v.y, amt);
        this.x = x;
        this.y = y;
        return this;
    }
    floorValues() {
        this.x = this.x | 0;
        this.y = this.y | 0;
        return this;
    }
    isInPolygon(poly) {
        return V2.isPointInPolygon(this, poly);
    }
}
exports.default = V2;
//# sourceMappingURL=v2.js.map