const Mask = ({ zIndex = 1, color = "" }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: zIndex,
        backgroundColor: color
      }}
    />
  );
};
