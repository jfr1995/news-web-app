import React, { Fragment } from "react";
import cx from "clsx";
import { makestyles } from "@material-ui/core/styles/makeStyles";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContet from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextInfoCardContent from "./Card/TextInfoCardContent";
import { blogCardContentStyles } from "./Card/blogCardContent.styles";
import overShadowStyles from "./Card/overShadow.styles";

//const useStyles = makeStyles();

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
