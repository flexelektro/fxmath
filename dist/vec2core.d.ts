/**
 * @fileoverview Shared core functions for 2D vector operations.
 * These pure functions are used by both V2 (mutable) and _V2 (immutable) classes
 * to eliminate code duplication while maintaining optimal performance.
 *
 * @internal This module is for internal use only and should not be exported publicly.
 */
/**
 * Interface for any object with x and y coordinates.
 */
export interface IVec2 {
    x: number;
    y: number;
}
/** Computes the dot product of two vectors */
export declare const vec2Dot: (ax: number, ay: number, bx: number, by: number) => number;
/** Computes the cross product of two 2D vectors (returns scalar) */
export declare const vec2Cross: (ax: number, ay: number, bx: number, by: number) => number;
/** Computes the squared magnitude of a vector */
export declare const vec2SquareMag: (x: number, y: number) => number;
/** Computes the magnitude (length) of a vector */
export declare const vec2Mag: (x: number, y: number) => number;
/** Computes the angle of a vector in radians */
export declare const vec2Angle: (x: number, y: number) => number;
/** Computes the Manhattan distance between two vectors */
export declare const vec2ManhattanDist: (ax: number, ay: number, bx: number, by: number) => number;
/** Checks if two vectors are identical */
export declare const vec2SameLike: (ax: number, ay: number, bx: number, by: number) => boolean;
/** Computes the angle between two vectors */
export declare const vec2AngleBetween: (ax: number, ay: number, bx: number, by: number) => number;
/** Adds two vectors */
export declare const vec2Add: (ax: number, ay: number, bx: number, by: number) => IVec2;
/** Subtracts vector b from vector a */
export declare const vec2Sub: (ax: number, ay: number, bx: number, by: number) => IVec2;
/** Multiplies a vector by a scalar */
export declare const vec2Mult: (x: number, y: number, scalar: number) => IVec2;
/** Divides a vector by a scalar */
export declare const vec2Div: (x: number, y: number, scalar: number) => IVec2;
/** Component-wise multiplication of two vectors (Hadamard product) */
export declare const vec2MultVec: (ax: number, ay: number, bx: number, by: number) => IVec2;
/** Computes a vector from point a to point b */
export declare const vec2FromTo: (ax: number, ay: number, bx: number, by: number) => IVec2;
/** Creates a vector from magnitude and angle */
export declare const vec2FromMagAngle: (mag: number, angle: number) => IVec2;
/** Normalizes a vector to unit length */
export declare const vec2Normalize: (x: number, y: number) => IVec2;
/** Rotates a vector around the origin */
export declare const vec2Rotate: (x: number, y: number, angle: number) => IVec2;
/** Rotates a vector around a pivot point */
export declare const vec2RotateAroundPivot: (x: number, y: number, pivotX: number, pivotY: number, angle: number) => IVec2;
/** Computes the left normal (perpendicular, 90° counterclockwise) */
export declare const vec2NormalLeft: (x: number, y: number) => IVec2;
/** Computes the right normal (perpendicular, 90° clockwise) */
export declare const vec2NormalRight: (x: number, y: number) => IVec2;
/** Linearly interpolates between two vectors */
export declare const vec2Lerp: (ax: number, ay: number, bx: number, by: number, t: number) => IVec2;
/** Projects vector a onto vector b */
export declare const vec2Project: (ax: number, ay: number, bx: number, by: number) => IVec2;
/** Floors the vector components */
export declare const vec2Floor: (x: number, y: number) => IVec2;
/**
 * Computes the intersection of two line segments.
 * @returns The intersection point or null if no intersection exists.
 */
export declare const vec2LinesIntersect: (ax1: number, ay1: number, ax2: number, ay2: number, bx1: number, by1: number, bx2: number, by2: number) => IVec2 | null;
/**
 * Checks if a point is inside a polygon.
 */
export declare const vec2IsPointInPolygon: (px: number, py: number, polygon: IVec2[]) => boolean;
