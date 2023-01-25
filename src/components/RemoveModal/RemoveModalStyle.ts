import { ListItemText, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const Title = styled("h1")({
  fontWeight: "400",
  textAlign: "center",
});

export const DeleteStudentIcon = styled(DeleteIcon)({
  color: "#3F50B5",
});

export const StudentItemText = styled(ListItemText)({
  marginInlineEnd: "8px",
});
