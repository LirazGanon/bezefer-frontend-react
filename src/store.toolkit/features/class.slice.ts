import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { classService } from "../../services/class.service";
import { Dispatch } from "redux";

export interface Classroom {
  _id: string | number;
  name: string;
  totalPlaces: number;
  placeLeft: number;
  students: (string | number)[];
}

interface ClassesState {
  Classes: Classroom[];
}

const initialState: ClassesState = {
  Classes: [],
};

export const ClassesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    setClasses: (state, action: PayloadAction<Classroom[]>) => {
      state.Classes = action.payload;
    },
    addClassroom: (state, action: PayloadAction<Classroom>) => {
      state.Classes.push(action.payload);
    },
    deleteClassroom: (state, action: PayloadAction<number | string>) => {
      state.Classes = state.Classes.filter(
        (classroom) => classroom._id !== action.payload
      );
    },
    assignStudent: (
      state,
      action: PayloadAction<{
        classroomId: number | string;
        studentId: number | string;
      }>
    ) => {
      const classroomIdx = state.Classes.findIndex(
        (classroom) => classroom._id === action.payload.classroomId
      );
      state.Classes[classroomIdx].students.push(action.payload.studentId);
      state.Classes[classroomIdx].placeLeft--;
      classService.update(state.Classes[classroomIdx]);
    },
  },
});

export const { setClasses, addClassroom, deleteClassroom, assignStudent } =
  ClassesSlice.actions;

export const getClasses = () => async (dispatch: Dispatch) => {
  try {
    const classes = await classService.query();
    dispatch(setClasses(classes));
  } catch (err) {
    console.log(err);
  }
};

export default ClassesSlice;
