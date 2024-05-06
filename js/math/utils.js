import Point from "../primitives/point.js";

/**
 * Get the nearest point to a location
 *
 * @param {Point} loc
 * @param {Point[]} points
 * @param {Number} threshold
 * @returns
 */
function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER) {
  let minDist = Number.MAX_SAFE_INTEGER;
  let nearest = null;
  for (const point of points) {
    const dist = distance(point, loc);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearest = point;
    }
  }
  return nearest;
}

/**
 * Calculate the distance between two points
 *
 * @param {Point} p1
 * @param {Point} p2
 * @returns {Number}
 */
function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export { getNearestPoint };
