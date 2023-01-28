import { FormHelperText, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "../../customHooks/useForm";
import { classService } from "../../services/class.service";
import {
  addClassroom,
  Classroom,
} from "../../store.toolkit/features/class.slice";
import { useAppDispatch, useAppSelector } from "../../store.toolkit/store";
import * as S from "./AddClassroomStyle";
import { ThemeContext } from "../../App";
import { BackdropLoader } from "../BackdropLoader/BackdropLoader";

export default function AddClassroom() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openBackDrop, setOpenBackDrop] = useState(false);
  const handleCloseBackDrop = () => {
    setOpenBackDrop(false);
  };
  const handleToggleBackDrop = () => {
    setOpenBackDrop(!openBackDrop);
  };

  const [isIdValid, setIsIdValid] = useState(true);

  const color = useContext(ThemeContext);

  const [classroom, handleChange, setClassroom] = useForm({
    _id: "",
    name: "",
    totalPlaces: "",
    placeLeft: "",
    students: [],
  });

  const onSubmitClassroom = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    handleToggleBackDrop();
    const classes: Classroom[] = await classService.query();
    const classesIds = classes.map((classroom) => classroom._id);

    const classroomToSave: Classroom = {
      ...classroom,
      placeLeft: classroom.totalPlaces,
    };

    if (classesIds.includes(classroomToSave._id)) {
      setIsIdValid(false);
      handleCloseBackDrop();
      return;
    }

    try {
      dispatch(addClassroom(classroomToSave));
      classService.save(classroomToSave);
      navigate("/");
    } catch (err) {
      console.log("err", err);
    }
  };

  const validateClassId = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setIsIdValid(true);
    handleChange(ev);
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
      <S.FormTitle>Create new class</S.FormTitle>
      <S.ClassroomAddForm onSubmit={onSubmitClassroom}>
        <TextField
          id="outlined-basic"
          label="Class ID"
          name="_id"
          variant="outlined"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          error={!isIdValid}
          onChange={validateClassId}
          helperText={isIdValid ? " " : "The ID entered is already in use."}
          required
        />

        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          error={classroom.name !== "" && classroom.name.trim().length === 0}
          helperText={
            classroom.name !== "" && classroom.name.trim().length === 0
              ? "Please fill out this field."
              : " "
          }
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          id="outlined-basic"
          label="Max Seats"
          inputProps={{
            inputMode: "numeric",
            pattern: "[1-9]|[1-4][0-9]|50",
          }}
          error={validateMaxSeats()}
          helperText={
            validateMaxSeats() ? "Only accept numbers between 1-50" : " "
          }
          name="totalPlaces"
          onChange={handleChange}
          variant="outlined"
          required
        />
        <S.SubmitButton themeColor={color}>Create Class</S.SubmitButton>
      </S.ClassroomAddForm>
      <BackdropLoader open={openBackDrop} />
    </section>
  );
}
