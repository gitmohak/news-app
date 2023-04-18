import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';

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
        this.setState({loading:true});

        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=eb614fcefde64b3da530c65c26f01271&category=${this.props.category}&pageSize=${this.props.pageSize}&page=${this.state.page + num}`);
        let response = await data.json();

        this.setState({
            articles: response.articles,
            totalArticles: response.totalResults,
            page: this.state.page + num,
            loading: false
        });
    }

    componentDidMount() {
        this.fetchNews(0);
    }

    render() {
        let catColor;
        switch(this.props.category){
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
        }

        let articleElements = [];
        const lastPage = Math.ceil(this.state.totalArticles / this.props.pageSize);

        for (let element of this.state.articles) {
            articleElements.push(
                !this.state.loading && <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} catColor={catColor}/>
                </div>);
        }

        return (
            <>
                <div className="container">
                    <h1 className="mt-4 text-center">NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>

                    {this.state.loading && <div className="d-flex justify-content-center my-5">
                        <div className="spinner"></div>
                    </div>}

                    <div className="row">
                        {articleElements}
                    </div>
                </div>

                <div className="container d-flex justify-content-between my-5">
                    <button type="button" disabled={this.state.page === 1} onClick={() => {
                        this.fetchNews(-1);
                    }} className="btn btn-lg btn-dark">&larr; Previous</button>

                    <button type="button" disabled={this.state.page === lastPage} onClick={() => {
                        this.fetchNews(+1);
                    }} className="btn btn-lg btn-dark">Next &rarr;</button>
                </div>
            </>
        );
    }
}