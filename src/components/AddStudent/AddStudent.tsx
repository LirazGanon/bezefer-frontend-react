import { TextField } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../App";
import { useForm } from "../../customHooks/useForm";
import { studentService } from "../../services/student.service";
import { addStudents } from "../../store.toolkit/features/student.slice";
import { useAppDispatch } from "../../store.toolkit/store";
import * as S from "./AddStudentStyle";

export default function AddClassroom() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
          error={
            isNaN(+student._id) ||
            (student._id !== "" && student._id.length !== 9)
          }
          variant="outlined"
          helperText={
            isNaN(student._id) ||
            (student._id !== "" && student._id.length !== 9)
              ? "Please insert 9 digit."
              : " "
          }
          onChange={handleChange}
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
    </section>
  );
}
