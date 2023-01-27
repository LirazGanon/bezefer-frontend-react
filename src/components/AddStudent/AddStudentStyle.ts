import { styled } from "@mui/material";

export const FormTitle = styled("h2")({
  fontSize: "clamp(1.2rem, 3vw, 2.4rem)",
  textAlign: "center",
  fontWeight: "400",
  marginBottom: "1em",
});

export const StudentAddForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  "& > div": {
    ["@media (min-width:600px)"]: { width: "80%" },
    alignSelf: "center",
  },
});

export const SubmitButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "themeColor",
})<{ themeColor: string }>(({ themeColor }) => ({
  color: "#fff",
  padding: "10px",
  fontSize: "clamp(1rem,2vw,1.25rem)",
  textTransform: "uppercase",
  background: themeColor,
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
}));
