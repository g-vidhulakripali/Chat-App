import React from "react";
import NotFoundImage from "../images/how-to-find-and-fix-404-errors-in-wordpress.png.webp"; // Replace with the actual path

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

export default NotFound;
