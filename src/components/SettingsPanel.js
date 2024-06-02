// src/components/SettingsPanel.js
import React from "react";

const SettingsPanel = ({ node, onTextChange }) => {
  const handleTextChange = (e) => {
    onTextChange(node.id, e.target.value);
  };

  return (
    <div style={{ width: "200px", border: "1px solid black" }}>
      <h3>Settings Panel</h3>
      <label>Text</label>
      <input type="text" value={node.data.label} onChange={handleTextChange} />
    </div>
  );
};

export default SettingsPanel;
