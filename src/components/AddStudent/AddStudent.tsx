import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../App";
import { useForm } from "../../customHooks/useForm";
import { studentService } from "../../services/student.service";
import {
  addStudents,
  Student,
} from "../../store.toolkit/features/student.slice";
import { useAppDispatch } from "../../store.toolkit/store";
import { BackdropLoader } from "../BackdropLoader/BackdropLoader";
import * as S from "./AddStudentStyle";

export default function AddClassroom() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isIdValid, setIsIdValid] = useState(true);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const handleCloseBackDrop = () => {
    setOpenBackDrop(false);
  };
  const handleToggleBackDrop = () => {
    setOpenBackDrop(!openBackDrop);
  };

  const handleError = () => {
    if (
      isNaN(+student._id) ||
      (student._id !== "" && student._id.length !== 9) ||
      !isIdValid
    ) {
      return true;
    }
  };

  const handleHelperText = () => {
    if (handleError()) {
      if (!isIdValid) return "The ID entered is already in use.";
      return "Please insert 9 digit.";
    }
    return " ";
  };

  const validateStudentId = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setIsIdValid(true);
    handleChange(ev);
  };

  const [student, handleChange, setStudent] = useForm({
    _id: "",
    firstName: "",
    lastName: "",
    age: "",
    profession: "",
    classroom: null,
  });

  const color = useContext(ThemeContext);

  const onSubmitStudent = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    handleToggleBackDrop();
    const students: Student[] = await studentService.query();
    const studentsIds = students.map((student) => student._id);

    console.log(student._id);

    console.log(studentsIds);
    if (studentsIds.includes(+student._id)) {
      setIsIdValid(false);
      handleCloseBackDrop();
      return;
    }
    try {
      dispatch(addStudents(student));
      studentService.save(student);
      navigate("/student");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <section>
      <S.FormTitle>Add new student</S.FormTitle>
      <S.StudentAddForm onSubmit={onSubmitStudent}>
        <TextField
          id="outlined-basic"
          label="ID"
          name="_id"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]{9}",
          }}
          error={handleError()}
          variant="outlined"
          helperText={handleHelperText()}
          onChange={validateStudentId}
          required
        />
        <TextField
          id="outlined-basic"
          label="First Name"
          name="firstName"
          error={
            student.firstName !== "" && student.firstName.trim().length === 0
          }
          helperText={
            student.firstName !== "" && student.firstName.trim().length === 0
              ? "Please fill out this field."
              : " "
          }
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          name="lastName"
          error={
            student.lastName !== "" && student.lastName.trim().length === 0
          }
          helperText={
            student.lastName !== "" && student.lastName.trim().length === 0
              ? "Please fill out this field."
              : " "
          }
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          id="outlined-basic"
          label="Age"
          inputProps={{
            inputMode: "numeric",
            pattern: "[1-9]|[1-9][0-9]|1[0-1][0-9]|120",
          }}
          error={student.age < 0 || student.age > 120}
          helperText={
            student.age < 0 || student.age > 120 ? "Invalid Age" : " "
          }
          name="age"
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Profession"
          name="profession"
          error={
            student.profession !== "" && student.profession.trim().length === 0
          }
          helperText={
            student.profession !== "" && student.profession.trim().length === 0
              ? "Please fill out this field."
              : " "
          }
          onChange={handleChange}
          variant="outlined"
          required
        />
        <S.SubmitButton themeColor={color}>Add Student</S.SubmitButton>
      </S.StudentAddForm>
      <BackdropLoader open={openBackDrop} />
    </section>
  );
}
