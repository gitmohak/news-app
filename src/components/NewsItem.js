import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageURL, newsURL, author, date, source, catColor } = this.props;

    return (
      <div className="card mt-5">
        <span class={`position-absolute top-0 translate-middle badge rounded-pill bg-${catColor}`} style={{left:"86%", zIndex: "1"}}>
          {source}
        </span>

        <img src={imageURL ? imageURL : "https://images.moneycontrol.com/static-mcnews/2023/04/stocks_market-stock_stock-1-770x433.jpg"} className="card-img-top" alt="News Article" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={newsURL} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
          <p className="card-text mt-2"><small className="text-muted">By {author ? author : "Unknown"} on {(new Date(date)).toGMTString()}</small></p>
        </div>
      </div>
    )
  }
}
