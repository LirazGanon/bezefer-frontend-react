import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { ListItemButton } from "@mui/material";
import * as S from "./LeftDrawerStyle";

const LeftDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <S.MenuList>
        <ListItemButton onClick={onClose} component={Link} to="/">
          <ListItemText primary="Classes" />
        </ListItemButton>
        <ListItemButton onClick={onClose} component={Link} to="/student">
          <ListItemText primary="Students" />
        </ListItemButton>
        <ListItemButton onClick={onClose} component={Link} to="/add">
          <ListItemText primary="Create" />
        </ListItemButton>
      </S.MenuList>
    </Drawer>
  );
};

export default LeftDrawer;
