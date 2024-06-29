import React from "react";
import noImage from "../images/no-image-available.jpg";

let NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props; // destructuring.(this.props is an object).
  return (
    <div style={{ borderRadius: "10px", boxShadow: "1px 1px 5px #888888" }}>
      <div
        className="card my-3"
        style={{ border: "1px solid black", height: "fit-content" }}
      >
        {/* source */}
        <span
          className="badge rounded-pill bg-danger"
          style={{
            position: "absolute",
            right: "0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {source ? source.slice(0, 15) : "Unknown"}
        </span>

        {/* image */}
        <div>
          <img
            src={imageUrl ? imageUrl : noImage}
            style={{
              width: "100%",
              height: "15rem",
              border: "1px solid black",
            }}
            className="card-img-top"
            alt="..."
          />
        </div>

        <div className="card-body">
          {/* title */}
          <h5 className="card-title">
            {title.length < 45 ? title : title.slice(0, 45) + "..."}
          </h5>

          {/* description */}
          <p
            className="card-text"
            style={{ height: "4.5rem", overflow: "hidden" }}
          >
            {description !== ""
              ? description.length < 88
                ? description
                : description.slice(0, 88) + "..."
              : "No description available."}
          </p>

          {/* author and date */}
          <p
            className="card-text"
            style={{ height: "1.5rem", overflow: "hidden" }}
          >
            <small className="text-muted">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>

          {/* link to the original page */}
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

/*
*** props can be used in two ways->
1. using destructuring.
2. using direclty {this.props.title} at the required position.
 */
