import { useEffect, useState } from "react";

const Sidebar = () => {
  const [showUsage, setShowUsage] = useState(true);

  // Show usage information on the first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUsage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const displayUsage = showUsage ? "" : "none";

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <div className="usage-info" style={{ display: displayUsage }}>
        Drag the node below to the canvas to add it.
      </div>
      <aside>
        <div
          className="draggable-node"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          <span
            className="material-symbols-outlined"
            style={{ paddingBottom: 5 }}
          >
            maps_ugc
          </span>
          Message
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
