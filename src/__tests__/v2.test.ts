import { v2, V2 } from '../v2';

describe('V2 Class', () => {
    test('should create a vector with correct coordinates', () => {
        const vector = v2(3, 4);
        expect(vector.x).toBe(3);
        expect(vector.y).toBe(4);
    });

    test('should correctly compare two vectors using sameLike', () => {
        const a = v2(1, 2);
        const b = v2(1, 2);
        const c = v2(2, 3);
        expect(V2.sameLike(a, b)).toBe(true);
        expect(V2.sameLike(a, c)).toBe(false);
    });

    test('should correctly add two vectors', () => {
        const a = v2(1, 2);
        const b = v2(3, 4);
        const result = V2.add(a, b);
        expect(result.x).toBe(4);
        expect(result.y).toBe(6);
    });

    test('should correctly subtract two vectors', () => {
        const a = v2(5, 7);
        const b = v2(2, 3);
        const result = V2.subtract(a, b);
        expect(result.x).toBe(3);
        expect(result.y).toBe(4);
    });

    test('should compute the correct magnitude', () => {
        const a = v2(3, 4);
        expect(a.magnitude).toBeCloseTo(5);
    });
});
