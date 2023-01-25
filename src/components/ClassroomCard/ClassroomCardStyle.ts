import { Card, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const ClassroomCard = styled(Card)({
  padding: "1em",
  minHeight: "190px",
  display: "flex",
  flexDirection: "column",
  "& > div": {
    flexGrow: "1",
  },
});

export const POutOf = styled("p")({
  fontSize: "0.9rem",
  color: "#8F8F8F",
});

export const BottomContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  "& > p": {
    margin: "0",
    cursor: "pointer",
  },
});

export const DeleteStudent = styled(DeleteIcon, {
  shouldForwardProp: (prop) => prop !== "themeColor",
})<{ themeColor: string }>(({ themeColor }) => ({
  color: themeColor,
  cursor: "pointer",
}));
