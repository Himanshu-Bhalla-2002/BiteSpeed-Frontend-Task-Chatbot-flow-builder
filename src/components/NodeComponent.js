// src/components/NodeComponent.js
import React from "react";
import { Handle } from "reactflow";

const NodeComponent = ({ data }) => {
  return (
    <div style={{ padding: 10, border: "1px solid black" }}>
      {data.label}
      <Handle type="source" position="right" id="a" />
      <Handle type="target" position="left" id="b" />
    </div>
  );
};

export default NodeComponent;
