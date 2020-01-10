import React, { Fragment } from "react";
import BlogCard from "./Card/Card";
const Feed = ({ articles }) => {
  console.log(articles);
  return (
    <div>
      {articles.articles.map(item => (
        <Fragment key={item.url}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </Fragment>
      ))}
    </div>
  );
};

export default Feed;
