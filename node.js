
class Node {
    constructor(name) {
        this.name = name; // string name
        this.edgesIn = []; // edges
        this.edgesOut = []; // edges

        // searching stuff
        this.cost = Infinity;
        this.marked = false;
        // display stuff
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.traveled = false;
    }


    computeWeights(prefrence) {
        for (let i = 0; i < this.edgesOut.length; i++) {
            this.edgesOut[i].computeWeights(prefrence);
        }
    }

    show() {
        for (let i = 0; i < this.edgesOut.length; i++) {
            this.edgesOut[i].show();
        }
        stroke(100, 100, 100);
        strokeWeight(2)
        ellipse(this.x, this.y, nodeSize, nodeSize);
        strokeWeight(0.5);
        text(this.name, this.x, this.y);
        text("Cost: " + Math.round(this.cost*100)/100, this.x, this.y + 10);

    }
}
