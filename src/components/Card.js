import React, { useState } from "react";
import "../css/card.scss";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

export default function Card({ news, onClick, pocket }) {
  const [selected, setSelected] = useState(false);
  return (
    <li className="news-card">
      {news.image ? (
        <a
          className="header-link"
          href={news.url}
          style={{
            backgroundImage: `url(${news.image.contentUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
          }}
        >
          {news.name}
        </a>
      ) : (
        <a className="header-link" href={news.url}>
          {news.name}
        </a>
      )}
      <a href={news.url}>
        <h2>{news.name}</h2>
      </a>
      <p>{news.description}</p>
      <div className="bottom-wraper">
        <div className="source">
          {news.provider[0].image ? (
            <img
              style={{ width: 35 }}
              className="source-thamb"
              src={news.provider[0].image.thumbnail.contentUrl}
              alt={news.provider[0].name}
            />
          ) : null}
          <h5>{news.provider[0].name}</h5>
        </div>
        <div
          onClick={() => {
            setSelected(!selected);
            return onClick(news);
          }}
        >
          {!pocket ? (
            (selected && <MdBookmark />) || <MdBookmarkBorder />
          ) : (
            <BsTrash color={"#bc0b0b"} />
          )}
        </div>
      </div>
    </li>
  );
}
