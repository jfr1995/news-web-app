import React from "react";
import { styled } from "@material-ui/styles";
import { Button } from "@material-ui/core";

const LandingButton = styled(Button)({
  margin: "50px",
  backgroundColor: "red"
});

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  render() {
    return <div></div>;
  }
}
export default Landing;
