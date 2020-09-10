import React, { useEffect } from "react";
import { BsFillBookmarksFill, BsArrowLeftShort } from "react-icons/bs";

export default function PocketBtn({ savedCount = "0", onClick, pocket }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pocket]);
  return (
    <div onClick={() => onClick()} className="pocket">
      {pocket ? (
        <BsArrowLeftShort />
      ) : (
        <>
          <BsFillBookmarksFill />
          <h3>{savedCount}</h3>
        </>
      )}
    </div>
  );
}
