import {
    lerp, inverseLerp, remap, map,
    clamp, saturate, fract, modWrap,
    step, pingPong,
    approximately, approxEqual,
    degToRad, radToDeg,
    smoothstep, smootherstep,
    swapVals,
    range, sum, average,
    shuffledCopy, first, last,
    PI, TAU, HALF_PI, GOLDENRATIO
} from '../index';

describe('Constants', () => {
    test('PI constants are correct', () => {
        expect(PI).toBeCloseTo(Math.PI, 10);
        expect(TAU).toBeCloseTo(Math.PI * 2, 10);
        expect(HALF_PI).toBeCloseTo(Math.PI / 2, 10);
    });

    test('GOLDENRATIO is correct', () => {
        expect(GOLDENRATIO).toBeCloseTo(1.61803398875, 10);
    });
});

describe('Angle conversion', () => {
    test('degToRad converts correctly', () => {
        expect(degToRad(0)).toBe(0);
        expect(degToRad(180)).toBeCloseTo(Math.PI, 10);
        expect(degToRad(90)).toBeCloseTo(Math.PI / 2, 10);
        expect(degToRad(360)).toBeCloseTo(Math.PI * 2, 10);
    });

    test('radToDeg converts correctly', () => {
        expect(radToDeg(0)).toBe(0);
        expect(radToDeg(Math.PI)).toBeCloseTo(180, 10);
        expect(radToDeg(Math.PI / 2)).toBeCloseTo(90, 10);
        expect(radToDeg(Math.PI * 2)).toBeCloseTo(360, 10);
    });
});

describe('Interpolation', () => {
    test('lerp works correctly', () => {
        expect(lerp(0, 100, 0)).toBe(0);
        expect(lerp(0, 100, 1)).toBe(100);
        expect(lerp(0, 100, 0.5)).toBe(50);
        expect(lerp(-10, 10, 0.5)).toBe(0);
    });

    test('inverseLerp works correctly', () => {
        expect(inverseLerp(0, 100, 0)).toBe(0);
        expect(inverseLerp(0, 100, 100)).toBe(1);
        expect(inverseLerp(0, 100, 50)).toBe(0.5);
    });

    test('remap works correctly', () => {
        expect(remap(50, 0, 100, 0, 1)).toBe(0.5);
        expect(remap(0, 0, 100, 0, 1)).toBe(0);
        expect(remap(100, 0, 100, 0, 1)).toBe(1);
        expect(remap(50, 0, 100, 0, 10)).toBe(5);
    });

    test('map works correctly', () => {
        expect(map(0.5, 0, 1, 0, 100)).toBe(50);
        expect(map(0, 0, 1, 0, 100)).toBe(0);
        expect(map(1, 0, 1, 0, 100)).toBe(100);
    });
});

describe('Clamping and wrapping', () => {
    test('clamp works correctly', () => {
        expect(clamp(0.5, 0, 1)).toBe(0.5);
        expect(clamp(-1, 0, 1)).toBe(0);
        expect(clamp(2, 0, 1)).toBe(1);
        expect(clamp(50, 0, 100)).toBe(50);
    });

    test('saturate clamps to 0-1', () => {
        expect(saturate(0.5)).toBe(0.5);
        expect(saturate(-0.5)).toBe(0);
        expect(saturate(1.5)).toBe(1);
    });

    test('fract returns fractional part', () => {
        expect(fract(3.7)).toBeCloseTo(0.7, 10);
        expect(fract(1.25)).toBeCloseTo(0.25, 10);
        expect(fract(5)).toBe(0);
    });

    test('modWrap wraps values', () => {
        expect(modWrap(0.5, 0, 1)).toBeCloseTo(0.5, 10);
        expect(modWrap(1.5, 0, 1)).toBeCloseTo(0.5, 10);
        expect(modWrap(-0.5, 0, 1)).toBeCloseTo(0.5, 10);
    });

    test('step function works', () => {
        expect(step(0.5, 0.3)).toBe(0);
        expect(step(0.5, 0.7)).toBe(1);
        expect(step(0.5, 0.5)).toBe(1);
    });

    test('pingPong bounces values', () => {
        expect(pingPong(0, 2)).toBe(0);
        expect(pingPong(1, 2)).toBe(1);
        expect(pingPong(2, 2)).toBe(2);
        expect(pingPong(3, 2)).toBe(1);
        expect(pingPong(4, 2)).toBe(0);
    });
});

describe('Smoothstep functions', () => {
    test('smoothstep works correctly', () => {
        expect(smoothstep(0, 1, 0)).toBe(0);
        expect(smoothstep(0, 1, 1)).toBe(1);
        expect(smoothstep(0, 1, 0.5)).toBe(0.5);
        expect(smoothstep(0, 1, -1)).toBe(0);
        expect(smoothstep(0, 1, 2)).toBe(1);
    });

    test('smootherstep works correctly', () => {
        expect(smootherstep(0, 1, 0)).toBe(0);
        expect(smootherstep(0, 1, 1)).toBe(1);
        expect(smootherstep(0, 1, 0.5)).toBe(0.5);
    });
});

describe('Comparison', () => {
    test('approximately works for float comparison', () => {
        expect(approximately(0.1 + 0.2, 0.3)).toBe(1);
        expect(approximately(0.1, 0.2)).toBe(0);
    });

    test('approxEqual returns boolean', () => {
        expect(approxEqual(0.1 + 0.2, 0.3)).toBe(true);
        expect(approxEqual(0.1, 0.2)).toBe(false);
    });
});

describe('swapVals', () => {
    test('swaps two number values', () => {
        const [a, b] = swapVals(1, 2);
        expect(a).toBe(2);
        expect(b).toBe(1);
    });

    test('swaps negative numbers', () => {
        const [a, b] = swapVals(-5, 10);
        expect(a).toBe(10);
        expect(b).toBe(-5);
    });
});

describe('Array utilities', () => {
    test('range creates number arrays', () => {
        expect(range(5)).toEqual([0, 1, 2, 3, 4]);
        expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
        expect(range(2, 5)).toEqual([2, 3, 4]);
        expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    });

    test('sum adds array elements', () => {
        expect(sum([1, 2, 3, 4, 5])).toBe(15);
        expect(sum([])).toBe(0);
    });

    test('average calculates mean', () => {
        expect(average([1, 2, 3, 4, 5])).toBe(3);
        expect(average([10, 20])).toBe(15);
        expect(average([])).toBe(0);
    });

    test('first returns first element', () => {
        expect(first([1, 2, 3])).toBe(1);
        expect(first([])).toBeUndefined();
    });

    test('last returns last element', () => {
        expect(last([1, 2, 3])).toBe(3);
        expect(last([])).toBeUndefined();
    });

    test('shuffledCopy returns new array', () => {
        const original = [1, 2, 3, 4, 5];
        const shuffled = shuffledCopy(original);
        expect(shuffled).not.toBe(original);
        expect(shuffled.length).toBe(original.length);
        expect(shuffled.sort()).toEqual(original.sort());
    });
});

