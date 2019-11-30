class PriorityQueue {
    constructor(comparator) {
        this.queue = [];
        this.comparator = comparator;
    }

    push(element) {
        let index = 0;
        while (index < this.queue.length && this.comparator(element, this.queue[index]) == -1) {
            index++;
        }
        if (index < this.queue.length) {
        this.queue.splice(index, 0, element);
        }
        else {
            this.queue.push(element);
        }
    }

    pop() {
        return this.queue.pop();
    }

    empty() {
        return this.queue.length == 0;
    }

    print() {
        console.log("Queue:");
        for (let i = 0; i < this.queue.length; i++) {
            console.log(this.queue[i].name, this.queue[i].cost, this.queue[i].marked);
        }
    }
}