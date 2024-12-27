import React, { useState } from "react";

const Sidebar = ({ addNode, addEdge, selectedNode, deleteNode }) => {
  const [nodeLabel, setNodeLabel] = useState("");
  const [targetNode, setTargetNode] = useState("");

  return (
    <div className="sidebar">
      <h3>Controls</h3>
      <div>
        <input
          type="text"
          placeholder="Node Label"
          value={nodeLabel}
          onChange={(e) => setNodeLabel(e.target.value)}
        />
        <button onClick={() => addNode(nodeLabel)}>Add Node</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Target Node ID"
          value={targetNode}
          onChange={(e) => setTargetNode(e.target.value)}
        />
        <button onClick={() => addEdge(targetNode)}>Add Edge</button>
      </div>
      {selectedNode && (
        <div>
          <h4>Selected Node: {selectedNode.id}</h4>
          <button onClick={deleteNode}>Delete Node</button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
