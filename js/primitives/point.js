/**
 * A point in 2D space
 */
class Point {
  /**
   * Create a new point
   *
   * @param {Number} x
   * @param {Number} y
   * @returns {Point}
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Check if two points are equal
   *
   * @param {Point} point
   * @returns {Boolean}
   */
  equals(point) {
    return this.x == point.x && this.y == point.y;
  }

  /**
   * Draw the point on a canvas
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} options
   * @param {Number} options.size
   * @param {String} options.color
   * @param {Boolean} options.outline
   * @param {Boolean} options.fill
   */
  draw(
    ctx,
    { size = 18, color = "black", outline = false, fill = false } = {}
  ) {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();
    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (fill) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
    }
  }
}

export default Point;
