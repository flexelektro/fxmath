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

  public static fromTo(a:V2,b:V2){
    return v2(b.x - a.x,b.y - a.y);
  }

  public static sameLike(a:V2,b:V2){
    return a.x === b.x && a.y === b.y;
  }

  public static linesIntersect  (pA:V2,pA2:V2,pB:V2,pB2:V2)  {
    // See Paul Bourke http://paulbourke.net/geometry/pointlineplane/
    let x1 = pA.x;
    let y1 = pA.y;
    let x2 = pA2.x;
    let y2 = pA2.y;
    let x3 = pB.x;
    let y3 = pB.y;
    let x4 = pB2.x;
    let y4 = pB2.y;

    let a = V2.subtract(pA2,pA);
    let b = V2.subtract(pB,pB2)

    if(a.magnitude === 0 || b.magnitude === 0) return false;

    let denominator =   ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    // Lines are parallel
    if (denominator === 0) {
      return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return v2(x,y)
  }

  public static isPointInPolygon(p:V2,poly:V2[]):boolean{
    let len = poly.length;
    let inside = false;
    for (let i = 0, j = len - 1 ; i < len; j = i++) {
      if(
          ((poly[i].y > p.y) !== (poly[j].y > p.y)) &&
          (p.x < (poly[j].x- poly[i].x) * (p.y - poly[i].y) / (poly[j].y-poly[i].y) + poly[i].x)
      ){
        inside = !inside;
      }
    }
    return inside;
  }

  public static create(x: number, y: number){
    return new V2(x, y);
  }

  public static createByMagnitudeAndAngle(mag: number, angle: number): V2{
    return new V2(mag * Math.cos(angle), mag * Math.sin(angle));
  }

  public static getAngle(v: V2): number{
    return Math.atan2(v.y, v.x);
  }

  public static angleBetween(a:V2,b:V2){
   return Math.acos(V2.dotprod(a,b) / (a.magnitude*b.magnitude))
  }

  public static clone(v: V2){
    return new V2(v.x, v.y)
  }

  public static magnitude(v: V2): number{
    return v.magnitude;
  }
  public static length_(v: V2): number{
    return v.magnitude;
  }

  public static squareMagnitude(v: V2): number{
    return v.squareMagnitude;
  }

  public static distance(v1: V2, v2: V2): number{
    return V2.subtract(v1, v2).magnitude
  }

  public static add(v1: V2, v2: V2): V2{
    return new V2(v1.x + v2.x, v1.y + v2.y);
  }

  public static subtract(v1: V2, v2: V2): V2{
    return new V2(v1.x - v2.x, v1.y - v2.y);
  }

  public static multiply(vector: V2, scalar: number): V2{
    return new V2(
      vector.x * scalar,
      vector.y * scalar
    )
  }

  public static multVec(v0: V2, v1: V2): V2{
    return new V2(
        v0.x * v1.x,
        v0.y * v1.y
    )
  }

  public static divide(v: V2, scalar: number): V2{
    return V2.multiply(v, 1 / scalar);
  }

  public static dotprod(v1: V2, v2: V2): number{
    return v1.x * v2.x + v1.y * v2.y;
  }

  public static dot(v1: V2, v2: V2): number{
    return v1.x * v2.x + v1.y * v2.y;
  }

  public static crossprod(v1: V2, v2: V2): number{
    return v1.x * v2.y - v1.y * v2.x;
  }

  public static unitVec(v:V2){
    return V2.divide(v, v.magnitude);
  }

  public static projectionFromTo(v1: V2, v2: V2): V2{
    let unitVector = V2.unitVec(v2);
    return V2.multiply(unitVector, V2.dotprod(v1, unitVector));
  }

  public static rotate(v:V2,angle:number){
    const a00 = Math.cos(angle);
    const a01 = -Math.sin(angle);
    const a10 = Math.sin(angle);
    const a11 = Math.cos(angle);

    const ux = v.x * a00 + v.y * a01;
    const uy = v.x * a10 + v.y * a11;
    return new V2(ux,uy);
  }

  public static rotateAroundPivot(point: V2, pivot: V2, angleRad: number){

    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const dx = point.x - pivot.x;
    const dy = point.y - pivot.y;
    const x = cos * dx - sin * dy + pivot.x;
    const y = sin * dx + cos * dy + pivot.y;
    return new V2(x, y);
  }

  public static normal(v:V2){
    return new V2(-v.y,v.x)
  }

  public static normalLeft(v:V2){
    return new V2(-v.y,v.x)
  }
  public static normalRight(v:V2){
    return new V2(v.y,-v.x)
  }

  public static manhattanDistance(v1:V2,v2:V2){
    return Math.abs(v1.x-v2.x)+Math.abs(v1.y-v2.y)
  }

  public static lerp(v1:V2,v2:V2,amt:number){
    let x = lerp(v1.x,v2.x,amt);
    let y = lerp(v1.y,v2.y,amt);
    return new V2(x,y)
  }

  public clone(): V2{
    return new V2(this.x, this.y);
  }

  public sameLike(v:V2){
    return this.x === v.x && this.y === v.y;
  }

  // Same as clone
  public copy(): V2{
    return new V2(this.x, this.y);
  }

  public get angle(): number{
    return Math.atan2(this.y, this.x);
  }

  public set angle(rad:number){
    let mag = this.magnitude
    this.x = mag * Math.cos(rad);
    this.y = mag * Math.sin(rad);
  }

  public setAngle(rad:number){
    let mag = this.magnitude;
    this.x = mag * Math.cos(rad);
    this.y = mag * Math.sin(rad);
    return this;
  }

  public get degree(): number{
    return 360 / (2 * Math.PI) * Math.atan2(this.y, this.x);
  }

  public get normalRight(){
    let x  = -this.y;
    let y = this.x;
    this.x = x;
    this.y = y;
    return this;
  }

  public get normalLeft(){
    let x  = this.y;
    let y = -this.x;
    this.x = x;
    this.y = y;
    return this;
  }

  public set degree(degree:number){
    let rad = (Math.PI*2/360) * degree;
    this.setAngle(rad);
  }

  public setDegree(degree:number){
    let rad = (Math.PI*2/360) * degree;
    return this.setAngle(rad);
  }


  public get magnitude(): number{
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  public get length(): number{
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public get squareMagnitude(): number{
    return this.x * this.x + this.y * this.y;
  }

  public distance(v: V2): number{
    return V2.subtract(this,v).magnitude
  }

  public unitVec(): V2{
    return this.divide(this.magnitude);
  }

  public add(v: V2): this{
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  public addRnd(rand:number){
    this.x += rnd(-rand,rand)
    this.y += rnd(-rand,rand)
    return this;
  }

  public subtract(v: V2): this{
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  public multiply(scalar: number): this{
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  public multVec(v: V2): this{
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  public divide(scalar: number): this{
    return this.multiply(1 / scalar);
  }

  public dotprod(v: V2): number{
    return this.x * v.x + this.y * v.y;
  }

  public dot(v: V2): number{
    return this.x * v.x + this.y * v.y;
  }

  public crossprod(v: V2): number{
    return this.x * v.y - this.y * v.x;
  }

  public rotate(angle:number){
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    let x = (this.x * c - this.y * s);
    let y = (this.x * s + this.y * c);

    this.x = x;
    this.y = y;
    return this
  }

  public rotateAroundPivot(pivot: V2, angleRad: number){

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

  public normal(){
    let x = -this.y;
    let y = this.x;
    this.x = x;
    this.y = y;
    return this;
  }



  public lerp(v:V2,amt:number){
    let x = lerp(this.x,v.x,amt);
    let y = lerp(this.y,v.y,amt);
    this.x = x;
    this.y = y;
    return this;
  }

  public floorValues(){
    this.x = this.x|0;
    this.y = this.y|0;
    return this;
  }

  public isInPolygon(poly:V2[]){
    return V2.isPointInPolygon(this,poly)
  }

}

export { v2,V2 }

