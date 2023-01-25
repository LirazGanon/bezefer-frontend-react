import { Button, styled } from "@mui/material";

export const MainContainer = styled("main")({
  padding: "2em",
});

export const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "themeColor",
})<{ themeColor: string }>(({ themeColor }) => ({
  color: themeColor,
  borderColor: themeColor,
  "&:hover": {
    borderColor: themeColor,
    backgroundColor: themeColor + "20",
  },
}));
