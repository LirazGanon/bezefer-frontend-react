import { Button, styled, TableContainer } from "@mui/material";

export const MainContainer = styled("main")({
  ["@media (min-width:600px)"]: {
    padding: "2em",
  },
});
export const TContainer = styled(TableContainer)({
  height: "calc(100vh - 59px)",
  ["@media (min-width:600px)"]: {
    height: "inherit",
    border: "1px solid #D1D1D1",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
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
