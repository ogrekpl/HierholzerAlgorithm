var visited;
var dList;
var n;
var stos;
var graph;

function DFSfindCycle(start, current, previous) {

	visited[current] = true; // bierzacy wierzcholek jako oznaczony
    stos.push(current);

	graph[current][previous] = 0;
	graph[previous][current] = 0;
	
	
	for(let i = 0; i < n; i++) {
		
		if(graph[current][i] == 1) {
			
			if(i == current) {				
				continue;
			}
			
			if(i == previous) {
				continue;
			}
			
			if(i == start) {
				graph[current][i] = 0;
                graph[i][current] = 0;
				return true;
			}
			
			if( !visited[i] && DFSfindCycle(start, i, current)) {
				return true;
            }
            
		}	
    }
	stos.pop();
	return false;
}

/**
 * 
 * @param {Number[]} G Graph to be processed (must be Eulerian)
 */
function HierholzerND(G)
{
    // If the argument isn't an array, throw exception
    if(!Array.isArray(G)) {
        throw 'Parameter is not an array!';
    }

    let gHeight = parseInt(G.length);
    let gLength = G[0].length;
    
    if(gHeight !== gLength)
    {
        throw 'Array height does not match length!';
    }
    n = gLength;

    let v1 = -1;
    petla_outer:
    for(let i=0; i < gHeight; i++)
    {
        for(let j=0; j < gLength; j++)
        {
            if(G[i][j] === 1)
            {
                v1 = i;
                break petla_outer;
            }
        }
    }
    if(v1 === -1)
    {
        throw 'The graph does not have a vertex with a non zero degree!';
    }
    graph = G;
    dList = new DoubleLinkedList();
    dList.addToHead(v1);
    stos = new Array();
    let cykle = new Array();
    visited = new Array(gLength);
    for(let i=0; i < visited.length; i++)
    {
        visited[i] = false;
    }
    for(let i=0; i<gLength; i++)
    {
        for (let j=0; j<visited.length; j++) visited[j] = false;
        if(DFSfindCycle(i, i, i))
        {
            let stos_pomocniczy = new Array();
            let pocz_cyklu = stos[stos.length-1];
            stos_pomocniczy[0] = pocz_cyklu;
            let temp = 0;
            while(stos.length != 0)
            {
                stos_pomocniczy[temp] = stos.pop();
                temp++;
            }
            stos_pomocniczy[temp] = pocz_cyklu;
            stos_pomocniczy = stos_pomocniczy.reverse();
            cykle.push(stos_pomocniczy);
        }
    }
    return cykle;
}
