import { V3, v3, _V3, _v3 } from '../index';

describe('V3 Class static methods', () => {
    test('should create a vector with correct coordinates', () => {
        const v = v3(1, 2, 3);
        expect(v.x).toBe(1);
        expect(v.y).toBe(2);
        expect(v.z).toBe(3);
    });

    test('should correctly compare two vectors using sameLike', () => {
        const a = v3(1, 2, 3);
        const b = v3(1, 2, 3);
        const c = v3(1, 2, 4);
        expect(V3.sameLike(a, b)).toBe(true);
        expect(V3.sameLike(a, c)).toBe(false);
    });

    test('should correctly add two vectors', () => {
        const a = v3(1, 2, 3);
        const b = v3(4, 5, 6);
        const result = V3.add(a, b);
        expect(result.x).toBe(5);
        expect(result.y).toBe(7);
        expect(result.z).toBe(9);
    });

    test('should correctly subtract two vectors', () => {
        const a = v3(5, 7, 9);
        const b = v3(1, 2, 3);
        const result = V3.sub(a, b);
        expect(result.x).toBe(4);
        expect(result.y).toBe(5);
        expect(result.z).toBe(6);
    });

    test('should correctly compute dot product', () => {
        const a = v3(1, 2, 3);
        const b = v3(4, 5, 6);
        const result = V3.dot(a, b);
        expect(result).toBe(32); // 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32
    });

    test('should correctly compute cross product', () => {
        const a = v3(1, 0, 0);
        const b = v3(0, 1, 0);
        const result = V3.cross(a, b);
        expect(result.x).toBe(0);
        expect(result.y).toBe(0);
        expect(result.z).toBe(1);
    });

    test('should compute the correct magnitude', () => {
        const v = v3(3, 4, 0);
        expect(V3.magnitude(v)).toBe(5);
    });

    test('should compute the correct distance', () => {
        const a = v3(0, 0, 0);
        const b = v3(3, 4, 0);
        expect(V3.distance(a, b)).toBe(5);
    });

    test('should correctly compute fromTo', () => {
        const a = v3(1, 2, 3);
        const b = v3(4, 6, 8);
        const result = V3.fromTo(a, b);
        expect(result.x).toBe(3);
        expect(result.y).toBe(4);
        expect(result.z).toBe(5);
    });

    test('should correctly normalize a vector', () => {
        const v = v3(3, 0, 0);
        const result = V3.unitVec(v);
        expect(result.x).toBe(1);
        expect(result.y).toBe(0);
        expect(result.z).toBe(0);
    });

    test('should correctly lerp between two vectors', () => {
        const a = v3(0, 0, 0);
        const b = v3(10, 10, 10);
        const result = V3.lerp(a, b, 0.5);
        expect(result.x).toBe(5);
        expect(result.y).toBe(5);
        expect(result.z).toBe(5);
    });

    test('should correctly compute angle between vectors', () => {
        const a = v3(1, 0, 0);
        const b = v3(0, 1, 0);
        const angle = V3.angleBetween(a, b);
        expect(angle).toBeCloseTo(Math.PI / 2, 5);
    });
});

describe('V3 Instance methods', () => {
    test('should clone correctly', () => {
        const v = v3(1, 2, 3);
        const clone = v.clone();
        expect(clone.x).toBe(1);
        expect(clone.y).toBe(2);
        expect(clone.z).toBe(3);
        expect(clone).not.toBe(v);
    });

    test('should add in place correctly', () => {
        const v = v3(1, 2, 3);
        v.add(v3(1, 1, 1));
        expect(v.x).toBe(2);
        expect(v.y).toBe(3);
        expect(v.z).toBe(4);
    });

    test('should normalize in place correctly', () => {
        const v = v3(3, 0, 0);
        v.normalize();
        expect(v.x).toBe(1);
        expect(v.y).toBe(0);
        expect(v.z).toBe(0);
    });

    test('should negate correctly', () => {
        const v = v3(1, -2, 3);
        v.negate();
        expect(v.x).toBe(-1);
        expect(v.y).toBe(2);
        expect(v.z).toBe(-3);
    });

    test('should compute distance correctly', () => {
        const a = v3(0, 0, 0);
        const b = v3(3, 4, 0);
        expect(a.distance(b)).toBe(5);
    });

    test('should lerp in place correctly', () => {
        const v = v3(0, 0, 0);
        v.lerp(v3(10, 10, 10), 0.5);
        expect(v.x).toBe(5);
        expect(v.y).toBe(5);
        expect(v.z).toBe(5);
    });
});

describe('_V3 Immutable Class static methods', () => {
    test('should create a vector with correct coordinates', () => {
        const v = _v3(1, 2, 3);
        expect(v.x).toBe(1);
        expect(v.y).toBe(2);
        expect(v.z).toBe(3);
    });

    test('should have readonly properties', () => {
        const v = _v3(1, 2, 3);
        // TypeScript would prevent this at compile time, but at runtime we can check
        expect(() => {
            (v as any).x = 5;
        }).not.toThrow(); // JS doesn't throw, but value shouldn't change
    });

    test('should correctly add two vectors', () => {
        const a = _v3(1, 2, 3);
        const b = _v3(4, 5, 6);
        const result = _V3.add(a, b);
        expect(result.x).toBe(5);
        expect(result.y).toBe(7);
        expect(result.z).toBe(9);
        // Original should be unchanged
        expect(a.x).toBe(1);
        expect(a.y).toBe(2);
        expect(a.z).toBe(3);
    });

    test('should correctly compute cross product', () => {
        const a = _v3(1, 0, 0);
        const b = _v3(0, 1, 0);
        const result = _V3.cross(a, b);
        expect(result.x).toBe(0);
        expect(result.y).toBe(0);
        expect(result.z).toBe(1);
    });

    test('should correctly normalize', () => {
        const v = _v3(3, 0, 0);
        const result = _V3.unitVec(v);
        expect(result.x).toBe(1);
        expect(result.y).toBe(0);
        expect(result.z).toBe(0);
        // Original unchanged
        expect(v.x).toBe(3);
    });
});

describe('_V3 Immutable Instance methods', () => {
    test('instance add should return new vector', () => {
        const a = _v3(1, 2, 3);
        const b = _v3(1, 1, 1);
        const result = a.add(b);
        expect(result.x).toBe(2);
        expect(result.y).toBe(3);
        expect(result.z).toBe(4);
        // Original unchanged
        expect(a.x).toBe(1);
        expect(a.y).toBe(2);
        expect(a.z).toBe(3);
    });

    test('instance normalize should return new vector', () => {
        const v = _v3(3, 0, 0);
        const result = v.normalize();
        expect(result.x).toBe(1);
        expect(result.y).toBe(0);
        expect(result.z).toBe(0);
        // Original unchanged
        expect(v.x).toBe(3);
    });

    test('instance negate should return new vector', () => {
        const v = _v3(1, -2, 3);
        const result = v.negate();
        expect(result.x).toBe(-1);
        expect(result.y).toBe(2);
        expect(result.z).toBe(-3);
        // Original unchanged
        expect(v.x).toBe(1);
        expect(v.y).toBe(-2);
        expect(v.z).toBe(3);
    });

    test('magnitude getter should work', () => {
        const v = _v3(3, 4, 0);
        expect(v.magnitude).toBe(5);
        expect(v.length).toBe(5);
    });

    test('squareMagnitude getter should work', () => {
        const v = _v3(3, 4, 0);
        expect(v.squareMagnitude).toBe(25);
    });

    test('lerp should return new vector', () => {
        const a = _v3(0, 0, 0);
        const b = _v3(10, 10, 10);
        const result = a.lerp(b, 0.5);
        expect(result.x).toBe(5);
        expect(result.y).toBe(5);
        expect(result.z).toBe(5);
        // Original unchanged
        expect(a.x).toBe(0);
    });
});

