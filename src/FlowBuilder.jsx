// src/components/FlowBuilder.js
import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
} from "reactflow";
import SettingsPanel from "./components/SettingsPanel";
import SaveButton from "./components/SaveButton";
import NodesPanel from "./components/NodesPanel";

const initialNodes = [
  {
    id: "1",
    type: "textNode",
    data: { label: "Text Node 1" },
    position: { x: 250, y: 5 },
  },
];

const initialEdges = [];

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
  const onNodeDragStop = (_, node) =>
    setNodes((nds) => nds.map((n) => (n.id === node.id ? node : n)));

  const onNodeClick = (_, node) => setSelectedNode(node);

  const handleTextChange = (id, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: value } }
          : node
      )
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <NodesPanel />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        nodeTypes={{ textNode: NodeComponent }}
      >
        <Background />
        <Controls />
      </ReactFlow>
      {selectedNode && (
        <SettingsPanel node={selectedNode} onTextChange={handleTextChange} />
      )}
      <SaveButton nodes={nodes} edges={edges} />
    </div>
  );
};

export default FlowBuilder;

const NodeComponent = ({ data }) => {
  return (
    <div style={{ padding: 10, border: "1px solid black" }}>
      {data.label}
      <Handle type="source" position="right" id="a" />
      <Handle type="target" position="left" id="b" />
    </div>
  );
};
