# fxmath

> A comprehensive math library for vector operations, noise generation, and generative art utilities.

[![npm version](https://img.shields.io/npm/v/@fdx/fxmath.svg)](https://www.npmjs.com/package/@fdx/fxmath)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Installation

```bash
npm install @fdx/fxmath
```

## Features

- 🎯 **2D & 3D Vectors** - Mutable (`V2`, `V3`) and immutable (`_V2`, `_V3`) variants
- 🎨 **Noise Functions** - Perlin, Simplex, Worley, Value noise with FBM support
- 🔢 **Math Utilities** - Interpolation, clamping, mapping, and more
- 🎲 **Random Functions** - Seedable RNG, weighted random, distributions
- 📐 **Matrix Operations** - 4x4 matrix for 3D transformations

---

## Table of Contents

- [Vectors](#vectors)
  - [V2 - 2D Vector (Mutable)](#v2---2d-vector-mutable)
  - [_V2 - 2D Vector (Immutable)](#_v2---2d-vector-immutable)
  - [V3 - 3D Vector (Mutable)](#v3---3d-vector-mutable)
  - [_V3 - 3D Vector (Immutable)](#_v3---3d-vector-immutable)
- [Matrix4](#matrix4)
- [Noise Functions](#noise-functions)
- [Math Utilities](#math-utilities)
- [Random Functions](#random-functions)
- [Array Utilities](#array-utilities)
- [Constants](#constants)

---

## Vectors

### V2 - 2D Vector (Mutable)

The `V2` class provides mutable 2D vector operations. Methods modify the vector in place and return `this` for chaining.

```typescript
import { V2, v2 } from '@fdx/fxmath';

// Creation
const a = v2(3, 4);              // Factory function
const b = V2.create(1, 2);       // Static method
const c = V2.createByMagnitudeAndAngle(5, Math.PI / 4);

// Basic operations (mutating)
a.add(b);                        // a is now (4, 6)
a.subtract(b);                   // a.sub(b) also works
a.multiply(2);                   // Scale by 2
a.divide(2);                     // Divide by 2

// Chaining
v2(1, 0).multiply(5).rotate(Math.PI / 2).add(v2(10, 10));

// Properties
a.magnitude;                     // Length of vector
a.length;                        // Alias for magnitude
a.squareMagnitude;               // Faster (no sqrt)
a.angle;                         // Angle in radians
a.degree;                        // Angle in degrees

// Setters
a.angle = Math.PI;               // Set angle, keep magnitude
a.degree = 90;                   // Set angle in degrees

// Instance methods
a.clone();                       // Create a copy
a.unitVec();                     // Returns normalized copy
a.normalize();                   // Normalizes in place (V3 only)
a.distance(b);                   // Distance to another vector
a.dot(b);                        // Dot product
a.crossprod(b);                  // Cross product (returns scalar in 2D)
a.rotate(Math.PI / 2);           // Rotate around origin
a.rotateAroundPivot(pivot, rad); // Rotate around point
a.lerp(b, 0.5);                  // Linear interpolation
a.normal();                      // Perpendicular vector (new)
a.toNormal();                    // Make perpendicular (mutating)
a.floorValues();                 // Floor x and y
a.addRnd(5);                     // Add random offset ±5
a.sameLike(b);                   // Check equality
a.isInPolygon(polygon);          // Point-in-polygon test

// Static methods
V2.add(a, b);                    // Returns new vector
V2.subtract(a, b);
V2.multiply(a, 2);
V2.divide(a, 2);
V2.dot(a, b);
V2.crossprod(a, b);
V2.distance(a, b);
V2.magnitude(a);
V2.squareMagnitude(a);
V2.getAngle(a);
V2.angleBetween(a, b);
V2.unitVec(a);
V2.rotate(a, angle);
V2.rotateAroundPivot(point, pivot, angle);
V2.normalLeft(a);                // 90° counterclockwise
V2.normalRight(a);               // 90° clockwise
V2.lerp(a, b, t);
V2.fromTo(a, b);                 // Vector from a to b
V2.sameLike(a, b);
V2.manhattanDistance(a, b);
V2.projectionFromTo(a, b);       // Project a onto b
V2.multVec(a, b);                // Component-wise multiply
V2.linesIntersect(p1, p2, p3, p4);  // Line intersection
V2.isPointInPolygon(point, polygon);
```

### _V2 - 2D Vector (Immutable)

The `_V2` class provides immutable operations. All methods return new vectors.

```typescript
import { _V2, _v2 } from '@fdx/fxmath';

const a = _v2(3, 4);
const b = _v2(1, 2);

// All operations return NEW vectors
const c = a.add(b);              // a is unchanged, c is (4, 6)
const d = a.multiply(2);         // a is unchanged, d is (6, 8)

// Properties (readonly)
a.x;                             // 3 (cannot be changed)
a.y;                             // 4 (cannot be changed)
a.magnitude;                     // 5
a.squareMagnitude;               // 25

// Instance methods (all return new _V2)
a.add(b);
a.subtract(b);
a.multiply(scalar);
a.divide(scalar);
a.normalize();
a.rotate(angle);
a.normalLeft();
a.normalRight();
a.lerp(b, t);
a.floor();
a.clone();
a.dot(b);                        // Returns number
a.cross(b);                      // Returns number
a.distance(b);                   // Returns number

// Static methods work the same as V2
_V2.add(a, b);
_V2.lerp(a, b, 0.5);
// ... etc
```

### V3 - 3D Vector (Mutable)

```typescript
import { V3, v3 } from '@fdx/fxmath';

// Creation
const a = v3(1, 2, 3);
const b = V3.create(4, 5, 6);
const zero = V3.zero();          // (0, 0, 0)
const up = V3.up();              // (0, 1, 0)
const right = V3.right();        // (1, 0, 0)
const forward = V3.forward();    // (0, 0, 1)

// Basic operations (mutating)
a.add(b);
a.sub(b);
a.mult(2);                       // or a.multiply(2)
a.divide(2);
a.normalize();                   // or a.unitVector()
a.negate();                      // Flip direction
a.abs();                         // Absolute values

// Properties & methods
a.length();                      // Magnitude
a.lengthSq();                    // Squared magnitude
a.magnitude();                   // Alias for length()
a.dot(b);                        // Dot product
a.cross(b);                      // Cross product (returns new V3)
a.distance(b);                   // Distance to b
a.sameLike(b);                   // Check equality
a.lerp(b, 0.5);                  // Interpolate toward b
a.max(b);                        // Component-wise max
a.min(b);                        // Component-wise min
a.floorValues();                 // Floor components
a.angleXY();                     // Angle in XY plane
a.toArray();                     // [x, y, z]
a.clone();

// Static methods
V3.add(a, b);
V3.sub(a, b);
V3.mult(a, scalar);
V3.divide(a, scalar);
V3.cross(a, b);
V3.dot(a, b);
V3.distance(a, b);
V3.magnitude(a);
V3.squareMagnitude(a);
V3.fromTo(a, b);
V3.angleBetween(a, b);
V3.sameLike(a, b);
V3.unitVec(a);
V3.lerp(a, b, t);
V3.max(a, b);
V3.min(a, b);
V3.abs(a);
V3.negate(a);
V3.project(a, b);                // Project a onto b
V3.reflect(a, normal);           // Reflect a across normal

// Matrix transformations
V3.transformCoordinates(v, matrix);   // With perspective division
V3.multiplyWithMatrix(v, matrix);     // Without perspective division
```

### _V3 - 3D Vector (Immutable)

```typescript
import { _V3, _v3 } from '@fdx/fxmath';

const a = _v3(1, 2, 3);

// All operations return NEW vectors
const b = a.add(_v3(1, 1, 1));   // a unchanged
const c = a.normalize();         // a unchanged
const d = a.cross(_v3(0, 1, 0)); // a unchanged

// Properties (readonly)
a.x;                             // Cannot change
a.magnitude;                     // Getter
a.length;                        // Alias
a.squareMagnitude;

// Same API as V3, but immutable
```

---

## Matrix4

4x4 transformation matrix for 3D graphics.

```typescript
import { Matrix4, V3, v3 } from '@fdx/fxmath';

// Creation
const identity = Matrix4.identity();
const zero = Matrix4.zero();

// Transformations
const translation = Matrix4.translation(10, 0, 5);
const scaling = Matrix4.scaling(2, 2, 2);
const rotX = Matrix4.rotationX(Math.PI / 4);
const rotY = Matrix4.rotationY(Math.PI / 4);
const rotZ = Matrix4.rotationZ(Math.PI / 4);
const rotAxis = Matrix4.rotationAxis(v3(1, 1, 0), Math.PI / 4);
const rotYPR = Matrix4.rotationYawPitchRoll(yaw, pitch, roll);

// Combine transformations
const combined = translation.multiply(rotY).multiply(scaling);

// Camera
const view = Matrix4.lookAtLH(eye, target, up);

// Projection
const perspective = Matrix4.perspectiveFovLH(fov, aspect, near, far);
const ortho = Matrix4.orthoLH(left, right, top, bottom, near, far);

// Operations
matrix.invert();                 // Invert in place
matrix.determinant();            // Get determinant
Matrix4.transpose(matrix);       // Transposed copy
Matrix4.copy(matrix);            // Clone
matrix.equals(other);            // Compare
matrix.toArray();                // Get raw array

// Transform a vector
const transformed = V3.transformCoordinates(point, matrix);
```

---

## Noise Functions

### Perlin Noise

```typescript
import { Perlin2D, Perlin3D, createNoise } from '@fdx/fxmath';

// 2D Perlin
const perlin2d = new Perlin2D(seed);  // or createNoise.perlin2D(seed)
perlin2d.noise(x, y);                 // Returns [-1, 1]
perlin2d.noise01(x, y);               // Returns [0, 1]
perlin2d.reseed(newSeed);             // Change seed

// 3D Perlin (for animated 2D or volumetric)
const perlin3d = new Perlin3D(seed);
perlin3d.noise(x, y, z);
perlin3d.noise01(x, y, z);
```

### Simplex Noise

Faster than Perlin with fewer directional artifacts.

```typescript
import { Simplex2D, createNoise } from '@fdx/fxmath';

const simplex = createNoise.simplex2D(seed);
simplex.noise(x, y);                  // Returns ~[-1, 1]
simplex.noise01(x, y);                // Returns [0, 1]
```

### Worley (Cellular) Noise

Creates cell-like patterns.

```typescript
import { Worley2D, createNoise } from '@fdx/fxmath';

const worley = createNoise.worley2D(seed);
worley.f1(x, y);                      // Distance to closest point
worley.f2(x, y);                      // Distance to 2nd closest
worley.edge(x, y);                    // F2 - F1 (cell edges)
worley.manhattan(x, y);               // Angular cells
worley.noise(x, y, k);                // k-th closest point
```

### Value Noise

Simple and fast.

```typescript
import { Value2D, createNoise } from '@fdx/fxmath';

const value = createNoise.value2D(seed);
value.noise(x, y);                    // Returns [0, 1]
```

### Fractal Brownian Motion (FBM)

Layer multiple octaves of any noise.

```typescript
import { FBM, Perlin2D, createNoise } from '@fdx/fxmath';

const perlin = new Perlin2D(seed);
const fbm = new FBM({
  octaves: 6,                         // Number of layers
  lacunarity: 2.0,                    // Frequency multiplier
  gain: 0.5                           // Amplitude multiplier
});

// Apply FBM to perlin
const value = fbm.get2D((x, y) => perlin.noise(x, y), x, y);

// For 3D noise
const value3d = fbm.get3D((x, y, z) => perlin3d.noise(x, y, z), x, y, z);
```

### Ridged Noise

Sharp ridges for mountains, veins, lightning.

```typescript
import { Ridged, createNoise } from '@fdx/fxmath';

const perlin = createNoise.perlin2D();
const ridged = createNoise.ridged({ octaves: 6, offset: 1.0 });

const value = ridged.get2D((x, y) => perlin.noise(x, y), x, y);
```

### Turbulence

Billowy, cloud-like patterns.

```typescript
import { Turbulence, createNoise } from '@fdx/fxmath';

const perlin = createNoise.perlin2D();
const turb = createNoise.turbulence({ octaves: 6 });

const value = turb.get2D((x, y) => perlin.noise(x, y), x, y);
```

### Swiss Noise

Natural terrain with valleys.

```typescript
import { Swiss, createNoise } from '@fdx/fxmath';

const perlin = createNoise.perlin2D();
const swiss = createNoise.swiss({ warp: 0.15 });

const value = swiss.get2D((x, y) => perlin.noise(x, y), x, y);
```

### Domain Warping

Distort coordinates for organic patterns.

```typescript
import { domainWarp2D, Perlin2D } from '@fdx/fxmath';

const perlin = new Perlin2D();

const value = domainWarp2D(
  (x, y) => perlin.noise(x, y),
  x, y,
  4,                                  // Warp amount
  2                                   // Iterations
);
```

### Curl Noise

Divergence-free flow fields for particles/fluids.

```typescript
import { curlNoise2D, Simplex2D } from '@fdx/fxmath';

const simplex = new Simplex2D();

const [vx, vy] = curlNoise2D(
  (x, y) => simplex.noise(x * 0.02, y * 0.02),
  x, y
);

// Move particle
particle.x += vx * speed;
particle.y += vy * speed;
```

### Billow Noise

```typescript
import { billowNoise2D, Perlin2D } from '@fdx/fxmath';

const perlin = new Perlin2D();
const value = billowNoise2D((x, y) => perlin.noise(x, y), x, y);
```

---

## Math Utilities

### Interpolation

```typescript
import { lerp, inverseLerp, remap, map, smoothstep, smootherstep } from '@fdx/fxmath';

// Linear interpolation
lerp(0, 100, 0.5);                    // 50
mix(0, 100, 0.5);                     // Alias for lerp

// Inverse lerp - find t for a value
inverseLerp(0, 100, 50);              // 0.5

// Remap from one range to another
remap(50, 0, 100, 0, 1);              // 0.5
map(0.5, 0, 1, 0, 100);               // 50

// Smooth interpolation (S-curve)
smoothstep(0, 1, 0.5);                // ~0.5 with smooth ease
smootherstep(0, 1, 0.5);              // Even smoother (quintic)
quinticinterpol(0, 1, 0.5);           // Alias
```

### Clamping & Wrapping

```typescript
import { clamp, saturate, fract, modWrap, step, pingPong } from '@fdx/fxmath';

clamp(150, 0, 100);                   // 100
clamp(-50, 0, 100);                   // 0

saturate(1.5);                        // 1 (clamp to 0-1)
saturate(-0.5);                       // 0

fract(3.7);                           // 0.7 (fractional part)

modWrap(1.5, 0, 1);                   // 0.5 (wraps around)
modWrap(-0.5, 0, 1);                  // 0.5 (works with negatives)

step(0.5, 0.3);                       // 0 (x < edge)
step(0.5, 0.7);                       // 1 (x >= edge)

pingPong(2.5, 2);                     // 1.5 (bounces between 0-2)
pingPong(3.5, 2);                     // 0.5
```

### Comparison

```typescript
import { approximately, approxEqual } from '@fdx/fxmath';

// Float comparison with epsilon
approximately(0.1 + 0.2, 0.3);        // 1 (truthy)
approxEqual(0.1 + 0.2, 0.3);          // true (boolean)
approxEqual(0.1, 0.2);                // false
```

### Angle Conversion

```typescript
import { degToRad, radToDeg, DEG2RAD, RAD2DEG } from '@fdx/fxmath';

degToRad(180);                        // π
radToDeg(Math.PI);                    // 180

// Or use constants
const rad = 90 * DEG2RAD;             // π/2
const deg = Math.PI * RAD2DEG;        // 180
```

### Distance

```typescript
import { dist } from '@fdx/fxmath';

dist(0, 0, 3, 4);                     // 5 (2D distance)
```

---

## Random Functions

### Basic Random

```typescript
import { rnd, rndInt, RND, resetRNDHASH } from '@fdx/fxmath';

rnd(0, 100);                          // Random float 0-100
rndInt(1, 6);                         // Random integer 1-6 (inclusive)

// Seedable random (Mulberry32)
RND();                                // Returns 0-1
resetRNDHASH(12345);                  // Set seed
```

### Weighted & Special Random

```typescript
import { 
  weightedRandomLn, 
  rand_box_muller,
  random2 
} from '@fdx/fxmath';

// Logarithmic weighted (bias toward 0 or 1)
weightedRandomLn(RND(), true);        // Bias toward 0
weightedRandomLn(RND(), false);       // Bias toward 1

// Normal distribution (Gaussian)
rand_box_muller();                    // 0-1, clustered around 0.5

// Seeded pseudo-random
random2(x, seed);                     // Deterministic based on input
```

### Array Random

```typescript
import { 
  pickRandom, 
  pickRandomFromArray, 
  randomWeightedFromArray 
} from '@fdx/fxmath';

// Pick from arguments
pickRandom('a', 'b', 'c');            // Random item

// Pick from array
pickRandomFromArray(['a', 'b', 'c']); // Random item
pickRandomFromArray(arr, true);       // Remove picked item (splice)

// Weighted selection
const items = [
  { value: 'common', prob: 70 },
  { value: 'rare', prob: 25 },
  { value: 'epic', prob: 5 }
];
randomWeightedFromArray(items);       // Respects probabilities
```

### Distributions

```typescript
import { createPseudoPoissonDistribution } from '@fdx/fxmath';

// Poisson disk sampling
const points = createPseudoPoissonDistribution({
  W: 800,                             // Width
  H: 600,                             // Height
  size: 20,                           // Cell size
  perc: 50,                           // Randomness percentage
  hasShiftRow: true                   // Offset alternate rows
});
// Returns V2[][] grid of points
```

---

## Array Utilities

```typescript
import { 
  range, sum, average, 
  first, last,
  shuffleArray, shuffledCopy,
  make2dArray, make2dSquareArray,
  swapVals
} from '@fdx/fxmath';

// Range
range(5);                             // [0, 1, 2, 3, 4]
range(2, 5);                          // [2, 3, 4]
range(0, 10, 2);                      // [0, 2, 4, 6, 8]

// Math
sum([1, 2, 3, 4, 5]);                 // 15
average([1, 2, 3, 4, 5]);             // 3

// Access
first([1, 2, 3]);                     // 1
last([1, 2, 3]);                      // 3

// Shuffle
shuffleArray(arr);                    // Mutates array
shuffledCopy(arr);                    // Returns new shuffled array

// 2D Arrays
make2dArray(3, 4, 0);                 // 3 rows, 4 cols, filled with 0
make2dSquareArray(3, false);          // 3x3, filled with false
make2dArray<string>(2, 2, 'x');       // Generic types

// Swap
const [b, a] = swapVals(a, b);        // Returns [b, a]
```

---

## Constants

```typescript
import { 
  PI, PI2, TAU, HALF_PI,
  GOLDENRATIO,
  DEG2RAD, RAD2DEG,
  sin, cos, tan, atan, atan2,
  sqrt, floor, ceil, round,
  abs, sign, min, max,
  log, exp, pow
} from '@fdx/fxmath';

PI;                                   // 3.14159...
PI2;                                  // 2π (TAU)
TAU;                                  // 2π
HALF_PI;                              // π/2
GOLDENRATIO;                          // 1.618...

DEG2RAD;                              // π/180
RAD2DEG;                              // 180/π

// All Math functions re-exported for convenience
sin(PI / 2);                          // 1
cos(0);                               // 1
// etc.
```

---

## Utility Functions

```typescript
import { isEven, sawTooth, debounce, makeFibonacci } from '@fdx/fxmath';

isEven(4);                            // true
isEven(3);                            // false

// Sawtooth wave
sawTooth(x, amplitude);               // Triangle wave pattern

// Debounce
const debouncedFn = debounce(myFn, 300);

// Fibonacci sequence
makeFibonacci(10);                    // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

---

## Examples

### Flow Field with Particles

```typescript
import { V2, v2, Simplex2D, curlNoise2D } from '@fdx/fxmath';

const simplex = new Simplex2D(12345);
const particles: V2[] = [];

// Create particles
for (let i = 0; i < 1000; i++) {
  particles.push(v2(Math.random() * 800, Math.random() * 600));
}

// Update loop
function update() {
  particles.forEach(p => {
    const [vx, vy] = curlNoise2D(
      (x, y) => simplex.noise(x * 0.005, y * 0.005),
      p.x, p.y
    );
    p.x += vx * 2;
    p.y += vy * 2;
  });
}
```

### Terrain Generation

```typescript
import { createNoise, FBM, Ridged } from '@fdx/fxmath';

const perlin = createNoise.perlin2D(42);
const fbm = new FBM({ octaves: 6, gain: 0.5 });
const ridged = new Ridged({ octaves: 4 });

function getHeight(x: number, y: number): number {
  // Base terrain
  let h = fbm.get2D((x, y) => perlin.noise(x, y), x * 0.01, y * 0.01);
  
  // Add ridges for mountains
  const ridge = ridged.get2D((x, y) => perlin.noise(x, y), x * 0.005, y * 0.005);
  h += ridge * 0.3;
  
  return h;
}
```

### 3D Rotation

```typescript
import { V3, v3, Matrix4 } from '@fdx/fxmath';

const point = v3(10, 0, 0);

// Rotate around Y axis
const rotY = Matrix4.rotationY(Math.PI / 4);
const rotated = V3.transformCoordinates(point, rotY);

// Combined transformation
const transform = Matrix4.translation(0, 5, 0)
  .multiply(Matrix4.rotationY(Math.PI / 4))
  .multiply(Matrix4.scaling(2, 2, 2));

const result = V3.transformCoordinates(point, transform);
```

---

## TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import { V2, _V2, V3, _V3, Matrix4, IPos } from '@fdx/fxmath';

// IPos interface for simple {x, y} objects
const pos: IPos = { x: 10, y: 20 };
```

---

## License

ISC © Felix Deimling

---

## Contributing

Contributions welcome! Please open an issue or PR on [GitHub](https://github.com/flexelektro/fxmath).

