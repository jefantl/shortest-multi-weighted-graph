
class Edge {
    constructor(from, to, weights) {
        this.from = from; // node
        this.to = to; // node
        this.weights = weights; // array of weights

        this.weightedWeight = weights[0];

        this.shortestPath = false;
    }

    computeWeights(prefrence) {
        this.weightedWeight = prefrence(this.weights);
    }

    show() {
        strokeWeight(0.5);
        stroke(100, 100, 100);
        if (this.shortestPath) {
            stroke(200, 10, 10);
        }
        line(this.from.x, this.from.y, this.to.x, this.to.y);
        ellipse(this.to.x - (-this.from.x + this.to.x) / 3, this.to.y - (-this.from.y + this.to.y) / 3, 5, 5)
        text("Weight: " + Math.round(this.weightedWeight*100)/100, (this.from.x + this.to.x) / 2, (this.from.y + this.to.y) / 2 - 10);
        text("Weights: " + this.weights, (this.from.x + this.to.x) / 2, (this.from.y + this.to.y) / 2 + 10);
    }
}