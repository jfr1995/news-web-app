import React from "react";
const NewsContext = React.createContext(null);

export const withNews = Component => props => (
  <NewsContext.Consumer>
    {news => <Component {...props} news={news} />}
  </NewsContext.Consumer>
);

export default NewsContext;
