import React from "react";
import { useNavigate } from "react-router-dom";

function WaitingRoom() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>⏳ Waiting for a Match...</h2>
      <p>We’ll notify you once someone with your language preferences joins.</p>
      <p>You can leave this tab open or come back later.</p>

      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
}

export default WaitingRoom;
