import React from "react";
// for HOC -withStyles
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { relative } from "path";

const styles = () => ({
  root: {
    width: "100%",
    textAlign: "left",
    height: 700,
    position: "relative",
    color: "#ffffff",
    [breakpoints.only("xs")]: {
      position: "relative",
      height: 566
    }
  }
});

//export default function
