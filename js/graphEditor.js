import Graph from "./math/graph.js";
import { getNearestPoint } from "./math/utils.js";
import Point from "./primitives/point.js";
import Segment from "./primitives/segment.js";

/**
 * GraphEditor class
 */
class GraphEditor {
  /**
   * Create a new graph editor
   *
   * @param {HTMLCanvasElement} canvas
   * @param {Graph} graph
   * @returns {GraphEditor}
   */
  constructor(canvas, graph) {
    /**
     * @type {HTMLCanvasElement}
     */
    this.canvas = canvas;

    /**
     * @type {Graph}
     */
    this.graph = graph;

    /**
     * @type {CanvasRenderingContext2D}
     */
    this.ctx = this.canvas.getContext("2d");

    /**
     * @type {Point}
     */
    this.selected = null;

    /**
     * @type {Point}
     */
    this.hovered = null;

    /**
     * @type {Boolean}
     */
    this.dragging = false;

    /**
     * @type {Point}
     */
    this.mouse = null;

    this.#addEventListeners();
  }

  /**
   * Add event listeners to the canvas
   */
  #addEventListeners() {
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
    this.canvas.addEventListener("mouseup", () => (this.dragging = false));
  }

  /**
   * Handle mouse move events
   *
   * @param {MouseEvent} evt
   */
  #handleMouseMove(evt) {
    this.mouse = new Point(evt.offsetX, evt.offsetY);
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
    if (this.dragging == true) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }

  /**
   * Handle mouse down events
   *
   * @param {MouseEvent} evt
   */
  #handleMouseDown(evt) {
    if (evt.button == 2) {
      // right click
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this.#removePoint(this.hovered);
      }
    }
    if (evt.button == 0) {
      // left click
      if (this.hovered) {
        this.#select(this.hovered);
        this.dragging = true;
        return;
      }
      this.graph.addPoint(this.mouse);
      this.#select(this.mouse);
      this.hovered = this.mouse;
    }
  }

  /**
   * Select a point
   *
   * @param {Point} point
   */
  #select(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  /**
   * Remove a point from the graph
   *
   * @param {Point} point
   */
  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected == point) {
      this.selected = null;
    }
  }

  /**
   * Display the graph editor
   */
  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      const intent = this.hovered ?? this.mouse;
      new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] });
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}

export default GraphEditor;
