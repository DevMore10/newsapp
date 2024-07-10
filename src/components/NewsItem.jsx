import React from "react";

const NewsItem = (props) => {

  let { title, description, imageUrl, url, author, date, source } = props;
  return (
    <div>
      <div className="card my-3">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success"
          style={{ left: "80%", zIndex: 1 }}>
          {source}
        </span>
        <img src={imageUrl} className="card-img-top" alt="" />
        <div className="card-body">

          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={url} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );

}

export default NewsItem;
