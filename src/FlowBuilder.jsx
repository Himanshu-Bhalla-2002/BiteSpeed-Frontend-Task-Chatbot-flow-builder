import { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import "../index.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import CustomNode from "./components/CustomNode";
import Notification from "./components/Notification";
import UpdateNode from "./components/UpdateNode";

let id = 0;

const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeSelected, setNodeSelected] = useState(false);
  const [changeNode, setChangeNode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [targetHandles, setTargetHandles] = useState([]);
  const [sourceHandles, setSourceHandles] = useState([]);

  const update = useCallback((event, node) => {
    setChangeNode(node);
    setNodeSelected(true);
  }, []);

  const onConnect = useCallback(
    (params) => {
      if (sourceHandles.includes(params.source)) {
        return;
      }
      setSourceHandles((handles) => [...handles, params.source]);
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
      );
      if (targetHandles.includes(params.target)) return;
      setTargetHandles((handles) => [...handles, params.target]);
    },
    [setEdges, sourceHandles, targetHandles]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `node_${id}`,
        type: "custom",
        position,
        data: { heading: "Send Message", label: `text message ${id}` },
      };

      id++;
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const saveFlow = () => {
    const totalNodes = reactFlowInstance.getNodes().length;
    if (targetHandles.length !== totalNodes - 1) {
      setErrorMessage("Cannot save Flow");
      setMessageColor("redMessage");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      setErrorMessage("Saved Flow");
      setMessageColor("greenMessage");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="app-container" style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <div className="topbar">
            <Notification
              errorMessage={errorMessage}
              messageColor={messageColor}
            />
          </div>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            nodeTypes={nodeTypes}
            onNodeClick={update}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        {nodeSelected ? (
          <div className="sidebar">
            <Topbar saveFlow={saveFlow} />
            <UpdateNode
              selectedNode={changeNode}
              setNodeSelected={setNodeSelected}
              setNodes={setNodes}
            />
          </div>
        ) : (
          <div className="sidebar">
            <Topbar saveFlow={saveFlow} />
            <Sidebar />
          </div>
        )}
      </ReactFlowProvider>
    </div>
  );
};

export default FlowBuilder;
