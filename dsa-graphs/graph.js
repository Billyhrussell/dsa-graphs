/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (let adj of vertex.adjacent) {
      this.removeEdge(vertex, adj);
    }
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    let stack = [start];
    let visited = new Set(stack);
    let seen = [];

    while (stack.length > 0) {
      let currVertex = stack.pop();
      seen.push(currVertex.value);

      for (let neighbor of currVertex.adjacent) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
          visited.add(neighbor);
        }
      }
    }

    return seen;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let queue = [start];
    let visited = new Set(queue);
    let seen = [];

    while (queue.length > 0) {
      let currVertex = queue.shift();
      seen.push(currVertex.value);

      for (let neighbor of currVertex.adjacent) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }

    return seen;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end, count = 0, seen = new Set([start])) {

    if (start === end) return count;

    for (const neighbor of start.adjacent) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        count++;

      } return this.distanceOfShortestPath(neighbor, count, seen);
    }
    return count;
  }
}


module.exports = { Graph, Node };
