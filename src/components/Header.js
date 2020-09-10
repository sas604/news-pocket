import React from "react";
import "../css/header.scss";
import PocketBtn from "./PocketBtn";

export default function Header({ style, openPocket, pocket, count }) {
  return (
    <div className="app-header">
      <h1>News Pocket</h1>
      <span className="tag-line"> Only What Matters </span>
      <PocketBtn onClick={openPocket} pocket={pocket} savedCount={count} />
    </div>
  );
}
