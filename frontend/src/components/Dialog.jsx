import React from "react";
import Animation from "./Animation";

const Dialog = ({ children, visible }) => {
  return (
    <Animation
      visible={visible}
      classes={{ in: "in-animation", out: "out-animation" }}
      time={200}
    >
      <div className="dialog-container">
        {children}
      </div>
    </Animation>
  );
};

export default Dialog;
