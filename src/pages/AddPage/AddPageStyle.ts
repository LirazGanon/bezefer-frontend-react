import { styled } from "@mui/material";

export const MainSection = styled("main")({
  padding: "1em",
  ["@media (min-width:600px)"]: { padding: "2em 4em" },
  display: "flex",
  gap: 10,
  justifyContent: "space-between",
});
