from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)
class PipelineData(BaseModel):
    nodes: List[str]
    edges: List[tuple]

def is_dag(nodes, edges):
    from collections import defaultdict, deque
    
    in_degree = {node: 0 for node in nodes}
    adjacency_list = defaultdict(list)
    
    for u, v in edges:
        adjacency_list[u].append(v)
        in_degree[v] += 1
    
    zero_in_degree = deque([node for node in nodes if in_degree[node] == 0])
    
    visited_count = 0
    
    while zero_in_degree:
        node = zero_in_degree.popleft()
        visited_count += 1
        
        for neighbor in adjacency_list[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                zero_in_degree.append(neighbor)
    
    return visited_count == len(nodes)

# FastAPI endpoint to parse pipeline
@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_graph = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_graph
    }
