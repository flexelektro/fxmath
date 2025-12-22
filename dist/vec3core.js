"use strict";
/**
 * @fileoverview Shared core functions for 3D vector operations.
 * These pure functions are used by both V3 (mutable) and _V3 (immutable) classes
 * to eliminate code duplication while maintaining optimal performance.
 *
 * @internal This module is for internal use only and should not be exported publicly.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec3MultiplyWithMatrix = exports.vec3TransformCoordinates = exports.vec3Reflect = exports.vec3Project = exports.vec3Lerp = exports.vec3Floor = exports.vec3Negate = exports.vec3Min = exports.vec3Max = exports.vec3Abs = exports.vec3Normalize = exports.vec3Cross = exports.vec3FromTo = exports.vec3Div = exports.vec3Mult = exports.vec3Sub = exports.vec3Add = exports.vec3AngleBetween = exports.vec3SameLike = exports.vec3Distance = exports.vec3AngleXY = exports.vec3Mag = exports.vec3SquareMag = exports.vec3Dot = void 0;
const common_1 = require("./common");
// ============================================================================
// PURE COMPUTATION FUNCTIONS
// These return primitive values (numbers, booleans) - no factory needed
// ============================================================================
/** Computes the dot product of two 3D vectors */
const vec3Dot = (ax, ay, az, bx, by, bz) => ax * bx + ay * by + az * bz;
exports.vec3Dot = vec3Dot;
/** Computes the squared magnitude of a 3D vector */
const vec3SquareMag = (x, y, z) => x * x + y * y + z * z;
exports.vec3SquareMag = vec3SquareMag;
/** Computes the magnitude (length) of a 3D vector */
const vec3Mag = (x, y, z) => Math.sqrt(x * x + y * y + z * z);
exports.vec3Mag = vec3Mag;
/** Computes the angle in the XY plane */
const vec3AngleXY = (x, y) => Math.atan2(x, y);
exports.vec3AngleXY = vec3AngleXY;
/** Computes the distance between two 3D vectors */
const vec3Distance = (ax, ay, az, bx, by, bz) => (0, exports.vec3Mag)(ax - bx, ay - by, az - bz);
exports.vec3Distance = vec3Distance;
/** Checks if two 3D vectors are identical */
const vec3SameLike = (ax, ay, az, bx, by, bz) => ax === bx && ay === by && az === bz;
exports.vec3SameLike = vec3SameLike;
/** Computes the angle between two 3D vectors */
const vec3AngleBetween = (ax, ay, az, bx, by, bz) => {
    const dot = (0, exports.vec3Dot)(ax, ay, az, bx, by, bz);
    const magA = (0, exports.vec3Mag)(ax, ay, az);
    const magB = (0, exports.vec3Mag)(bx, by, bz);
    return Math.acos(dot / (magA * magB));
};
exports.vec3AngleBetween = vec3AngleBetween;
// ============================================================================
// VECTOR-RETURNING FUNCTIONS
// These return {x, y, z} objects that can be used to construct any vector type
// ============================================================================
/** Adds two 3D vectors */
const vec3Add = (ax, ay, az, bx, by, bz) => ({ x: ax + bx, y: ay + by, z: az + bz });
exports.vec3Add = vec3Add;
/** Subtracts vector b from vector a */
const vec3Sub = (ax, ay, az, bx, by, bz) => ({ x: ax - bx, y: ay - by, z: az - bz });
exports.vec3Sub = vec3Sub;
/** Multiplies a 3D vector by a scalar */
const vec3Mult = (x, y, z, scalar) => ({ x: x * scalar, y: y * scalar, z: z * scalar });
exports.vec3Mult = vec3Mult;
/** Divides a 3D vector by a scalar */
const vec3Div = (x, y, z, scalar) => {
    if (scalar === 0) {
        throw Error("Division by 0");
    }
    const n = 1 / scalar;
    return { x: x * n, y: y * n, z: z * n };
};
exports.vec3Div = vec3Div;
/** Computes a vector from point a to point b */
const vec3FromTo = (ax, ay, az, bx, by, bz) => ({ x: bx - ax, y: by - ay, z: bz - az });
exports.vec3FromTo = vec3FromTo;
/** Computes the cross product of two 3D vectors */
const vec3Cross = (ax, ay, az, bx, by, bz) => ({
    x: ay * bz - az * by,
    y: az * bx - ax * bz,
    z: ax * by - ay * bx
});
exports.vec3Cross = vec3Cross;
/** Normalizes a 3D vector to unit length */
const vec3Normalize = (x, y, z) => {
    const mag = (0, exports.vec3Mag)(x, y, z) || 1;
    return { x: x / mag, y: y / mag, z: z / mag };
};
exports.vec3Normalize = vec3Normalize;
/** Returns a 3D vector with absolute values */
const vec3Abs = (x, y, z) => ({ x: Math.abs(x), y: Math.abs(y), z: Math.abs(z) });
exports.vec3Abs = vec3Abs;
/** Returns the component-wise maximum of two 3D vectors */
const vec3Max = (ax, ay, az, bx, by, bz) => ({ x: Math.max(ax, bx), y: Math.max(ay, by), z: Math.max(az, bz) });
exports.vec3Max = vec3Max;
/** Returns the component-wise minimum of two 3D vectors */
const vec3Min = (ax, ay, az, bx, by, bz) => ({ x: Math.min(ax, bx), y: Math.min(ay, by), z: Math.min(az, bz) });
exports.vec3Min = vec3Min;
/** Negates a 3D vector */
const vec3Negate = (x, y, z) => ({ x: -x, y: -y, z: -z });
exports.vec3Negate = vec3Negate;
/** Floors the 3D vector components */
const vec3Floor = (x, y, z) => ({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z) });
exports.vec3Floor = vec3Floor;
/** Linearly interpolates between two 3D vectors */
const vec3Lerp = (ax, ay, az, bx, by, bz, t) => ({ x: (0, common_1.lerp)(ax, bx, t), y: (0, common_1.lerp)(ay, by, t), z: (0, common_1.lerp)(az, bz, t) });
exports.vec3Lerp = vec3Lerp;
/** Projects vector a onto vector b */
const vec3Project = (ax, ay, az, bx, by, bz) => {
    const unit = (0, exports.vec3Normalize)(bx, by, bz);
    const dot = (0, exports.vec3Dot)(ax, ay, az, unit.x, unit.y, unit.z);
    return { x: unit.x * dot, y: unit.y * dot, z: unit.z * dot };
};
exports.vec3Project = vec3Project;
/** Reflects vector a across a normal vector n */
const vec3Reflect = (ax, ay, az, nx, ny, nz) => {
    const dot2 = 2 * (0, exports.vec3Dot)(ax, ay, az, nx, ny, nz);
    return {
        x: ax - dot2 * nx,
        y: ay - dot2 * ny,
        z: az - dot2 * nz
    };
};
exports.vec3Reflect = vec3Reflect;
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
const vec3TransformCoordinates = (x, y, z, m) => {
    const rx = x * m[0] + y * m[4] + z * m[8] + m[12];
    const ry = x * m[1] + y * m[5] + z * m[9] + m[13];
    const rz = x * m[2] + y * m[6] + z * m[10] + m[14];
    const rw = x * m[3] + y * m[7] + z * m[11] + m[15];
    return { x: rx / rw, y: ry / rw, z: rz };
};
exports.vec3TransformCoordinates = vec3TransformCoordinates;
/**
 * Multiplies a 3D vector by a 4x4 matrix (no perspective division).
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param z - Z coordinate
 * @param m - 4x4 matrix as flat array (16 elements)
 * @returns The transformed vector
 */
const vec3MultiplyWithMatrix = (x, y, z, m) => {
    const rx = x * m[0] + y * m[4] + z * m[8] + m[12];
    const ry = x * m[1] + y * m[5] + z * m[9] + m[13];
    const rz = x * m[2] + y * m[6] + z * m[10] + m[14];
    return { x: rx, y: ry, z: rz };
};
exports.vec3MultiplyWithMatrix = vec3MultiplyWithMatrix;
//# sourceMappingURL=vec3core.js.map