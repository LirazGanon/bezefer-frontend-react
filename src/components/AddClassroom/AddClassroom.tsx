import { TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useForm } from "../../customHooks/useForm";
import { classService } from "../../services/class.service";
import {
  addClassroom,
  Classroom,
} from "../../store.toolkit/features/class.slice";
import { useAppDispatch } from "../../store.toolkit/store";
import * as S from "./AddClassroomStyle";

export default function AddClassroom() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [classroom, handleChange, setClassroom] = useForm({
    _id: "",
    name: "",
    totalPlaces: "",
    placeLeft: "",
  });

  const onSubmitClassroom = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const classroomToSave: Classroom = {
      ...classroom,
      placeLeft: classroom.totalPlaces,
    };
    try {
      dispatch(addClassroom(classroomToSave));
      classService.save(classroomToSave);
      navigate("/");
    } catch (err) {
      console.log("err", err);
    }
  };

  const validateMaxSeats = () => {
    if (classroom.totalPlaces !== "") {
      if (
        isNaN(classroom.totalPlaces) ||
        classroom.totalPlaces <= 0 ||
        classroom.totalPlaces > 50
      )
        return true;
    }
    return false;
  };

  return (
    <section>
      <h1>Create new class</h1>
      <S.ClassroomAddForm onSubmit={onSubmitClassroom}>
        <TextField
          id="outlined-basic"
          label="Class ID"
          name="_id"
          variant="outlined"
          onChange={handleChange}
          helperText=" "
          required
        />
        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          onChange={handleChange}
          variant="outlined"
          helperText=" "
          required
        />
        <TextField
          id="outlined-basic"
          label="Max Seats"
          inputProps={{
            inputMode: "numeric",
            pattern: "[1-9]|[1-4][0-9]|50",
          }} //TODO Fix Pattern
          error={validateMaxSeats()}
          helperText={
            validateMaxSeats() ? "Only accept numbers between 1-50" : " "
          }
          name="totalPlaces"
          onChange={handleChange}
          variant="outlined"
          required
        />
        <S.SubmitButton>Create Class</S.SubmitButton>
      </S.ClassroomAddForm>
    </section>
  );
}
