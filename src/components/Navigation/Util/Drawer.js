import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Computer from "@material-ui/icons/Computer";
import Assessment from "@material-ui/icons/Assessment";
import Public from "@material-ui/icons/Public";
import Sports from "@material-ui/icons/Sports";
import School from "@material-ui/icons/School";
import Divider from "@material-ui/core/Divider";
import Movie from "@material-ui/icons/Movie";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  drawerPaper: {
    width: drawerWidth
  }
}));

const getIcons = topic => {
  switch (topic) {
    case "Headlines":
      // code block
      return <Assessment />;
    case "World":
      // code block
      return <Public />;
    case "Technology":
      // code block
      return <Computer />;
    case "Sports":
      // code block
      return <Sports />;
    case "Science":
      return <School />;
    case "Entertainment":
      return <Movie />;
    default:
      return;
  }
};

export default ({ isOpen, onClose, topics }) => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {topics.map(topic => {
          return (
            <ListItem button onClick={() => console.log("test")}>
              <ListItemIcon>{getIcons(topic)}</ListItemIcon>
              <ListItemText primary={topic}></ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
