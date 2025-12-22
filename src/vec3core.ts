/**
 * @fileoverview Shared core functions for 3D vector operations.
 * These pure functions are used by both V3 (mutable) and _V3 (immutable) classes
 * to eliminate code duplication while maintaining optimal performance.
 *
 * @internal This module is for internal use only and should not be exported publicly.
 */

import { lerp } from "./common";

/**
 * Interface for any object with x, y, and z coordinates.
 */
export interface IVec3 {
    x: number;
    y: number;
    z: number;
}

// ============================================================================
// PURE COMPUTATION FUNCTIONS
// These return primitive values (numbers, booleans) - no factory needed
// ============================================================================

/** Computes the dot product of two 3D vectors */
export const vec3Dot = (ax: number, ay: number, az: number, bx: number, by: number, bz: number): number =>
    ax * bx + ay * by + az * bz;

/** Computes the squared magnitude of a 3D vector */
export const vec3SquareMag = (x: number, y: number, z: number): number =>
    x * x + y * y + z * z;

/** Computes the magnitude (length) of a 3D vector */
export const vec3Mag = (x: number, y: number, z: number): number =>
    Math.sqrt(x * x + y * y + z * z);

/** Computes the angle in the XY plane */
export const vec3AngleXY = (x: number, y: number): number =>
    Math.atan2(x, y);

/** Computes the distance between two 3D vectors */
export const vec3Distance = (ax: number, ay: number, az: number, bx: number, by: number, bz: number): number =>
    vec3Mag(ax - bx, ay - by, az - bz);

/** Checks if two 3D vectors are identical */
export const vec3SameLike = (ax: number, ay: number, az: number, bx: number, by: number, bz: number): boolean =>
    ax === bx && ay === by && az === bz;

/** Computes the angle between two 3D vectors */
export const vec3AngleBetween = (ax: number, ay: number, az: number, bx: number, by: number, bz: number): number => {
    const dot = vec3Dot(ax, ay, az, bx, by, bz);
    const magA = vec3Mag(ax, ay, az);
    const magB = vec3Mag(bx, by, bz);
    return Math.acos(dot / (magA * magB));
};

// ============================================================================
// VECTOR-RETURNING FUNCTIONS
// These return {x, y, z} objects that can be used to construct any vector type
// ============================================================================

/** Adds two 3D vectors */
export const vec3Add = (ax: number, ay: number, az: number, bx: number, by: number, bz: number): IVec3 =>
    ({ x: ax + bx, y: ay + by, z: az + bz });

/** Subtracts vector b from vector a */
export const vec3Sub = (ax: number, ay: number, az: number, bx: number, by: number, bz: number): IVec3 =>
    ({ x: ax - bx, y: ay - by, z: az - bz });

/** Multiplies a 3D vector by a scalar */
export const vec3Mult = (x: number, y: number, z: number, scalar: number): IVec3 =>
    ({ x: x * scalar, y: y * scalar, z: z * scalar });

/** Divides a 3D vector by a scalar */
export const vec3Div = (x: number, y: number, z: number, scalar: number): IVec3 => {
    if (scalar === 0) {
        throw Error("Division by 0");
    }
    const n = 1 / scalar;
    return { x: x * n, y: y * n, z: z * n };
};

/** Computes a vector from point a to point b */
export const vec3FromTo = (ax: number, ay: number, az: number, bx: number, by: number, bz: number): IVec3 =>
    ({ x: bx - ax, y: by - ay, z: bz - az });

/** Computes the cross product of two 3D vectors */
export const vec3Cross = (ax: number, ay: number, az: number, bx: number, by: number, bz: number): IVec3 =>
    ({
        x: ay * bz - az * by,
        y: az * bx - ax * bz,
        z: ax * by - ay * bx
    });

/** Normalizes a 3D vector to unit length */
export const vec3Normalize = (x: number, y: number, z: number): IVec3 => {
    const mag = vec3Mag(x, y, z) || 1;
    return { x: x / mag, y: y / mag, z: z / mag };
};

/** Returns a 3D vector with absolute values */
export const vec3Abs = (x: number, y: number, z: number): IVec3 =>
    ({ x: Math.abs(x), y: Math.abs(y), z: Math.abs(z) });

/** Returns the component-wise maximum of two 3D vectors */
export const vec3Max = (ax: number, ay: number, az: number, bx: number, by: number, bz: number): IVec3 =>
    ({ x: Math.max(ax, bx), y: Math.max(ay, by), z: Math.max(az, bz) });

/** Returns the component-wise minimum of two 3D vectors */
export const vec3Min = (ax: number, ay: number, az: number, bx: number, by: number, bz: number): IVec3 =>
    ({ x: Math.min(ax, bx), y: Math.min(ay, by), z: Math.min(az, bz) });

/** Negates a 3D vector */
export const vec3Negate = (x: number, y: number, z: number): IVec3 =>
    ({ x: -x, y: -y, z: -z });

/** Floors the 3D vector components */
export const vec3Floor = (x: number, y: number, z: number): IVec3 =>
    ({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z) });

/** Linearly interpolates between two 3D vectors */
export const vec3Lerp = (ax: number, ay: number, az: number, bx: number, by: number, bz: number, t: number): IVec3 =>
    ({ x: lerp(ax, bx, t), y: lerp(ay, by, t), z: lerp(az, bz, t) });

/** Projects vector a onto vector b */
export const vec3Project = (ax: number, ay: number, az: number, bx: number, by: number, bz: number): IVec3 => {
    const unit = vec3Normalize(bx, by, bz);
    const dot = vec3Dot(ax, ay, az, unit.x, unit.y, unit.z);
    return { x: unit.x * dot, y: unit.y * dot, z: unit.z * dot };
};

/** Reflects vector a across a normal vector n */
export const vec3Reflect = (ax: number, ay: number, az: number, nx: number, ny: number, nz: number): IVec3 => {
    const dot2 = 2 * vec3Dot(ax, ay, az, nx, ny, nz);
    return {
        x: ax - dot2 * nx,
        y: ay - dot2 * ny,
        z: az - dot2 * nz
    };
};

// ============================================================================
// MATRIX TRANSFORMATION FUNCTIONS
// ============================================================================

/**
 * Transforms a 3D vector by a 4x4 matrix (with perspective division).
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param z - Z coordinate
 * @param m - 4x4 matrix as flat array (16 elements)
 * @returns The transformed vector
 */
export const vec3TransformCoordinates = (x: number, y: number, z: number, m: number[]): IVec3 => {
    const rx = x * m[0] + y * m[4] + z * m[8] + m[12];
    const ry = x * m[1] + y * m[5] + z * m[9] + m[13];
    const rz = x * m[2] + y * m[6] + z * m[10] + m[14];
    const rw = x * m[3] + y * m[7] + z * m[11] + m[15];
    return { x: rx / rw, y: ry / rw, z: rz };
};

/**
 * Multiplies a 3D vector by a 4x4 matrix (no perspective division).
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param z - Z coordinate
 * @param m - 4x4 matrix as flat array (16 elements)
 * @returns The transformed vector
 */
export const vec3MultiplyWithMatrix = (x: number, y: number, z: number, m: number[]): IVec3 => {
    const rx = x * m[0] + y * m[4] + z * m[8] + m[12];
    const ry = x * m[1] + y * m[5] + z * m[9] + m[13];
    const rz = x * m[2] + y * m[6] + z * m[10] + m[14];
    return { x: rx, y: ry, z: rz };
};

