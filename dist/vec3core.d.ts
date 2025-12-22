/**
 * @fileoverview Shared core functions for 3D vector operations.
 * These pure functions are used by both V3 (mutable) and _V3 (immutable) classes
 * to eliminate code duplication while maintaining optimal performance.
 *
 * @internal This module is for internal use only and should not be exported publicly.
 */
/**
 * Interface for any object with x, y, and z coordinates.
 */
export interface IVec3 {
    x: number;
    y: number;
    z: number;
}
/** Computes the dot product of two 3D vectors */
export declare const vec3Dot: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => number;
/** Computes the squared magnitude of a 3D vector */
export declare const vec3SquareMag: (x: number, y: number, z: number) => number;
/** Computes the magnitude (length) of a 3D vector */
export declare const vec3Mag: (x: number, y: number, z: number) => number;
/** Computes the angle in the XY plane */
export declare const vec3AngleXY: (x: number, y: number) => number;
/** Computes the distance between two 3D vectors */
export declare const vec3Distance: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => number;
/** Checks if two 3D vectors are identical */
export declare const vec3SameLike: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => boolean;
/** Computes the angle between two 3D vectors */
export declare const vec3AngleBetween: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => number;
/** Adds two 3D vectors */
export declare const vec3Add: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => IVec3;
/** Subtracts vector b from vector a */
export declare const vec3Sub: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => IVec3;
/** Multiplies a 3D vector by a scalar */
export declare const vec3Mult: (x: number, y: number, z: number, scalar: number) => IVec3;
/** Divides a 3D vector by a scalar */
export declare const vec3Div: (x: number, y: number, z: number, scalar: number) => IVec3;
/** Computes a vector from point a to point b */
export declare const vec3FromTo: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => IVec3;
/** Computes the cross product of two 3D vectors */
export declare const vec3Cross: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => IVec3;
/** Normalizes a 3D vector to unit length */
export declare const vec3Normalize: (x: number, y: number, z: number) => IVec3;
/** Returns a 3D vector with absolute values */
export declare const vec3Abs: (x: number, y: number, z: number) => IVec3;
/** Returns the component-wise maximum of two 3D vectors */
export declare const vec3Max: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => IVec3;
/** Returns the component-wise minimum of two 3D vectors */
export declare const vec3Min: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => IVec3;
/** Negates a 3D vector */
export declare const vec3Negate: (x: number, y: number, z: number) => IVec3;
/** Floors the 3D vector components */
export declare const vec3Floor: (x: number, y: number, z: number) => IVec3;
/** Linearly interpolates between two 3D vectors */
export declare const vec3Lerp: (ax: number, ay: number, az: number, bx: number, by: number, bz: number, t: number) => IVec3;
/** Projects vector a onto vector b */
export declare const vec3Project: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => IVec3;
/** Reflects vector a across a normal vector n */
export declare const vec3Reflect: (ax: number, ay: number, az: number, nx: number, ny: number, nz: number) => IVec3;
/**
 * Transforms a 3D vector by a 4x4 matrix (with perspective division).
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param z - Z coordinate
 * @param m - 4x4 matrix as flat array (16 elements)
 * @returns The transformed vector
 */
export declare const vec3TransformCoordinates: (x: number, y: number, z: number, m: number[]) => IVec3;
/**
 * Multiplies a 3D vector by a 4x4 matrix (no perspective division).
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param z - Z coordinate
 * @param m - 4x4 matrix as flat array (16 elements)
 * @returns The transformed vector
 */
export declare const vec3MultiplyWithMatrix: (x: number, y: number, z: number, m: number[]) => IVec3;
