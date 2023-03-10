import React, { FC, useContext, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store.toolkit/store";
import {
  assignStudent,
  removeStudentFromAll,
} from "../../store.toolkit/features/class.slice";
import * as S from "./StudentListStyle";
import {
  deleteStudent,
  Student,
  updateStudent,
} from "../../store.toolkit/features/student.slice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { studentService } from "../../services/student.service";
import { AssignModal } from "../../components/AssignModal/AssignModal";
import { Button } from "@mui/material";
import { ConfirmDialog } from "../../components/ConfirmDialog/ConfirmDialog";
import { ThemeContext } from "../../App";

export const StudentList: FC = () => {
  const students = useAppSelector((state) => state.student.students);
  const classes = useAppSelector((state) => state.classroom.Classes);
  const [chosenStudentId, setChosenStudentId] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const color = useContext(ThemeContext);

  const handleConfirmOpen = () => {
    setOpenConfirm(true);
  };
  const handleConfirmClose = () => {
    setOpenConfirm(false);
  };

  const handleRemoveClick = (studentId: number) => {
    setChosenStudentId(studentId);
    handleConfirmOpen();
  };

  const dispatch = useAppDispatch();

  const removeStudent = async () => {
    handleConfirmClose();
    if (!chosenStudentId) return;
    try {
      studentService.remove(chosenStudentId);
      dispatch(deleteStudent(chosenStudentId));
      dispatch(removeStudentFromAll(chosenStudentId));
    } catch (err) {
      console.log("err", err);
    }
  };

  const openAssignModal = (studentId: number) => {
    setChosenStudentId(studentId);
    handleOpen();
  };

  const assignToClass = (payload: {
    classroomId: number | string;
    studentId: number;
  }) => {
    let student = students.find(
      (student: Student) => student._id === payload.studentId
    );
    if (student) {
      student = { ...student };
      student.classroom = payload.classroomId;
      dispatch(updateStudent(student));
    }
    dispatch(assignStudent(payload));
  };

  if (!students) return <h1>Loading</h1>;

  return (
    <S.MainContainer>
      <S.TContainer>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Profession</TableCell>
              <TableCell align="center">Assign</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell align="center">{student._id}</TableCell>
                <TableCell align="center">{student.firstName}</TableCell>
                <TableCell align="center">{student.lastName}</TableCell>
                <TableCell align="center">{student.age}</TableCell>
                <TableCell align="center">{student.profession}</TableCell>
                <TableCell align="center">
                  <S.ActionButton
                    variant="outlined"
                    onClick={() => openAssignModal(student._id)}
                    themeColor={color}
                  >
                    ASSIGN TO CLASS
                  </S.ActionButton>
                </TableCell>
                <TableCell align="center">
                  <S.ActionButton
                    variant="outlined"
                    onClick={() => handleRemoveClick(student._id)}
                    themeColor={color}
                  >
                    DELETE
                  </S.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </S.TContainer>
      <AssignModal
        handleClose={handleClose}
        open={open}
        classes={classes}
        students={students}
        studentId={chosenStudentId}
        assignToClass={assignToClass}
      />
      <ConfirmDialog
        handleClickOpen={handleConfirmOpen}
        open={openConfirm}
        handleClose={handleConfirmClose}
        removeStudent={removeStudent}
      />
    </S.MainContainer>
  );
};
