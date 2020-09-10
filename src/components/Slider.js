import React from "react";
import "../css/slider.scss";

export default function Slider({
  level,
  onSlide,
  politicalView,
  onSelect,
  active,
}) {
  return (
    <div className="slider">
      <input
        type="checkbox"
        id="toggle"
        className="checkbox"
        onChange={() => onSelect()}
      />
      <label htmlFor="toggle" className="switch"></label>
      <input
        disabled={!active}
        type="range"
        min="1"
        max="100"
        value={level}
        onChange={onSlide}
      />
      {active ? (
        <div className="view-wraper">
          <span>Media Political Bias:</span>
          <span className="view">{politicalView}</span>
        </div>
      ) : (
        <p>
          Activate slider to filter news providers based on politicals bias{" "}
        </p>
      )}
    </div>
  );
}
