const Topbar = ({ saveFlow }) => {
  return (
    <div className="save-button-container">
      <button onClick={saveFlow}>Save Changes</button>
    </div>
  );
};

export default Topbar;
