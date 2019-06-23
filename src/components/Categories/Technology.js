import React, { Component } from "react";
import Feed from "../Feed/Feed";
import * as STATES from "../../constants /states";
import { withNews } from "../News/context";
import Loading from "../Loading/loading";

class Technology extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      error: null
    };
  }
  componentDidMount() {
    this.props.news.v2.topHeadlines(STATES.TECHNOLOGY_STATE).then(data => {
      console.log(data);
      this.setState({ articles: data.articles });
    });
  } // end of component did mount
  render() {
    return this.state.articles ? (
      <Feed articles={this.state.articles} />
    ) : (
      <Loading />
    );
  }
}

export default withNews(Technology);
