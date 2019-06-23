import React from "react";
import Card from "./Card";

const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map(article => {
        return <Card key={article.url} article={article} />;
      })}
    </div>
  );
};

export default Feed;
