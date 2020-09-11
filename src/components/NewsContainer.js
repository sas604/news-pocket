import React, { useState, useEffect } from "react";
import Card from "./Card";
import Slider from "./Slider";
import { filteredSources } from "../functions";
import "../css/news-container.scss";
import Loader from "react-loader-spinner";

export default function NewsContainer({
  data,
  loading,
  error,
  selectCard,
  pocket,
  backToFeed,
}) {
  const [level, setLevel] = useState("50");
  const [politicalView, setView] = useState("center");
  const [filtredData, setFiltred] = useState([]);
  const [sliderIsActive, setActive] = useState(false);
  const activateSlider = () => setActive(!sliderIsActive);
  useEffect(() => {
    if (!data) return;
    setFiltred([]);
    data.forEach((el) => {
      if (pocket) {
        setFiltred((filtredData) => [...filtredData, el]);
      } else {
        if (!sliderIsActive) {
          setFiltred((filtredData) => [...filtredData, el]);
        } else if (
          filteredSources[politicalView].indexOf(el.provider[0].name) > -1
        ) {
          setFiltred((filtredData) => [...filtredData, el]);
        }
      }
    });
  }, [politicalView, data, sliderIsActive, pocket]);

  useEffect(() => {
    if (level >= 25 && level <= 75) {
      setView("center");
    } else if (level >= 75) {
      setView("right");
    } else setView("left");
  }, [level]);

  const listitems = filtredData.map((el) => (
    <Card key={el.id} news={el} onClick={selectCard} pocket={pocket} />
  ));
  if (loading)
    return (
      <div
        style={{
          position: "absolute",
          top: "50vh",
          left: "39vw",
          zIndex: 9999,
        }}
      >
        <Loader type="ThreeDots" color="orange" height={80} width={80} />
      </div>
    );
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (!data) return null;
  return (
    <div className={"container-wraper"}>
      <ul className={`news-container ${pocket ? "pocket" : null}`}>
        {" "}
        {!pocket ? (
          <Slider
            level={level}
            politicalView={politicalView}
            onSlide={(e) => setLevel(e.target.value)}
            onSelect={activateSlider}
            active={sliderIsActive}
          />
        ) : (
          <div className="hello">
            <h2>
              Welcome to your pocket here you can view and delete your saved
              articles
            </h2>
            {data.length === 0 && (
              <p>
                Nothing is saved yet. Head to news feed and save some articles
                to read later
                <button onClick={() => backToFeed()}>Back To Feed</button>
              </p>
            )}
          </div>
        )}
        {listitems}{" "}
      </ul>
    </div>
  );
}
