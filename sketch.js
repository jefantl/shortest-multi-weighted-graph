

let nodeSize = 40;

let graph;

let pref1;
let pref2;

function setup() {
  createCanvas(640, 480);

  pref1 = createSlider(0, 1, 0.5, 0.001);
  pref1.position(10, 10);
  pref1.style('width', '80px');

  pref2 = createSlider(0, 1, 0.5, 0.001);
  pref2.position(10, 30);
  pref2.style('width', '80px');

  graph = new Graph();
  graph.addNode("start");
  graph.addNode("end");
  graph.addNode("bus stop");
  graph.addNode("market");

  // graph.addEdge("start", "end", [1, 2]);
  graph.addEdgeFromTo("start", "bus stop", [0.2, 5]);
  graph.addEdgeFromTo("bus stop", "end", [10, 4]);
  graph.addEdgeFromTo("bus stop", "market", [1,0.1]);
  graph.addEdgeFromTo("start", "market", [2, 2]);
  graph.addEdgeFromTo("market", "end", [10, 1]);

}

function draw() {
  background(255);
  graph.computeWeights(weights => pref1.value()*(weights[0]) + pref2.value()*(weights[0] * weights[1]));
  graph.bestFirstSearch(graph.nodes["start"]);
  graph.shortestBackSearch(graph.nodes["start"], graph.nodes["end"]);
  graph.show();

  if (isBeingDragged) {
    beingDragged.x = mouseX;
    beingDragged.y = mouseY;
  }
}


var beingDragged;
var isBeingDragged = false;

function mousePressed() {
  for (let key in graph.nodes) {
    let node = graph.nodes[key];
    if (Math.pow(Math.pow(node.x - mouseX, 2) + Math.pow(node.y - mouseY, 2), 1 / 2) < nodeSize) {
      beingDragged = node;
      isBeingDragged = true;
    }
  }
}

function mouseReleased() {
  isBeingDragged = false;
}