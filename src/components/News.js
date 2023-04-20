import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = this.capitalize(this.props.category) + " - NewsMonkey";
    }

    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    static defaultProps = {
        pageSize: 8,
        country: "us",
        category: "business"
    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }

    fetchNews = async (num) => {
        this.setState({ loading: true });
        this.props.setProgress(10);

        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page + num}`);
        this.props.setProgress(50);
        let response = await data.json();
        this.props.setProgress(70);

        this.setState({
            articles: response.articles,
            totalArticles: response.totalResults,
            page: this.state.page + num,
            loading: false
        });
        this.props.setProgress(100);
    }

    fetchNextNews = async () => {
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`);
        let response = await data.json();

        this.setState({
            articles: this.state.articles.concat(response.articles),
            page: this.state.page + 1
        });
    }

    componentDidMount() {
        this.fetchNews(0);
    }

    render() {
        let catColor;
        switch (this.props.category) {
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

        for (let element of this.state.articles) {
            articleElements.push(
                <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} catColor={catColor} />
                </div>);
        }

        return (
            <>
                <h1 className="mt-4 text-center">NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchNextNews}
                    hasMore={this.state.articles.length !== this.state.totalArticles}
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
}