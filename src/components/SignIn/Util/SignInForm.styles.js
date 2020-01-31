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
  itemBtn: { width: "100%", border: "1px solid black", margin: "10px" },
  itemTitle: {}
});

export default useStyles;
