import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import * as S from "./AppHeaderStyle";
import LeftDrawer from "../LeftDrawer/LeftDrawer";
import { ThemeContext } from "../../App";

export const AppHeader: ({
  toggleThemeColor,
}: {
  toggleThemeColor: () => void;
}) => JSX.Element = ({ toggleThemeColor }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const color = useContext(ThemeContext);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <S.AppHeaderBar themeColor={color} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Shob Classes
          </Typography>
          <S.ToggleColorIcon onClick={toggleThemeColor} />
        </Toolbar>
      </S.AppHeaderBar>
      <LeftDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </Box>
  );
};

export default AppHeader;
