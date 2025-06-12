import React from "react";

const Loader = () => {
  const loaderStyle = {
    width: "40px",
    height: "60px",
    position: "relative",
  };

  const loaderBeforeAfterStyle = {
    content: '""',
    position: "absolute",
    inset: "0",
    background: "#22c55e", // Purple color
    clipPath: "polygon(0 0, 100% 0, 100% 67%, 50% 67%, 50% 34%, 0 34%)",
    animation: "sp7 2s infinite",
  };

  const loaderKeyframes = `
    @keyframes sp7 {
      0%, 10%  {transform: scale(var(--s,1)) translate(0,0) rotate(0deg);}
      33%      {transform: scale(var(--s,1)) translate(0,-20px) rotate(0deg);}
      66%      {transform: scale(var(--s,1)) translate(10px,-20px) rotate(-90deg);}
      90%, 100%{transform: scale(var(--s,1)) translate(10px,-10px) rotate(-90deg);}
    }
  `;

  // Insert the keyframes dynamically using a style tag
  const styleSheet = document.styleSheets[0];
  if (styleSheet) {
    const index = styleSheet.cssRules.length;
    styleSheet.insertRule(loaderKeyframes, index);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Loader Spinner */}
      <div className="loader" style={loaderStyle}>
        <div style={loaderBeforeAfterStyle}></div>
        <div style={{ ...loaderBeforeAfterStyle, "--s": "-1,-1" }}></div>
      </div>
      {/* Loading Text */}
      <p className="text-green-500 font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
