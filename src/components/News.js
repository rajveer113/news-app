import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  //   const apiKey = props.apiKey;

  const capitaliseFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    // let url = `https://api.newscatcherapi.com/v2/search?q=world&topic=${props.category}&lang=en&page=1&page_size=${props.pageSize}`;
    // let url = `https://api.newscatcherapi.com/v2/search?q=${props.category}&lang=en&page=1&page_size=${props.pageSize}`;
    // setState({ loading: true });
    // let data = await fetch(url, {
    //     method: 'GET',
    //     headers:{
    //         // 'x-api-key': '79zVF6WZEFnLtsIpvJtl76X13lsEyuci_HBD3xgYukI'
    //         'x-api-key': apiKey
    //     }
    // });

    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `NewsDaily - ${capitaliseFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    // let url = `https://api.newscatcherapi.com/v2/search?q=world&topic=${props.category}&lang=en&page=${page + 1}&page_size=${props.pageSize}`;
    // let url = `https://api.newscatcherapi.com/v2/search?q=${props.category}&lang=en&page=${page + 1}&page_size=${props.pageSize}`;
    setPage(page + 1);
    // let data = await fetch(url, {
    //     method: 'GET',
    //     headers:{
    //         // 'x-api-key': '79zVF6WZEFnLtsIpvJtl76X13lsEyuci_HBD3xgYukI'
    //         'x-api-key': apiKey
    //     }
    // });

    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "30px 0px", marginTop: "90px" }}
      >
        NewsDaily - Top {capitaliseFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}

      {/* infinite scroll data */}
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={(articles ? articles.length : 0) !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-3">
            {articles &&
              articles.map((element) => {
                // let {title, description, urlToImage, url} = element;  // destructuring.
                return (
                  <div className="col-md-4" key={element.link}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage ? element.urlToImage : ""}
                      newsUrl={element.url ? element.url : ""}
                      date={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
      {/* {
                    !loading && <div className="container d-flex justify-content-between">
                        <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handleLeftClick}>&larr; Previous</button>
                        <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleRightClick}>Next &rarr;</button>
                    </div>
                }  */}
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

export default News;

/* componentDidMount is a life cycle method.
    Order of execution -->
        1. constructor of class
        2. render method
        3. componeneDidMount

2. Higher order array methods learned ->
        1. filter();
        2. map();

3. for making infinite scroll 

4. if we want to make state outside the constructor then we need to use state={} and yes we cannnot use props.
 we can use the selected components from the selected amount time.
 some commonly used hooks ->
    use 
    useEffect.
    useContext.
    useRef.
These hooks we generally use for using hooks in react class based properties in function based components.

point 1-> inside the class the function is made directly without using let or const keyword.
            But in function based component we need to use let or const keyword.

when we change state then it does not change directly because it is a asynchronous function.
*/
