import { styled } from "@mui/material";

export const FormTitle = styled("h2")({
  fontSize: "2.4em",
  fontWeight: "400",
});

export const ClassroomAddForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  "& > div": {
    width: "80%",
    alignSelf: "center",
  },
});

export const SubmitButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "themeColor",
})<{ themeColor: string }>(({ themeColor }) => ({
  color: "#fff",
  padding: "10px",
  fontSize: "1.25rem",
  textTransform: "uppercase",
  background: themeColor,
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
}));
