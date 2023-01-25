import { ListItemText, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const Title = styled("h1")({
  fontWeight: "400",
  textAlign: "center",
});

export const DeleteStudentIcon = styled(DeleteIcon, {
  shouldForwardProp: (prop) => prop !== "themeColor",
})<{ themeColor: string }>(({ themeColor }) => ({
  color: themeColor,
  cursor: "pointer",
}));

export const StudentItemText = styled(ListItemText)({
  marginInlineEnd: "8px",
});
