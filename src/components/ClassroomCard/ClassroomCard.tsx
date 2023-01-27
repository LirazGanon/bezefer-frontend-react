import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import React, { FC, useContext, useState } from "react";
import { classService } from "../../services/class.service";
import {
  Classroom,
  deleteClassroom,
  removeStudent,
} from "../../store.toolkit/features/class.slice";
import { useAppDispatch, useAppSelector } from "../../store.toolkit/store";
import { RemoveModal } from "../RemoveModal/RemoveModal";
import DeleteIcon from "@mui/icons-material/Delete";
import * as S from "./ClassroomCardStyle";
import { ThemeContext } from "../../App";
import { removeStudentClassroom } from "../../store.toolkit/features/student.slice";

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

  const color = useContext(ThemeContext);

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
    dispatch(removeStudentClassroom(payload.studentId));
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
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <S.ClassroomCard>
          <div>
            <h1>{classroom.name}</h1>
            <p>There are {classroom.placeLeft} seats left</p>
            <S.POutOf>Out of {classroom.totalPlaces}</S.POutOf>
          </div>
          <S.BottomContainer>
            <p onClick={handleOpen}>STUDENTS LIST</p>
            <S.DeleteStudent themeColor={color} onClick={deleteClass} />
          </S.BottomContainer>
        </S.ClassroomCard>
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
