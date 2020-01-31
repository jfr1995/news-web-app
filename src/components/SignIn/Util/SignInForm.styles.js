import React from "react";

const useStyles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: "50px"
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
    minHeight: "50px",
    width: "100%",
    textTransform: "uppercase"
  },
  footer: {
    backgroundColor: "#D1D1D1",
    textAlign: "center",
    padding: "20px"
  },
  span: {
    color: theme.palette.primary.light,
    "&:hover": {
      cursor: "pointer"
    }
  }
});

export default useStyles;
