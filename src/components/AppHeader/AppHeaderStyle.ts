import { AppBar, styled } from "@mui/material";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

export const AppHeaderBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "themeColor",
})<{ themeColor: string }>(({ themeColor }) => ({
  background: themeColor,
}));

export const ToggleColorIcon = styled(LoyaltyIcon)({
  marginInlineStart: "12px",
  cursor: "pointer",
});
