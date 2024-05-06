import Point from "./point.js";

/**
 * Segment class
 */
class Segment {
  /**
   * Create a new segment
   *
   * @param {Point} p1
   * @param {Point} p2
   * @returns {Segment}
   */
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  /**
   * Check if two segments are equal
   *
   * @param {Segment} seg
   * @returns {Boolean}
   */
  equals(seg) {
    return this.includes(seg.p1) && this.includes(seg.p2);
  }

  /**
   * Check if a segment includes a point
   *
   * @param {Point} point
   * @returns {Boolean}
   */
  includes(point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  /**
   * Draw the segment on a canvas
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} options
   * @param {Number} options.width
   * @param {String} options.color
   * @param {Number[]} options.dash
   */
  draw(ctx, { width = 2, color = "black", dash = [] } = {}) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

export default Segment;
