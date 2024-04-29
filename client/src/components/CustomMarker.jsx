import { Marker } from "@vis.gl/react-google-maps";

function CustomMarker({ position, text, color, border }) {
  const markerStyle = {
    // Marker styles (optional)
  };

  const labelStyle = {
    position: "absolute",
    top: "-40px", // Adjust positioning as needed
    left: "-20px", // Adjust positioning as needed
    backgroundColor: "white", // Background for better contrast
    padding: "5px",
    fontSize: "14px",
    color: color, // Set text color from props
    border: border, // Set border style from props
  };

  return (
    <div style={markerStyle}>
      <Marker position={position} /> {/* Actual marker */}
      <div style={labelStyle}>{text}</div> {/* Custom label */}
    </div>
  );
}

export default CustomMarker;
