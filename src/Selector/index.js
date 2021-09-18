import React from "react";

const VizSelector = ({ value, onChange }) => {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="sphere">Sphere</option>
      <option value="lines">
        Lines
      </option>
      <option value="circles">Circles</option>
    </select>
  );
};

export default VizSelector;
