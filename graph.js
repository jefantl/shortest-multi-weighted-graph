
class Graph {
    constructor() {
        this.nodes = {}; // dictionary of nodes
    }

    addNode(name) {
        this.nodes[name] = new Node(name);
    }

    addEdgeFromTo(from, to, weights) {
        // beware, nodes can have mutiple connections with differnet weights
        let newEdge = new Edge(this.nodes[from], this.nodes[to], weights);
        this.nodes[from].edgesOut.push(newEdge);
        this.nodes[to].edgesIn.push(newEdge);
    }

    addEdgeBoth(from, to, weights) {
        // beware, nodes can have mutiple connections with differnet weights
        let newEdge1 = new Edge(this.nodes[from], this.nodes[to], weights);
        let newEdge2 = new Edge(this.nodes[to], this.nodes[from], weights);

        this.nodes[from].edgesOut.push(newEdge1);
        this.nodes[to].edgesIn.push(newEdge1);
        this.nodes[from].edgesOut.push(newEdge2);
        this.nodes[to].edgesIn.push(newEdge2);
    }

    show() {
        for (let key in this.nodes) {
            this.nodes[key].show();
        }
    }


    computeWeights(prefrence) {
        for (let key in this.nodes) {
            this.nodes[key].computeWeights(prefrence);
        }
    }

    bestFirstSearch(start) { // minimize unhappiness
        // reset all nodes
        for (let key in this.nodes) {
            this.nodes[key].cost = Infinity;
            this.nodes[key].marked = false;
        }

        let queue = new PriorityQueue(function (e1, e2) {
            if (e1.cost < e2.cost) return -1;
            else return 1;
        });

        start.cost = 0;
        queue.push(start);
        while (!queue.empty()) {
            let currentNode = queue.pop();

            for (let e = 0; e < currentNode.edgesOut.length; e++) {
                let nextNode = currentNode.edgesOut[e].to;
                if (!nextNode.marked) {
                    let possibleCost = currentNode.cost + currentNode.edgesOut[e].weightedWeight;
                    if (possibleCost < nextNode.cost) {
                        nextNode.cost = possibleCost;
                    }
                    queue.push(nextNode);
                }
            }
            currentNode.marked = true;
        }
    }

    shortestBackSearch(start, end) {
        for (let key in this.nodes) {
            for (let i = 0; i < this.nodes[key].edgesOut.length; i++) {
                this.nodes[key].edgesOut[i].shortestPath = false;
            }
        }

        let nodes = [];
        let currentNode = end;

        while(currentNode != start) {
            nodes.push(currentNode.name);

            let lowestCostNode = currentNode.edgesIn[0].from;
            let lowestCostEdge = currentNode.edgesIn[0];

            let lowestCost = lowestCostNode.cost + lowestCostEdge.weightedWeight;

            for(let i = 1; i < currentNode.edgesIn.length; i++) {
                let possibleCost = currentNode.edgesIn[i].from.cost + currentNode.edgesIn[i].weightedWeight;
                if (lowestCost > possibleCost) {
                   lowestCostNode = currentNode.edgesIn[i].from;
                   lowestCostEdge = currentNode.edgesIn[i];

                   lowestCost = lowestCostNode.cost + lowestCostEdge.weightedWeight;
                }
            }
            currentNode = lowestCostNode;
            lowestCostEdge.shortestPath = true;
        }
        nodes.push(currentNode.name);
    }
}

