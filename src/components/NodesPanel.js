// src/components/NodesPanel.js
import React from "react";

const NodesPanel = () => {
  return (
    <div style={{ width: "200px", border: "1px solid black" }}>
      <h3>Nodes Panel</h3>
      <div
        style={{
          marginBottom: "10px",
          padding: "5px",
          border: "1px solid black",
          cursor: "move",
        }}
      >
        Message
      </div>
    </div>
  );
};

export default NodesPanel;
