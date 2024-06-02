import React from "react";
import ReactDOM from "react-dom/client";
import FlowBuilder from "./FlowBuilder";

const AppLayout = () => {
  return (
    <>
      <FlowBuilder />
    </>
  );
};

export default AppLayout;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
