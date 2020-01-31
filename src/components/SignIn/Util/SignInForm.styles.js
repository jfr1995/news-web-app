import React from "react";

const useStyles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: "50px",
    border: "1px solid red"
  },
  item: { width: "100%", margin: "10px" },
  itemForm: {
    width: "100%",
    margin: "10px",

    display: "flex",
    flexDirection: "column"
  },
  itemInput: {
    minHeight: "100px",
    minWidth: "100%"
  },
  itemBtn: {
    minHeight: "100px",
    minWidth: "100%"
  }
});

export default useStyles;
