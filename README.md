# @fdx/fxmath

A lightweight math library for TypeScript and JavaScript, providing vector classes for 2D and 3D operations along with a collection of common math utility functions.

> **Note:** This library includes several vector classes:
> - **V2**: A mutable 2D vector class.
> - **_V2**: An immutable 2D vector class (all operations return a new vector).
> - **V3**: A 3D vector class.
>
> In addition, it provides a **common.ts** module with utility functions for interpolation, randomization, mapping, and more.

## Features

- **2D & 3D Vector Operations:** Create, add, subtract, multiply, divide, compute dot and cross products.
- **Immutable & Mutable Options:** Choose the vector type based on your needs.
- **Utility Functions:** A variety of helpful math functions (lerp, map, rnd, etc.) and constants.
- **TypeScript Support:** Fully typed with comprehensive JSDoc documentation.

## Installation

Install via npm:

```bash
npm install @fdx/fxmath
```
Or with yarn:

```bash
yarn add @fdx/fxmath
```
## Usage
Import the desired classes and functions in your project:

```typescript
import { v2, V2, _V2, V3 } from '@fdx/fxmath';
import { lerp, rnd, map } from '@fdx/fxmath/common';

// Create mutable 2D vectors:
const a = v2(1, 2);
const b = v2(3, 4);

// Using static methods on V2:
const sum = V2.add(a, b);
console.log(sum); // Output: { x: 4, y: 6 }

// Create an immutable 2D vector:
const immutA = new _V2(5, 6);
const immutSum = _V2.add(immutA, v2(1, 1));
console.log(immutSum); // New _V2 instance with updated coordinates

// Create a 3D vector:
const vec3 = new V3(1, 2, 3);
```

## API Overview

### V2 Class (Mutable 2D Vector)

**Constructor:**
- `v2(x: number, y: number): V2`  
  Creates a new V2 instance.

**Static Methods:**
- `V2.add(a: V2, b: V2): V2`  
  Returns a new vector that is the sum of vectors `a` and `b`.
- `V2.subtract(a: V2, b: V2): V2`  
  Returns a new vector representing the difference (a - b).
- `V2.dot(a: V2, b: V2): number`  
  Computes the dot product between `a` and `b`.
- `V2.crossprod(a: V2, b: V2): number`  
  Computes the 2D cross product (resulting in a scalar).
- *... weitere Methoden ...*

**Instance Properties:**
- `x: number` – The x-coordinate.
- `y: number` – The y-coordinate.
- `magnitude: number` – The length of the vector.

---

### _V2 Class (Immutable 2D Vector)

**Constructor:**
- `new _V2(x: number, y: number)`  
  Creates a new immutable vector.

**Static Methods:**  
(Sind identisch zu denen in V2, aber alle Operationen returnieren immer einen neuen Vektor.)

**Usage Example:**
```typescript
const a = new _V2(1, 2);
const b = new _V2(3, 4);
const result = _V2.add(a, b);
console.log(result); // { x: 4, y: 6 }

Instance Properties:
x, y — The vector components.
magnitude — The length of the vector.
_V2 Class (Immutable 2D Vector)
Constructor:
new _V2(x: number, y: number) — Returns an immutable vector.
Static Methods:
Same as V2, but all operations return a new vector instance.
Note: All methods are implemented such that the original vector remains unchanged.
V3 Class (3D Vector)
Provides similar operations as V2 for 3D calculations (e.g. dot product, cross product).
common.ts
Contains a collection of utility functions, such as:

lerp(start: number, stop: number, amt: number): number — Linear interpolation.
map(n: number, start: number, stop: number, targetStart: number, targetStop: number): number — Re-maps a number from one range to another.
rnd(a: number, b: number): number — Returns a random number between a and b.
...and various other helper functions and constants.
License & Attribution
This project is provided under a license that requires attribution in commercial projects.
If you use @fdx/fxmath in any commercial project, please include an attribution similar to:

Powered by @fdx/fxmath by Felix

(Replace the URL and text with your preferred attribution.)

Contributing
Contributions are welcome! If you find a bug or have an idea for improvement, please open an issue or submit a pull request.

Contact
For questions or suggestions, please reach out via GitHub or email.

sql
Kopieren

Dieses Template fasst alle wichtigen Informationen zusammen und stellt klar, welche Klassen und Module in der Bibliothek enthalten sind. Passe es gerne weiter an deine Bedürfnisse und deinen Stil an!





