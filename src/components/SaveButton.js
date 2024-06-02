// src/components/SaveButton.js
import React from "react";

const SaveButton = ({ nodes, edges }) => {
  const handleSave = () => {
    if (
      nodes.some(
        (node) =>
          !edges.some(
            (edge) => edge.source === node.id || edge.target === node.id
          )
      )
    ) {
      alert("Error: Some nodes are not connected");
      return;
    }
    // Logic to save nodes and edges
    alert("Flow saved successfully");
  };

  return (
    <button
      onClick={handleSave}
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      Save Changes
    </button>
  );
};

export default SaveButton;
