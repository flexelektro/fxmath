import { v2, V2 } from '../v2';

describe('V2 Class static methods', () => {
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

        const result2 = V2.subtract(a,a);
        expect(result2.x).toBe(0);
        expect(result2.y).toBe(0);
    });

    test('sub should correctly subtract two vectors', () => {
        const a = v2(5, 7);
        const b = v2(2, 3);
        const result = V2.sub(a, b);
        expect(result.x).toBe(3);
        expect(result.y).toBe(4);

        const result2 = V2.sub(a,a);
        expect(result2.x).toBe(0);
        expect(result2.y).toBe(0);
    });


    test('multiply should correctly multiply a vectore with a scalar',() => {
        const a = v2(5, 7);
        const b = v2(2, 3);
        const result1 = V2.multiply(a,2);
        expect(result1.x).toBe(10);
        expect(result1.y).toBe(14);
    })

    test('should compute the correct magnitude', () => {
        const a = v2(3, 4);
        expect(a.magnitude).toBeCloseTo(5);
    });
});
