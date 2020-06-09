/**
 * Checks if a graph is eulerian
 * @param G 2 dimensional array holding the adjacency matrix
 * @return boolean is the graph eulerian
 */
function checkEuler(G) {
    // First we check if the parameter G is a valid adjacency matrix
    if(!checkGraph(G)) {
        throw "Parameter isn't a valid adjacency matrix!"
    }

    // We check if the graph is directed or undirected so we can use the right algorithm
    let undirected = isUndirected(G);

    if(undirected) {
        console.log("undirected");
        return checkEulerUndirected(G);
    }
    else {
        console.log("directed");
        return checkEulerDirected(G);
    }
}

/**
 * Checks if G is a valid adjacency matrix for a graph
 * @param G 2 dimensional array holding the adjacency matrix
 * @return boolean is the adjacency matrix valid
 */
function checkGraph(G) {
    // If the argument isn't an array, it's not valid
    if(!Array.isArray(G)) {
        return false;
    }

    let width = G.length;
    let height = G[0].length

    // If the argument isn't a square array, it's not valid
    if(width !== height) {
        return false;
    }

    let n = width;
    // If the array contains any non numeric or negative values, it's not valid
    for(let i = 0; i < n; i++) {
        for(let j=0; j < n; j++) {
            if(isNaN(G[i][j]) || G[i][j] < 0) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Checks if G is a represents a connected graph
 * @param G 2 dimensional array holding the adjacency matrix
 * @return bool is G a connected graph
 */
function checkConnected(G) {
    let n = G.length;

    // Initiate visited array
    let visited = [];
    for(let i = 0; i < n; i++) visited[i] = false;

    DFS(G, visited, 0);

    console.log(visited);

    for(let i = 0; i < n; i++) {
        if(!visited[i]) {
            return false;
        }
    }

    return true;
}

/**
 * Depth-first search
 * @param G 2 dimensional array holding the adjacency matrix
 * @param visited array of bools that mark visited vertices
 * @param start first vertex to visit
 */
function DFS(G, visited, start) {
    visited[start] = true;
    let n = G.length;

    for(let i = 0; i < n; i++) {
        if(G[start][i] > 0 && !visited[i]) {
            DFS(G, visited, i);
        }
    }
}

/**
 * Checks if a graph is undirected
 * @param G 2 dimensional array holding the adjacency matrix
 * @return boolean is the graph undirected
 */
function isUndirected(G) {
    let n = G[0].length;

    // An undirected graph is diagonally symmetric, so if we find any asymmetric values, we'll know the graph isn't undirected
    for(let i=0; i < n; i++) {
        for(let j=0; j < n; j++) {
            if(G[i][j] !== G[j][i]) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Checks if an undirected graph is eulerian
 * @param G 2 dimensional array holding the adjacency matrix
 * @return boolean is the graph eulerian
 */
function checkEulerUndirected(G) {
    let n = G[0].length;

    // An undirected graph is eulerian if all it's vertices have a an even degree
    for(let i = 0; i < n; i++) {
        let degree = 0;

        for(let j = 0; j < n; j++) {
            if(j === i && G[i][j] !== 0) {
                throw "To jest multigraf, nie graf!";
                return false;
            }
            else {
                degree += G[i][j];
            }
        }

        if(degree % 2 !== 0) {
            return false;
        }
    }

    return true;
}

/**
 * Checks if a directed graph is eulerian
 * @param G 2 dimensional array holding the adjacency matrix
 * @return boolean is the graph eulerian
 */
function checkEulerDirected(G) {
    let width = G.length;
    let height = G[0].length

    // Find the number of outgoing and ingoing edges for all vertices
    let outgoing = new Array(width).fill(0);
    let ingoing = new Array(height).fill(0);
    for(let i = 0; i < height; i++) {
        for(let j = 0; j < width; j++) {
            outgoing[i] += G[i][j];
            ingoing[j] += G[i][j];
        }
    }

    // If the outgoing and ingoing degrees are the same
    // for all vertices, the graph is eulerian

    // If all but two vertices have the same outgoing and incoming degrees,
    // if one of these two vertices has an outgoing degree of 1 more than the
    // incoming degree and the other has an incoming degree of 1 more than the
    // outgoing degree, the graph is also eulerian
    let notEqual = 0;
    let firstDiff = 0;
    let secondDiff = 0;
    for(let i = 0; i < height; i++) {
        if(outgoing[i] !== ingoing[i]) {
            notEqual++;
        }
        else if(firstDiff === 0) {
            firstDiff = outgoing[i] - ingoing[i];
        }
        else if(secondDiff === 0) {
            secondDiff = ingoing[i] - outgoing[i];
        }
    }
    if(notEqual === 0) {
        return true;
    }
    else if(notEqual === 2) {
        if(firstDiff === 1 && secondDiff === 1) {
            return true;
        }
    }

    return false;
}