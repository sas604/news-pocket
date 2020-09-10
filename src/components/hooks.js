// this is for filter chategory search needs more sources /
/*useEffect(() => {
  if (!data) return;
  setFiltred([]);
  data.articles.forEach((el) => {
    if (sources[politicalView].indexOf(el.source.id) > -1) {
      setFiltred((filtredData) => [...filtredData, el]);
    }
  });
}, [politicalView, data, sources]); */

//endpoint
const uri = `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=100`;
