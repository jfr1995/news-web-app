import React, { Fragment } from "react";
import BlogCard from "./Card/Card";
const Feed = ({ articles }) => {
  console.log(articles.articles);
  return (
    <div style={{ marginTop: 100 }}>
      {articles.articles.map(article => (
        <BlogCard
          title={article.title}
          description={article.description}
          url={article.url}
          imageURL={article.urlToImage}
          date={article.publishedAt}
        />
      ))}
    </div>
  );
};

export default Feed;
