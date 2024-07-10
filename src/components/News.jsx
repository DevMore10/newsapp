import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const update = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);

    // console.log(parsedData);

    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${cap(props.category)} | KelaNews`
    update()
  }, [])


  // const handleNextPage = async () => {
  //   setPage(page + 1)
  //   update()
  // };

  // const handlePrevPage = async () => {
  //   setPage(page - 1)
  //   update()
  // };

  const fetchMoreData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);

    setArticles(articles.concat(parsedData.articles))
    setLoading(false)
    setTotalResults(parsedData.totalResults)

  };


  return (
    <>
      <h1 className="text-center " style={{ marginTop: "70px" }}>{cap(props.category)} | Top Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>
        <div className="container">
          <div className="row my-3">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : " "}
                    description={
                      element.description ? element.description : " "
                    }
                    imageUrl={
                      !element.urlToImage
                        ? "https://w7.pngwing.com/pngs/592/414/png-transparent-computer-icons-news-news-icon-angle-text-rectangle.png"
                        : element.urlToImage
                    }
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
            <button
              disabled={page <= 1}
              className="btn btn-dark"
              onClick={handlePrevPage}
            >
              {" "}
              &larr; Prev
            </button>
            <button
              disabled={
                page + 1 >
                Math.ceil(totalResults / props.pageSize)
              }
              className="btn btn-dark"
              onClick={handleNextPage}
            >
              {" "}
              Next &rarr;
            </button>
          </div> */}

    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "General",
  author: "Unknown",
};

News.PropTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};


export default News;
