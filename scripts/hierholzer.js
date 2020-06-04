var visited;
var dList;
var n;
var stos;
var graph;
/**
 * @param start starting and ending vertex of the cycle 
 * @param current current vertex 
 * @param {number} position points to the specific element of the vertex list 
 */
function DFSaddCycle(start, current, position)
{
    visited[current] = true;
    dList.addToVertex(current,position);
    stos.push(current);
    position = position.next;

    for(let i=0; i < n; i++)
    {
        if(graph[current][i] === 1)
        {
            if (i == start)
            {
                dList.addToVertex(start,position);
                stos.push(start);
                do
                {
                    graph [position.value][position.next.value] = 0; // delete edges
                    if(position.value === start)
                    {
                        return true;
                    }
                    position = position.previous;
                } while (true);
            }
            if (!visited[i] && DFSaddCycle (start, i, position) ) return true;
        }
    }
    position = position.previous;
    dList.removeVertex(position.next);
    stos.pop();
    return false;
}

function DirectedHierholzer(G)
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
    for(let p = dList.head; p!=null; p=p.next)
    {
        for(let i=0; i<gLength; i++)
        {
            if(graph[p.value][i])
            {
                for (let j=0; j<visited.length; j++) visited[j] = false;
                if(DFSaddCycle(p.value, i, p))
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
        }
    }
    return cykle;
}
