import { TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
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
  });

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
          variant="outlined"
          helperText=" "
          onChange={handleChange}
          required
        />
        <TextField
          id="outlined-basic"
          label="First Name"
          name="firstName"
          helperText=" "
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          name="lastName"
          helperText=" "
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
          }} //TODO Fix Pattern
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
          helperText=" "
          onChange={handleChange}
          variant="outlined"
          required
        />
        <S.SubmitButton>Add Student</S.SubmitButton>
      </S.StudentAddForm>
    </section>
  );
}
