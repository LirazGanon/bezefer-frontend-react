import React, { FC, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store.toolkit/store";
import {
  assignStudent,
  removeStudentFromAll,
} from "../../store.toolkit/features/class.slice";
import * as S from "./StudentListStyle";
import { deleteStudent } from "../../store.toolkit/features/student.slice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { studentService } from "../../services/student.service";
import { AssignModal } from "../../components/AssignModal/AssignModal";

export const StudentList: FC = () => {
  const students = useAppSelector((state) => state.student.students);
  const classes = useAppSelector((state) => state.classroom.Classes);
  const [chosenStudentId, setChosenStudentId] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();

  const removeStudent = async (studentId: number) => {
    try {
      studentService.remove(studentId);
      dispatch(deleteStudent(studentId));
      dispatch(removeStudentFromAll(studentId));
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
    dispatch(assignStudent(payload));
  };

  if (!students) return <h1>Loading</h1>;

  return (
    <S.MainContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                  <button onClick={() => openAssignModal(student._id)}>
                    Assign
                  </button>
                </TableCell>
                <TableCell align="center">
                  <button onClick={() => removeStudent(student._id)}>X</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AssignModal
        handleClose={handleClose}
        open={open}
        classes={classes}
        studentId={chosenStudentId}
        assignToClass={assignToClass}
      />
    </S.MainContainer>
  );
};
