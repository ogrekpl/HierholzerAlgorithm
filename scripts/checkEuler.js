/**
 * Checks if a graph is eulerian
 * @param adjacencyMatrix 2 dimensional array holding the adjacency matrix
 * @return boolean is the graph eulerian
 */
function checkEuler(adjacencyMatrix) {

    // If the argument isn't an array, throw exception
    if(!Array.isArray(adjacencyMatrix)) {
        throw 'Parameter is not an array!';
    }

    let width = adjacencyMatrix.length;
    let height = adjacencyMatrix[0].length

    // If the argument isn't a square array, throw exception
    if(width !== height) {
        throw 'Array is not square!';
    }

    // Find the number of outgoing and ingoing edges for all vertices
    let outgoing = new Array(width).fill(0);
    let ingoing = new Array(height).fill(0);
    for(let i = 0; i < height; i++) {
        for(let j = 0; j < width; j++) {
            outgoing[i] += adjacencyMatrix[i][j];
            ingoing[j] += adjacencyMatrix[i][j];
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

    console.log(false);
    return false;
}