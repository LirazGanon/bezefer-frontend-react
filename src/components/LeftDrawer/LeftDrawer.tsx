import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const LeftDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Classes" />
        </ListItem>
        <ListItem button component={Link} to="/student">
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem button component={Link} to="/add">
          <ListItemText primary="Add" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
