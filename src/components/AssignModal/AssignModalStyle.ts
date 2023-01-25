import { styled } from "@mui/material";

export const Title = styled("h1")({
  fontWeight: "400",
});

export const PlusSpan = styled("span", {
  shouldForwardProp: (prop) => prop !== "themeColor",
})<{ themeColor: string }>(({ themeColor }) => ({
  color: themeColor,
}));
