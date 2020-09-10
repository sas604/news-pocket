const data = require("./rating.json");
//const availableSources = require("./availableSources.json");

const leftNews = data
  .filter((el) => el.rating === "left" || el.rating === "left-center")
  .map((el) => el.news_source);

const rightNews = data
  .filter((el) => el.rating === "right" || el.rating === "right-center")
  .map((el) => el.news_source);

const neutralNews = data
  .filter((el) => el.rating === "center")
  .map((el) => el.news_source);

export const filteredSources = {
  left: [...leftNews],
  center: [...neutralNews],
  right: [...rightNews],
};
export const to = new Date().toJSON().slice(0, 10);
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 3);
export const from = yesterday.toJSON().slice(0, 10);
