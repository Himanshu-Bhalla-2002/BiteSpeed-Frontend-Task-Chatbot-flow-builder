import { Handle, Position } from "reactflow";
import WhatsappIcon from "../../src/assets/whatsapp_123.svg";

// In your component
<img src={WhatsappIcon} alt="WhatsApp icon" height={15} />;

// Custom node with header and specific styling
const CustomNode = ({ data }) => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#b2f0e3",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          fontWeight: "bold",
          color: "black",
          paddingLeft: 15,
          paddingTop: 3,
          paddingBottom: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: 275,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 13, paddingRight: 7, paddingTop: 5 }}
          >
            chat
          </span>
          {data.heading}
        </div>
        <div style={{ paddingRight: 15 }}>
          <img src={WhatsappIcon} alt="whatsapp icon" height={15} />
        </div>
      </div>
      <div
        style={{
          padding: 15,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          backgroundColor: "white",
        }}
      >
        <div style={{ color: "black" }}>{data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} id="source" />
      <Handle type="target" position={Position.Left} id="target" />
    </div>
  );
};

export default CustomNode;
