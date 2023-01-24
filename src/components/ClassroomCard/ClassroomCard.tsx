import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import React, { FC, useState } from "react";
import { classService } from "../../services/class.service";
import {
  Classroom,
  deleteClassroom,
  removeStudent,
} from "../../store.toolkit/features/class.slice";
import { useAppDispatch, useAppSelector } from "../../store.toolkit/store";
import { RemoveModal } from "../RemoveModal/RemoveModal";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ClassroomCard: FC<{ classroom: Classroom }> = ({ classroom }) => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.student.students);

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const deleteFromClass = (payload: {
    classroomId: number | string;
    studentId: number;
  }) => {
    dispatch(removeStudent(payload));
  };

  const deleteClass = async () => {
    if (classroom.students.length > 0) {
      setOpenAlert(true);
      return;
    }

    try {
      classService.remove(classroom._id);
      dispatch(deleteClassroom(classroom._id));
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <Grid item xs={3}>
        <Card>
          <CardContent>
            <h1>{classroom.name}</h1>
            <h4>There are {classroom.placeLeft} seats left</h4>
            <p>Out of {classroom.totalPlaces}</p>
            <div>
              <h3 onClick={handleOpen}>STUDENT LIST</h3>
              <button onClick={deleteClass}>X</button>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <RemoveModal
        handleClose={handleClose}
        open={open}
        classroom={classroom}
        students={students}
        deleteFromClass={deleteFromClass}
      />
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Can't delete Class with student(s)
        </Alert>
      </Snackbar>
    </>
  );
};
