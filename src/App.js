import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import NewsContainer from "./components/NewsContainer";
import { v4 as uuidv4 } from "uuid";

import { MdMenu, MdClear } from "react-icons/md";
import "./css/nav.scss";

const HeaderStyle = {
  backgroundColor: "gray",
  height: 50,
};

const load = (key) => key && JSON.parse(localStorage.getItem(key));
function App() {
  const wraperRef = useRef(null);
  const [data, setData] = useState();
  const [savedData, saveData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCat, setSelected] = useState("trending");
  const [input, setInput] = useState("");
  const [pocket, setPocket] = useState(false);
  const [categories] = useState([
    "trending",
    "US",
    "politics",
    "health",
    "world",
    "business",
    "sport",
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  //handle click outside the menu
  useEffect(() => {
    if (open) {
      function clickOtsideEvent(e) {
        if (wraperRef.current && !wraperRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
      // bind event listener
      document.addEventListener("mousedown", clickOtsideEvent);
      return () => {
        // unbind event

        document.removeEventListener("mousedown", clickOtsideEvent);
      };
    }
  }, [wraperRef, open]);

  // open pocket on click
  const openPocket = () => setPocket(!pocket);
  // select category
  const activeCat = (category) => {
    setOpen(false);
    setSelected(category);
  };

  /// save or remove card from the pocket
  const selectCard = (source) => {
    if (!savedData.some((el) => el.id === source.id)) {
      saveData([...savedData, source]);
    } else {
      saveData(savedData.filter((el) => el.id !== source.id));
    }
  };

  // search input code
  const searchInput = (value) => setInput(value);
  const searchSubmit = (e) => {
    e.preventDefault();
    setSelected(input);
    setInput("");
    setOpen(false);
  };

  // prevent document from scrolling while menu is open
  useEffect(() => {
    const root = document.getElementById("root");
    if (open) {
      root.style.overflow = "hidden";
      root.style.paddingRight = "17px";
    } else {
      root.style.overflow = "visible";
      root.style.paddingRight = "0";
    }
  }, [open]);

  // fetch data
  useEffect(() => {
    const uri = `https://mybing-search.cognitiveservices.azure.com/bing/v7.0/news/search?q=${selectedCat}+news&count=100&originalImg=true`;
    setLoading(true);
    fetch(uri, {
      method: "GET",
      headers: {
        "Ocp-Apim-Subscription-Key": API_KEY,
        "Accept-Language": "en",
      },
    })
      .then((res) => res.json())
      .then(
        (res) => {
          res.value.forEach((element) => (element.id = uuidv4()));
          setData(res.value);
        },
        (error) => {
          setError(error);
        }
      )

      .then(setLoading(false));
  }, [selectedCat]);
  // save/load  data in the local storadge
  useEffect(() => {
    const data = load("data");
    if (data && data.length > 0) {
      saveData(data);
    }
  }, []);
  useEffect(() => {
    if (savedData) {
      localStorage.setItem("data", JSON.stringify(savedData));
    }
  }, [savedData]);

  return (
    <>
      <Header
        style={HeaderStyle}
        openPocket={openPocket}
        pocket={pocket}
        count={savedData.length}
      ></Header>
      <div className={"nav-btn"} onClick={(e) => setOpen(!open)}>
        {!open ? <MdMenu /> : <MdClear />}
      </div>
      <Menu
        open={open}
        categories={categories}
        selected={selectedCat}
        handleClick={activeCat}
        handleInput={searchInput}
        handleSubmit={searchSubmit}
        input={input}
        wraperRef={wraperRef}
      />
      {
        <NewsContainer
          onClick={(e) => {
            console.log(e.target);
            open && setOpen(false);
          }}
          pocket={pocket}
          savedData={null}
          data={!pocket ? data : savedData}
          error={error}
          loading={loading}
          selectCard={selectCard}
          backToFeed={openPocket}
        />
      }
    </>
  );
}

export default App;
