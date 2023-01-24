import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { studentService } from "../../services/student.service";

export interface Student {
  _id: number;
  firstName: string;
  lastName: string;
  age?: number;
  profession?: string;
}

interface StudentsState {
  students: Student[];
}

const initialState: StudentsState = {
  students: [],
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
    addStudents: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
    deleteStudent: (state, action: PayloadAction<number | string>) => {
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
    },
  },
});

export const { setStudents, addStudents, deleteStudent } =
  studentsSlice.actions;

export const getStudents = () => async (dispatch: Dispatch) => {
  try {
    const students = await studentService.query();
    dispatch(setStudents(students));
  } catch (err) {
    console.log(err);
  }
};

export default studentsSlice;
