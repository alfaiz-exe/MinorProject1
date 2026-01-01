const ToolBar = () => {
  const menuItems = [
    "HOME",
    "TOPIC MODE",
    "Reading MODE",
    "Articles",
    "PDF EDIT",
    "Therapy Assistant"
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" }}>
      {menuItems.map((item, index) => (
        <div key={index} style={{ fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>
          {item}
        </div>
      ))}
      <div style={{ marginTop: "20px" }}>
        <input 
          type="text" 
          placeholder="🔍" 
          style={{ padding: "5px", borderRadius: "5px", border: "1px solid lightgray" }}
        />
      </div>
    </div>
  );
};

export default ToolBar;
