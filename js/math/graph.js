import Point from "../primitives/point.js";
import Segment from "../primitives/segment.js";

/**
 * A graph of points and segments
 */
class Graph {
  /**
   * @param {Point[]} points
   * @param {Segment[]} segments
   */
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  /**
   * Add a point to the graph
   *
   * @param {Point} point
   */
  addPoint(point) {
    this.points.push(point);
  }

  /**
   * Check if the graph contains a point
   *
   * @param {Point} point
   * @returns {boolean}
   */
  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  /**
   * Try to add a point to the graph
   * Returns true if the point was added, false otherwise
   * @param {Point} point
   * @returns {boolean}
   */
  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  /**
   * Remove a point from the graph
   * @param {Point} point
   */
  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  /**
   * Add a segment to the graph
   * @param {Segment} seg
   */
  addSegment(seg) {
    this.segments.push(seg);
  }

  /**
   * Check if the graph contains a segment
   * @param {Segment} seg
   * @returns {boolean}
   */
  containsSegment(seg) {
    return this.segments.find((s) => s.equals(seg));
  }

  /**
   * Try to add a segment to the graph
   * Returns true if the segment was added, false otherwise
   * @param {Segment} seg
   * @returns {boolean}
   */
  tryAddSegment(seg) {
    if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  /**
   * Remove a segment from the graph
   * @param {Segment} seg
   */
  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  /**
   * Get all segments that contain a point
   * @param {Point} point
   * @returns {Segment[]}
   */
  getSegmentsWithPoint(point) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segs.push(seg);
      }
    }
    return segs;
  }

  /**
   * Clear the graph
   */
  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  /**
   * Draw the graph
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}

export default Graph;
