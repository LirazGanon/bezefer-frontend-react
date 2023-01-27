import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const ConfirmDialog: ({
  handleClickOpen,
  open,
}: {
  handleClickOpen: () => void;
  open: boolean;
  handleClose: () => void;
  removeStudent: () => Promise<void>;
}) => JSX.Element = ({ open, handleClose, removeStudent }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm Delete Student"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student from your school and
            from his assigned class?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Oh NO!
          </Button>
          <Button onClick={removeStudent} autoFocus>
            Hell Yeah!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
