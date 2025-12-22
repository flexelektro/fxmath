"use strict";
/**
 * @fileoverview Shared core functions for 2D vector operations.
 * These pure functions are used by both V2 (mutable) and _V2 (immutable) classes
 * to eliminate code duplication while maintaining optimal performance.
 *
 * @internal This module is for internal use only and should not be exported publicly.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.vec2IsPointInPolygon = exports.vec2LinesIntersect = exports.vec2Floor = exports.vec2Project = exports.vec2Lerp = exports.vec2NormalRight = exports.vec2NormalLeft = exports.vec2RotateAroundPivot = exports.vec2Rotate = exports.vec2Normalize = exports.vec2FromMagAngle = exports.vec2FromTo = exports.vec2MultVec = exports.vec2Div = exports.vec2Mult = exports.vec2Sub = exports.vec2Add = exports.vec2AngleBetween = exports.vec2SameLike = exports.vec2ManhattanDist = exports.vec2Angle = exports.vec2Mag = exports.vec2SquareMag = exports.vec2Cross = exports.vec2Dot = void 0;
const common_1 = require("./common");
// ============================================================================
// PURE COMPUTATION FUNCTIONS
// These return primitive values (numbers, booleans) - no factory needed
// ============================================================================
/** Computes the dot product of two vectors */
const vec2Dot = (ax, ay, bx, by) => ax * bx + ay * by;
exports.vec2Dot = vec2Dot;
/** Computes the cross product of two 2D vectors (returns scalar) */
const vec2Cross = (ax, ay, bx, by) => ax * by - ay * bx;
exports.vec2Cross = vec2Cross;
/** Computes the squared magnitude of a vector */
const vec2SquareMag = (x, y) => x * x + y * y;
exports.vec2SquareMag = vec2SquareMag;
/** Computes the magnitude (length) of a vector */
const vec2Mag = (x, y) => Math.sqrt(x * x + y * y);
exports.vec2Mag = vec2Mag;
/** Computes the angle of a vector in radians */
const vec2Angle = (x, y) => Math.atan2(y, x);
exports.vec2Angle = vec2Angle;
/** Computes the Manhattan distance between two vectors */
const vec2ManhattanDist = (ax, ay, bx, by) => Math.abs(ax - bx) + Math.abs(ay - by);
exports.vec2ManhattanDist = vec2ManhattanDist;
/** Checks if two vectors are identical */
const vec2SameLike = (ax, ay, bx, by) => ax === bx && ay === by;
exports.vec2SameLike = vec2SameLike;
/** Computes the angle between two vectors */
const vec2AngleBetween = (ax, ay, bx, by) => {
    const dot = (0, exports.vec2Dot)(ax, ay, bx, by);
    const magA = (0, exports.vec2Mag)(ax, ay);
    const magB = (0, exports.vec2Mag)(bx, by);
    return Math.acos(dot / (magA * magB));
};
exports.vec2AngleBetween = vec2AngleBetween;
// ============================================================================
// VECTOR-RETURNING FUNCTIONS
// These return {x, y} objects that can be used to construct any vector type
// ============================================================================
/** Adds two vectors */
const vec2Add = (ax, ay, bx, by) => ({ x: ax + bx, y: ay + by });
exports.vec2Add = vec2Add;
/** Subtracts vector b from vector a */
const vec2Sub = (ax, ay, bx, by) => ({ x: ax - bx, y: ay - by });
exports.vec2Sub = vec2Sub;
/** Multiplies a vector by a scalar */
const vec2Mult = (x, y, scalar) => ({ x: x * scalar, y: y * scalar });
exports.vec2Mult = vec2Mult;
/** Divides a vector by a scalar */
const vec2Div = (x, y, scalar) => ({ x: x / scalar, y: y / scalar });
exports.vec2Div = vec2Div;
/** Component-wise multiplication of two vectors (Hadamard product) */
const vec2MultVec = (ax, ay, bx, by) => ({ x: ax * bx, y: ay * by });
exports.vec2MultVec = vec2MultVec;
/** Computes a vector from point a to point b */
const vec2FromTo = (ax, ay, bx, by) => ({ x: bx - ax, y: by - ay });
exports.vec2FromTo = vec2FromTo;
/** Creates a vector from magnitude and angle */
const vec2FromMagAngle = (mag, angle) => ({ x: mag * Math.cos(angle), y: mag * Math.sin(angle) });
exports.vec2FromMagAngle = vec2FromMagAngle;
/** Normalizes a vector to unit length */
const vec2Normalize = (x, y) => {
    const mag = (0, exports.vec2Mag)(x, y);
    if (mag === 0)
        return { x: 0, y: 0 };
    return { x: x / mag, y: y / mag };
};
exports.vec2Normalize = vec2Normalize;
/** Rotates a vector around the origin */
const vec2Rotate = (x, y, angle) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { x: x * cos - y * sin, y: x * sin + y * cos };
};
exports.vec2Rotate = vec2Rotate;
/** Rotates a vector around a pivot point */
const vec2RotateAroundPivot = (x, y, pivotX, pivotY, angle) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const dx = x - pivotX;
    const dy = y - pivotY;
    return {
        x: cos * dx - sin * dy + pivotX,
        y: sin * dx + cos * dy + pivotY
    };
};
exports.vec2RotateAroundPivot = vec2RotateAroundPivot;
/** Computes the left normal (perpendicular, 90° counterclockwise) */
const vec2NormalLeft = (x, y) => ({ x: -y, y: x });
exports.vec2NormalLeft = vec2NormalLeft;
/** Computes the right normal (perpendicular, 90° clockwise) */
const vec2NormalRight = (x, y) => ({ x: y, y: -x });
exports.vec2NormalRight = vec2NormalRight;
/** Linearly interpolates between two vectors */
const vec2Lerp = (ax, ay, bx, by, t) => ({ x: (0, common_1.lerp)(ax, bx, t), y: (0, common_1.lerp)(ay, by, t) });
exports.vec2Lerp = vec2Lerp;
/** Projects vector a onto vector b */
const vec2Project = (ax, ay, bx, by) => {
    const unit = (0, exports.vec2Normalize)(bx, by);
    const dot = (0, exports.vec2Dot)(ax, ay, unit.x, unit.y);
    return { x: unit.x * dot, y: unit.y * dot };
};
exports.vec2Project = vec2Project;
/** Floors the vector components */
const vec2Floor = (x, y) => ({ x: Math.floor(x), y: Math.floor(y) });
exports.vec2Floor = vec2Floor;
// ============================================================================
// GEOMETRY FUNCTIONS
// ============================================================================
/**
 * Computes the intersection of two line segments.
 * @returns The intersection point or null if no intersection exists.
 */
const vec2LinesIntersect = (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) => {
    const denominator = (by2 - by1) * (ax2 - ax1) - (bx2 - bx1) * (ay2 - ay1);
    if (denominator === 0)
        return null; // Parallel lines
    const ua = ((bx2 - bx1) * (ay1 - by1) - (by2 - by1) * (ax1 - bx1)) / denominator;
    const ub = ((ax2 - ax1) * (ay1 - by1) - (ay2 - ay1) * (ax1 - bx1)) / denominator;
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1)
        return null;
    return {
        x: ax1 + ua * (ax2 - ax1),
        y: ay1 + ua * (ay2 - ay1)
    };
};
exports.vec2LinesIntersect = vec2LinesIntersect;
/**
 * Checks if a point is inside a polygon.
 */
const vec2IsPointInPolygon = (px, py, polygon) => {
    const len = polygon.length;
    let inside = false;
    for (let i = 0, j = len - 1; i < len; j = i++) {
        if ((polygon[i].y > py) !== (polygon[j].y > py) &&
            px < ((polygon[j].x - polygon[i].x) * (py - polygon[i].y)) /
                (polygon[j].y - polygon[i].y) + polygon[i].x) {
            inside = !inside;
        }
    }
    return inside;
};
exports.vec2IsPointInPolygon = vec2IsPointInPolygon;
//# sourceMappingURL=vec2core.js.map