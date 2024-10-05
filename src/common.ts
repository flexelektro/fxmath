import {V2,v2} from './v2';

declare function fxrand(): number;

export type IPos = {
  x: number;
  y: number;
}

const {PI,log,sin,cos,tan,atan,atan2,random,floor,ceil,sqrt,round, exp,pow} = Math;
const PI2 = PI * 2;

const map = (n: number, start: number, stop: number, targetStart: number, targetStop: number) => {
  const newVal = targetStart + (n - start) / (stop - start) * (targetStop - targetStart);
  return newVal;
}

const lerp = (start: number, stop: number, amt: number) => {
  return amt * (stop - start) + start;
}

const mix = lerp;

const dist = (ax: number, ay: number, bx: number, by: number) => {
  return Math.sqrt(Math.pow((ax - bx), 2) + Math.pow((ay - by), 2));
}

const rnd = (a: number, b: number,mathrandom = false) => {
  const random = mathrandom ? Math.random() :RND()
  return a + (b - a) * random;
}

const rndInt = (low:number,high:number) => {
  return low + Math.floor( RND() * ( high - low + 1 ) );
}

const random2 = (a: number,seed = 12345) => {
  let x = Math.sin(a * seed) * 10000;
  return x - Math.floor(x);
}


// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript

const mulberry32RND = (a:number) => {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// @ts-ignore
let mullBerryRND = mulberry32RND(window.fxrand ? fxrand()*10000 : Math.random()*10000)

const resetRNDHASH = (hash:number) => {
  mullBerryRND = mulberry32RND(hash)
}

const RND = () => {
  // @ts-ignore
  return mullBerryRND(); //Math.random();
}

const weightedRandomLn = (rand0to1: number, zeroHasHeigherProb = true) => {
  let e = Math.exp(1);
  let x0 = Math.pow(e, 2) - 1; // At x0 this will become 1 ---
  let x = x0 * rand0to1;
  let rnd = (Math.log(1 + x) / 2);

  if(zeroHasHeigherProb){
    return 1 - rnd;
  } else{
    return rnd;
  }
}




const rand_box_muller = () : number => {
  let u = 0, v = 0;
  while(u === 0) u = RND();
  while(v === 0) v = RND();
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return rand_box_muller() // resample between 0 and 1
  return num
}
const pickRandom = (...args: any[]) => {
  let len = args.length;
  let rnd = Math.round(RND() * (len - 1));
  return args[rnd];
}

const pickRandomFromArray = <T>(arr: T[],splice=false) => {
  let len = arr.length;
  // @ts-ignore
  let _rnd = window.fxrand ? fxrand() : Math.random();
  let rnd = Math.round(_rnd * (len - 1));
  if(splice){
    let el =  arr.splice(rnd,1);
    return el[0];
  }
  return arr[rnd];
}

const fract = (x: number) => {
  return x - Math.floor(x);
}
const clamp = (x: number, min = 0, max = 1) => {
  return Math.min(max, Math.max(x, min));
}

const modWrap = (x: number, min = 0, max = 1) => {
    return (x+(max-min)) % (max - min) + min;
}


const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}
const quinticinterpol = (edge0: number, edge1: number, x0: number) => {
  const x = clamp((x0 - edge0) / (edge1 - edge0), 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}


const createPseudoPoissonDistribution = (OPT: {W: number, H: number, size: number, perc: number, hasShiftRow: boolean}) => {
  const {W,H,size,perc,hasShiftRow} = OPT;

  let dots: V2[][] = [];
  let anzX = Math.ceil(W / size);
  let anzY = Math.ceil(H / size);

  for(let i = 0; i < anzY; i++){
    let row = [];
    for(let j = 0; j < anzX; j++){
      let shiftrow = hasShiftRow ? (i % 2 === 0 ? size / 2 : 0) : 0;
      let _rnd = fxrand ? fxrand() : Math.random();
      let _rnd2 = fxrand ? fxrand() : Math.random();
      let phi = _rnd * 2 * Math.PI;
      let dr = weightedRandomLn(_rnd2) * perc / 100 * size;
      let dx = dr * Math.cos(phi);
      let dy = dr * Math.sin(phi);
      row.push(V2.create( j * size + size / 2 + shiftrow + dx,  i * size + size / 2 + dy ))
    }
    dots.push(row)
  }
  return dots;
}


const randomWeightedFromArray = <T>(arr:{value:T,prob:number,start?: number, end?: number}[]) => {

  let probSum = arr.reduce((prev, curr) => {
    return prev + curr.prob
  }, 0);

  let iterate = 0;
  arr.forEach(item => {
    item.start = iterate;
    item.end = iterate + item.prob;
    iterate = item.end;
  })

  // @ts-ignore
  let r = window.fxrand ? fxrand() : Math.random();
  let rnd = r * probSum;
  let theOne = arr.find((itm: any) => {
    return (itm.start <= rnd && itm.end > rnd);
  })

  return theOne!.value as T

}

const swapVals = (a:number,b:number) => {
  let temp = b;
  b = a;
  a = temp;
  return []
}


const isEven = (n: number) => {
  return n % 2 === 0;
}

function sawTooth(_x:number, A:number) {
  let x = _x + 1000*A;
  var result = x % (2 * A);
  if(result > A) {
    return 2 * A - result;
  } else {
    return result;
  }
}

function make2dSquareArray(MAP_DIMENSION: number) {
  let map3d: any[][] = [];
  for (let iy = 0; iy < MAP_DIMENSION; iy++) {
    let row: number[] = [];
    for (let ix = 0; ix < MAP_DIMENSION; ix++) {
      row.push(0);
    }
    map3d.push(row);
  }
  return map3d;
}

function make2dArray(MAP_DIMENSION_Y: number,MAP_DIMENSION_X: number) {
  let map3d: any[][] = [];
  for (let iy = 0; iy < MAP_DIMENSION_Y; iy++) {
    let row: number[] = [];
    for (let ix = 0; ix < MAP_DIMENSION_X; ix++) {
      row.push(0);
    }
    map3d.push(row);
  }
  return map3d;
}


function shuffleArray(array:any[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(RND() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export {resetRNDHASH, map, lerp, mix, dist, rnd,RND, random2, fract, 
  clamp, smoothstep,quinticinterpol, weightedRandomLn, pickRandomFromArray, pickRandom,
  createPseudoPoissonDistribution,randomWeightedFromArray,
  PI,PI2,log,sin,cos,tan,atan2,atan,random,floor,ceil,sqrt,swapVals,round,exp,pow,rndInt,isEven,rand_box_muller,
    sawTooth,make2dArray,make2dSquareArray,modWrap,shuffleArray
}

