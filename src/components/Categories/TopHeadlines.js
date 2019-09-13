import React, { Component } from "react";
import Feed from "../Feed/Feed";
import { withNews } from "../News/context";

const STATE = {
  language: "en"
};

class TopHeadLines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      error: null
    };
  }

  componentDidMount() {
    this.props.news.v2.topHeadlines(STATE).then(data => {
      console.log(data);
      this.setState({ articles: data.articles });
    });
  }

  render() {
    return this.state.articles ? (
      <Feed articles={this.state.articles} />
    ) : (
      <div />
    );
  }
}

export default withNews(TopHeadLines);
