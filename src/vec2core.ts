/**
 * @fileoverview Shared core functions for 2D vector operations.
 * These pure functions are used by both V2 (mutable) and _V2 (immutable) classes
 * to eliminate code duplication while maintaining optimal performance.
 *
 * @internal This module is for internal use only and should not be exported publicly.
 */

import { lerp } from "./common";

/**
 * Interface for any object with x and y coordinates.
 */
export interface IVec2 {
    x: number;
    y: number;
}

// ============================================================================
// PURE COMPUTATION FUNCTIONS
// These return primitive values (numbers, booleans) - no factory needed
// ============================================================================

/** Computes the dot product of two vectors */
export const vec2Dot = (ax: number, ay: number, bx: number, by: number): number =>
    ax * bx + ay * by;

/** Computes the cross product of two 2D vectors (returns scalar) */
export const vec2Cross = (ax: number, ay: number, bx: number, by: number): number =>
    ax * by - ay * bx;

/** Computes the squared magnitude of a vector */
export const vec2SquareMag = (x: number, y: number): number =>
    x * x + y * y;

/** Computes the magnitude (length) of a vector */
export const vec2Mag = (x: number, y: number): number =>
    Math.sqrt(x * x + y * y);

/** Computes the angle of a vector in radians */
export const vec2Angle = (x: number, y: number): number =>
    Math.atan2(y, x);

/** Computes the Manhattan distance between two vectors */
export const vec2ManhattanDist = (ax: number, ay: number, bx: number, by: number): number =>
    Math.abs(ax - bx) + Math.abs(ay - by);

/** Checks if two vectors are identical */
export const vec2SameLike = (ax: number, ay: number, bx: number, by: number): boolean =>
    ax === bx && ay === by;

/** Computes the angle between two vectors */
export const vec2AngleBetween = (ax: number, ay: number, bx: number, by: number): number => {
    const dot = vec2Dot(ax, ay, bx, by);
    const magA = vec2Mag(ax, ay);
    const magB = vec2Mag(bx, by);
    return Math.acos(dot / (magA * magB));
};

// ============================================================================
// VECTOR-RETURNING FUNCTIONS
// These return {x, y} objects that can be used to construct any vector type
// ============================================================================

/** Adds two vectors */
export const vec2Add = (ax: number, ay: number, bx: number, by: number): IVec2 =>
    ({ x: ax + bx, y: ay + by });

/** Subtracts vector b from vector a */
export const vec2Sub = (ax: number, ay: number, bx: number, by: number): IVec2 =>
    ({ x: ax - bx, y: ay - by });

/** Multiplies a vector by a scalar */
export const vec2Mult = (x: number, y: number, scalar: number): IVec2 =>
    ({ x: x * scalar, y: y * scalar });

/** Divides a vector by a scalar */
export const vec2Div = (x: number, y: number, scalar: number): IVec2 =>
    ({ x: x / scalar, y: y / scalar });

/** Component-wise multiplication of two vectors (Hadamard product) */
export const vec2MultVec = (ax: number, ay: number, bx: number, by: number): IVec2 =>
    ({ x: ax * bx, y: ay * by });

/** Computes a vector from point a to point b */
export const vec2FromTo = (ax: number, ay: number, bx: number, by: number): IVec2 =>
    ({ x: bx - ax, y: by - ay });

/** Creates a vector from magnitude and angle */
export const vec2FromMagAngle = (mag: number, angle: number): IVec2 =>
    ({ x: mag * Math.cos(angle), y: mag * Math.sin(angle) });

/** Normalizes a vector to unit length */
export const vec2Normalize = (x: number, y: number): IVec2 => {
    const mag = vec2Mag(x, y);
    if (mag === 0) return { x: 0, y: 0 };
    return { x: x / mag, y: y / mag };
};

/** Rotates a vector around the origin */
export const vec2Rotate = (x: number, y: number, angle: number): IVec2 => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { x: x * cos - y * sin, y: x * sin + y * cos };
};

/** Rotates a vector around a pivot point */
export const vec2RotateAroundPivot = (
    x: number, y: number,
    pivotX: number, pivotY: number,
    angle: number
): IVec2 => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const dx = x - pivotX;
    const dy = y - pivotY;
    return {
        x: cos * dx - sin * dy + pivotX,
        y: sin * dx + cos * dy + pivotY
    };
};

/** Computes the left normal (perpendicular, 90° counterclockwise) */
export const vec2NormalLeft = (x: number, y: number): IVec2 =>
    ({ x: -y, y: x });

/** Computes the right normal (perpendicular, 90° clockwise) */
export const vec2NormalRight = (x: number, y: number): IVec2 =>
    ({ x: y, y: -x });

/** Linearly interpolates between two vectors */
export const vec2Lerp = (ax: number, ay: number, bx: number, by: number, t: number): IVec2 =>
    ({ x: lerp(ax, bx, t), y: lerp(ay, by, t) });

/** Projects vector a onto vector b */
export const vec2Project = (ax: number, ay: number, bx: number, by: number): IVec2 => {
    const unit = vec2Normalize(bx, by);
    const dot = vec2Dot(ax, ay, unit.x, unit.y);
    return { x: unit.x * dot, y: unit.y * dot };
};

/** Floors the vector components */
export const vec2Floor = (x: number, y: number): IVec2 =>
    ({ x: Math.floor(x), y: Math.floor(y) });

// ============================================================================
// GEOMETRY FUNCTIONS
// ============================================================================

/**
 * Computes the intersection of two line segments.
 * @returns The intersection point or null if no intersection exists.
 */
export const vec2LinesIntersect = (
    ax1: number, ay1: number, ax2: number, ay2: number,
    bx1: number, by1: number, bx2: number, by2: number
): IVec2 | null => {
    const denominator = (by2 - by1) * (ax2 - ax1) - (bx2 - bx1) * (ay2 - ay1);

    if (denominator === 0) return null; // Parallel lines

    const ua = ((bx2 - bx1) * (ay1 - by1) - (by2 - by1) * (ax1 - bx1)) / denominator;
    const ub = ((ax2 - ax1) * (ay1 - by1) - (ay2 - ay1) * (ax1 - bx1)) / denominator;

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return null;

    return {
        x: ax1 + ua * (ax2 - ax1),
        y: ay1 + ua * (ay2 - ay1)
    };
};

/**
 * Checks if a point is inside a polygon.
 */
export const vec2IsPointInPolygon = (px: number, py: number, polygon: IVec2[]): boolean => {
    const len = polygon.length;
    let inside = false;

    for (let i = 0, j = len - 1; i < len; j = i++) {
        if (
            (polygon[i].y > py) !== (polygon[j].y > py) &&
            px < ((polygon[j].x - polygon[i].x) * (py - polygon[i].y)) /
                 (polygon[j].y - polygon[i].y) + polygon[i].x
        ) {
            inside = !inside;
        }
    }

    return inside;
};

