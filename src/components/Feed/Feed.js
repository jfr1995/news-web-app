import React from "react";
import cx from "clsx";
import { makestyles } from "@material-ui/core/styles/makeStyles";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContet from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextInfoCardContent from "./Card/TextInfoCardContent";
import { blogCardContentStyles } from "./Card/blogCardContent.styles";
import overShadowStyles from "./Card/overShadow.styles";

const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map(article => {
        return <div />;
      })}
    </div>
  );
};

export default Feed;
