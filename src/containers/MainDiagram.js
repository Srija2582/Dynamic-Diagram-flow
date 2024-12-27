import { useState } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import Sidebar from "../components/Sidebar";

const MainDiagram = () => {
  // Using React Flow hooks for state management
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "input",
      position: { x: 250, y: 5 },
      data: { label: "Input Node" },
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = (label) => {
    const id = `${nodes.length + 1}`;
    const newNode = {
      id,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addEdgeToNode = (target) => {
    if (!selectedNode) return alert("Select a source node first!");
    const newEdge = {
      id: `e${selectedNode.id}-${target}`,
      source: selectedNode.id,
      target,
    };
    setEdges((eds) => addEdge(newEdge, eds));
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const deleteNode = () => {
    if (!selectedNode) return alert("No node selected!");
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          edge.source !== selectedNode.id && edge.target !== selectedNode.id
      )
    );
    setSelectedNode(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <Sidebar
        addNode={addNode}
        addEdge={addEdgeToNode}
        selectedNode={selectedNode}
        deleteNode={deleteNode}
      />
    </div>
  );
};

export default MainDiagram;



