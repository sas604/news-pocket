import React from "react";
import { MdSearch } from "react-icons/md";

export default function Menu({
  open,
  categories,
  handleClick,
  selected,
  handleInput,
  handleSubmit,
  input,
  wraperRef,
}) {
  const btns = categories.map((el, i) => (
    <button
      key={i}
      className={selected === el ? "btn active" : "btn"}
      onClick={() => handleClick(el)}
      name={el}
    >
      {el}
    </button>
  ));
  const margin = open ? 0 : "-80%";
  return (
    <nav ref={wraperRef} style={{ marginLeft: margin }} className="global-nav">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          className="search-field"
          value={input}
          placeholder="search topics"
          onChange={(e) => handleInput(e.target.value)}
          required
        />
        <label className="submit-btn">
          <input className="submit-btn" type="submit" />
          <MdSearch style={{ fontSize: "2.5rem" }} />
        </label>
      </form>

      <h3>Choose category to display</h3>
      {btns}
    </nav>
  );
}
