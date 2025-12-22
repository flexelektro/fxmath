/**
 * Benchmark: Direct Implementation vs Delegated Implementation
 * Misst den Performance-Impact der Core-Abstraktion
 */

// ============= DIRECT IMPLEMENTATION (Current) =============
class V2Direct {
    constructor(public x: number, public y: number) {}

    static add(v1: V2Direct, v2: V2Direct): V2Direct {
        return new V2Direct(v1.x + v2.x, v1.y + v2.y);
    }

    static subtract(v1: V2Direct, v2: V2Direct): V2Direct {
        return new V2Direct(v1.x - v2.x, v1.y - v2.y);
    }

    static multiply(v: V2Direct, scalar: number): V2Direct {
        return new V2Direct(v.x * scalar, v.y * scalar);
    }

    static dot(v1: V2Direct, v2: V2Direct): number {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static normalize(v: V2Direct): V2Direct {
        const mag = Math.sqrt(v.x * v.x + v.y * v.y);
        return new V2Direct(v.x / mag, v.y / mag);
    }
}

// ============= APPROACH 1: DELEGATED WITH FACTORY CALLBACK =============
interface IVec2 {
    x: number;
    y: number;
}

type Vec2Factory<T> = (x: number, y: number) => T;

const Vec2Core = {
    add<T extends IVec2>(v1: IVec2, v2: IVec2, factory: Vec2Factory<T>): T {
        return factory(v1.x + v2.x, v1.y + v2.y);
    },
    subtract<T extends IVec2>(v1: IVec2, v2: IVec2, factory: Vec2Factory<T>): T {
        return factory(v1.x - v2.x, v1.y - v2.y);
    },
    multiply<T extends IVec2>(v: IVec2, scalar: number, factory: Vec2Factory<T>): T {
        return factory(v.x * scalar, v.y * scalar);
    },
    dot(v1: IVec2, v2: IVec2): number {
        return v1.x * v2.x + v1.y * v2.y;
    },
    normalize<T extends IVec2>(v: IVec2, factory: Vec2Factory<T>): T {
        const mag = Math.sqrt(v.x * v.x + v.y * v.y);
        return factory(v.x / mag, v.y / mag);
    }
};

class V2Delegated {
    constructor(public x: number, public y: number) {}
    private static factory = (x: number, y: number) => new V2Delegated(x, y);

    static add(v1: V2Delegated, v2: V2Delegated): V2Delegated {
        return Vec2Core.add(v1, v2, V2Delegated.factory);
    }
    static subtract(v1: V2Delegated, v2: V2Delegated): V2Delegated {
        return Vec2Core.subtract(v1, v2, V2Delegated.factory);
    }
    static multiply(v: V2Delegated, scalar: number): V2Delegated {
        return Vec2Core.multiply(v, scalar, V2Delegated.factory);
    }
    static dot(v1: V2Delegated, v2: V2Delegated): number {
        return Vec2Core.dot(v1, v2);
    }
    static normalize(v: V2Delegated): V2Delegated {
        return Vec2Core.normalize(v, V2Delegated.factory);
    }
}

// ============= APPROACH 2: ABSTRACT BASE CLASS =============
abstract class Vec2Base<T extends Vec2Base<T>> {
    constructor(public x: number, public y: number) {}

    protected abstract create(x: number, y: number): T;

    // Instanz-Methoden für Operationen die neue Instanz zurückgeben
    add(v: Vec2Base<any>): T {
        return this.create(this.x + v.x, this.y + v.y);
    }
    subtract(v: Vec2Base<any>): T {
        return this.create(this.x - v.x, this.y - v.y);
    }
    multiply(scalar: number): T {
        return this.create(this.x * scalar, this.y * scalar);
    }
    dot(v: Vec2Base<any>): number {
        return this.x * v.x + this.y * v.y;
    }
    normalize(): T {
        const mag = Math.sqrt(this.x * this.x + this.y * this.y);
        return this.create(this.x / mag, this.y / mag);
    }
}

class V2Inherited extends Vec2Base<V2Inherited> {
    protected create(x: number, y: number): V2Inherited {
        return new V2Inherited(x, y);
    }

    // Statische Methoden wrappen Instanz-Methoden
    static add(v1: V2Inherited, v2: V2Inherited): V2Inherited {
        return v1.add(v2);
    }
    static subtract(v1: V2Inherited, v2: V2Inherited): V2Inherited {
        return v1.subtract(v2);
    }
    static multiply(v: V2Inherited, scalar: number): V2Inherited {
        return v.multiply(scalar);
    }
    static dot(v1: V2Inherited, v2: V2Inherited): number {
        return v1.dot(v2);
    }
    static normalize(v: V2Inherited): V2Inherited {
        return v.normalize();
    }
}

// ============= APPROACH 3: MIXIN/COMPOSITION =============
// Pure functions die wiederverwendet werden
const vec2Add = (ax: number, ay: number, bx: number, by: number) => ({ x: ax + bx, y: ay + by });
const vec2Sub = (ax: number, ay: number, bx: number, by: number) => ({ x: ax - bx, y: ay - by });
const vec2Mul = (x: number, y: number, s: number) => ({ x: x * s, y: y * s });
const vec2Dot = (ax: number, ay: number, bx: number, by: number) => ax * bx + ay * by;
const vec2Norm = (x: number, y: number) => {
    const mag = Math.sqrt(x * x + y * y);
    return { x: x / mag, y: y / mag };
};

class V2Composition {
    constructor(public x: number, public y: number) {}

    static add(v1: V2Composition, v2: V2Composition): V2Composition {
        const r = vec2Add(v1.x, v1.y, v2.x, v2.y);
        return new V2Composition(r.x, r.y);
    }
    static subtract(v1: V2Composition, v2: V2Composition): V2Composition {
        const r = vec2Sub(v1.x, v1.y, v2.x, v2.y);
        return new V2Composition(r.x, r.y);
    }
    static multiply(v: V2Composition, scalar: number): V2Composition {
        const r = vec2Mul(v.x, v.y, scalar);
        return new V2Composition(r.x, r.y);
    }
    static dot(v1: V2Composition, v2: V2Composition): number {
        return vec2Dot(v1.x, v1.y, v2.x, v2.y);
    }
    static normalize(v: V2Composition): V2Composition {
        const r = vec2Norm(v.x, v.y);
        return new V2Composition(r.x, r.y);
    }
}

// ============= BENCHMARK =============
function benchmark(name: string, fn: () => void, iterations: number): number {
    // Längeres Warmup für JIT-Optimierung
    for (let i = 0; i < 100000; i++) fn();

    // Mehrere Durchläufe, Median nehmen
    const runs: number[] = [];
    for (let run = 0; run < 5; run++) {
        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
            fn();
        }
        runs.push(performance.now() - start);
    }

    runs.sort((a, b) => a - b);
    const median = runs[2]; // Median von 5 Werten
    console.log(`${name}: ${median.toFixed(2)}ms (median of 5 runs)`);
    return median;
}

function runBenchmarks() {
    const ITERATIONS = 1_000_000;

    console.log('\n========================================');
    console.log('VECTOR MATH PERFORMANCE BENCHMARK');
    console.log('Comparing 4 approaches to code reuse');
    console.log('========================================\n');

    // Test vectors for all approaches
    const d1 = new V2Direct(3, 4);
    const d2 = new V2Direct(1, 2);
    const del1 = new V2Delegated(3, 4);
    const del2 = new V2Delegated(1, 2);
    const inh1 = new V2Inherited(3, 4);
    const inh2 = new V2Inherited(1, 2);
    const comp1 = new V2Composition(3, 4);
    const comp2 = new V2Composition(1, 2);

    console.log('--- ADD ---');
    const addDirect = benchmark('1. Direct     ', () => V2Direct.add(d1, d2), ITERATIONS);
    const addDeleg = benchmark('2. Delegated  ', () => V2Delegated.add(del1, del2), ITERATIONS);
    const addInher = benchmark('3. Inherited  ', () => V2Inherited.add(inh1, inh2), ITERATIONS);
    const addComp = benchmark('4. Composition', () => V2Composition.add(comp1, comp2), ITERATIONS);
    console.log('');

    console.log('--- NORMALIZE (complex operation) ---');
    const normDirect = benchmark('1. Direct     ', () => V2Direct.normalize(d1), ITERATIONS);
    const normDeleg = benchmark('2. Delegated  ', () => V2Delegated.normalize(del1), ITERATIONS);
    const normInher = benchmark('3. Inherited  ', () => V2Inherited.normalize(inh1), ITERATIONS);
    const normComp = benchmark('4. Composition', () => V2Composition.normalize(comp1), ITERATIONS);
    console.log('');

    console.log('--- COMPLEX: add + multiply + normalize ---');
    const cxDirect = benchmark('1. Direct     ', () => {
        const sum = V2Direct.add(d1, d2);
        const scaled = V2Direct.multiply(sum, 2);
        return V2Direct.normalize(scaled);
    }, ITERATIONS);
    const cxDeleg = benchmark('2. Delegated  ', () => {
        const sum = V2Delegated.add(del1, del2);
        const scaled = V2Delegated.multiply(sum, 2);
        return V2Delegated.normalize(scaled);
    }, ITERATIONS);
    const cxInher = benchmark('3. Inherited  ', () => {
        const sum = V2Inherited.add(inh1, inh2);
        const scaled = V2Inherited.multiply(sum, 2);
        return V2Inherited.normalize(scaled);
    }, ITERATIONS);
    const cxComp = benchmark('4. Composition', () => {
        const sum = V2Composition.add(comp1, comp2);
        const scaled = V2Composition.multiply(sum, 2);
        return V2Composition.normalize(scaled);
    }, ITERATIONS);

    console.log('\n========================================');
    console.log('SUMMARY (Complex Operation Overhead vs Direct)');
    console.log('========================================');
    console.log(`Delegated:   ${((cxDeleg / cxDirect - 1) * 100).toFixed(1)}%`);
    console.log(`Inherited:   ${((cxInher / cxDirect - 1) * 100).toFixed(1)}%`);
    console.log(`Composition: ${((cxComp / cxDirect - 1) * 100).toFixed(1)}%`);
    console.log('========================================\n');

    // Real-world context
    console.log('REAL-WORLD CONTEXT:');
    console.log(`- 1M operations = ${cxDirect.toFixed(1)}ms (Direct)`);
    console.log(`- At 60fps you have 16.6ms per frame`);
    console.log(`- A typical gen-art piece might do 10K-100K vector ops/frame`);
    console.log(`- 100K ops overhead: ~${((cxDeleg - cxDirect) / 10).toFixed(2)}ms`);
    console.log('');
}

runBenchmarks();

