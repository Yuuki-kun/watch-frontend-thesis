import React, { useState } from "react";
import "./imageMagnifier.css";
const ImageMagnifier = ({ imgUrl }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  const handMouseHover = (e) => {
    // const { left, top, width, height } =
    //   e.currentTarget.getBoundingClientRect();
    // const x = ((e.pageX - left) / width) * 100;
    // const y = ((e.pageY - top) / height) * 100;
    // console.log(position);
    // setPosition({ x, y });
    // setCurrentPosition({ x: e.pageX - left, y: e.pageY - top });
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    let cursorX = e.pageX - left - window.scrollX;
    let cursorY = e.pageY - top - window.scrollY;

    setPosition({ x, y });

    setCurrentPosition({ x: cursorX, y: cursorY });
  };
  return (
    <div
      className="img-magnifier-container"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={(e) => handMouseHover(e)}
      style={{ cursor: showMagnifier ? "zoom-in" : "auto" }}
    >
      <img src={imgUrl} alt="" className="magnifier-img img-fluid" />
      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            left: `${currentPosition.x - 100}px`,
            top: `${currentPosition.y - 100}px`,
            pointerEvents: "none",
          }}
        >
          <div
            className="magnifier-image"
            style={{
              backgroundImage: `url(${imgUrl})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              transform: `scale(1.3)`,
              borderRadius: "50%",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageMagnifier;
