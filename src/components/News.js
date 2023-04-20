import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props) {
    const {setProgress, apiKey, pageSize, country, category} = props;

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(null)

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    document.title = capitalize(category) + " - NewsMonkey";

    const fetchNews = async (num) => {
        setPage(page + num);
        setProgress(10);

        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&category=${category}&pageSize=${pageSize}&page=${page}`);
        setProgress(50);
        let response = await data.json();
        setProgress(70);

        setArticles(response.articles);
        setTotalArticles(response.totalResults);

        setProgress(100);
    }

    const fetchNextNews = async () => {
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&category=${category}&pageSize=${pageSize}&page=${page+1}`);
        let response = await data.json();

        setPage(page + 1);
        setArticles(articles.concat(response.articles));
    }

    useEffect(() => {
      fetchNews(0);
      //eslint-disable-next-line
    }, []);

        let catColor;
        switch (category) {
            case "business":
                catColor = "primary";
                break;

            case "entertainment":
                catColor = "success";
                break;

            case "general":
                catColor = "danger";
                break;

            case "health":
                catColor = "warning";
                break;

            case "science":
                catColor = "info";
                break;

            case "sports":
                catColor = "dark";
                break;

            case "technology":
                catColor = "primary";
                break;
            default:
                catColor = "primary";
        }

        let articleElements = [];

        for (let element of articles) {
            articleElements.push(
                <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} catColor={catColor} />
                </div>);
        }

        return (
            <>
                <h1 className="mt-4 text-center">NewsMonkey - Top {capitalize(category)} Headlines</h1>

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchNextNews}
                    hasMore={articles.length !== totalArticles}
                    loader={<div className="d-flex justify-content-center my-5">
                        <div className="spinner"></div>
                    </div>}
                    endMessage={
                        <p className="fw-bold text-center fs-1 my-5">
                            Yay! You have seen it all
                        </p>
                    }
                >
                    <div className="container">
                        <div className="row">
                            {articleElements}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
}

News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
}

News.defaultProps = {
    pageSize: 8,
    country: "us",
    category: "business"
}