import React, { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store.toolkit/store";
import { getClasses } from "../../store.toolkit/features/class.slice";
import * as S from "./StudentListStyle";
import { StudentCard } from "../../components/StudentCard/StudentCard";
import {
  deleteStudent,
  getStudents,
} from "../../store.toolkit/features/student.slice";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { studentService } from "../../services/student.service";

export const StudentList: FC = () => {
  const students = useAppSelector((state) => state.student.students);

  const dispatch = useAppDispatch();

  const removeStudent = async (studentId: number | string) => {
    try {
      studentService.remove(studentId);
      dispatch(deleteStudent(studentId));
    } catch (err) {
      console.log("err", err);
    }
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
                  <button onClick={() => removeStudent(student._id)}>X</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </S.MainContainer>

    // <MainGrid container spacing={6}>
    //   {students.map((student) => (
    //     <StudentCard key={student._id} student={student} />
    //   ))}
    // </MainGrid>
  );
};
