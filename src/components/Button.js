import React from "react";

export default function Button({ className, onClick = (f) => f, val }) {
  return (
    <button className={className} onClick={() => onClick(val)}>
      {val}
    </button>
  );
}
