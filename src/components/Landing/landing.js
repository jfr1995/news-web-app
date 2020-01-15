import React from "react";
import Box from "@material-ui/core/Box";
import { withNews } from "../News/context";
import { compose } from "recompose";
import Feed from "../Feed/Feed";

class LandingBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      error: null
    };
  }

  componentDidMount() {
    this.props.news.v2
      .topHeadlines({
        language: "en",
        country: "us"
      })
      .then(response => {
        this.setState({ list: response });
        /*
        response object
        {
          status: "ok",
          articles: [...]
        }
      */
      })
      .catch(error => {
        this.setState({ error });
      });
  }
  render() {
    if (this.state.list.length !== 0) {
      return <Feed articles={this.state.list} />;
    } else {
      // replace with loading animation
      return <Box mt={8}>No stories</Box>;
    }
  }
}
const Landing = compose(withNews)(LandingBase);
export default Landing;

/*

export const SignInFacebook = compose(
  withRouter,
  withFirebase
)(SignInFacebookBase);
<Feed articles={this.state.list}></Feed>
*/
