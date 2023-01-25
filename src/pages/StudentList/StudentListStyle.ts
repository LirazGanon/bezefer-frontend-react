import { styled, TableRow } from "@mui/material";

export const MainContainer = styled("main")({
  padding: "2em",
});

// EXAMPLE HOW TO USE SELECTOR
// TODO DELETE
export const TableStudent = styled(TableRow)({
  "& :last-child": {
    fontSize: "50px",
  },
});
