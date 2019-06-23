import React from "react";
import moment from "moment";

const Card = props => {
  const {
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt
    //content
  } = props.article;
  console.log("Props", props);
  return (
    <div className="container__cards">
      <img src={urlToImage} alt={description} />
      <div>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </div>
      <p>{description}</p>
      <div>{author}</div>
      <div>{moment(publishedAt).fromNow()}</div>
      <div>{source.name}</div>
    </div>
  );
};

export default Card;
