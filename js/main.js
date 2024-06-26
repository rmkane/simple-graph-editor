import GraphEditor from "./graphEditor.js";
import Graph from "./math/graph.js";
import Point from "./primitives/point.js";
import Segment from "./primitives/segment.js";

/**
 * @type {HTMLCanvasElement}
 */
const myCanvas = document.getElementById("myCanvas");

myCanvas.width = 600;
myCanvas.height = 600;

/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = myCanvas.getContext("2d");

const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p1, p3);
const s3 = new Segment(p1, p4);
const s4 = new Segment(p2, p3);

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
const graphEditor = new GraphEditor(myCanvas, graph);

animate();

/**
 * Animate the canvas
 */
function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graphEditor.display();
  requestAnimationFrame(animate);
}
