import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { studentService } from "../../services/student.service";

export interface Student {
  _id: number;
  firstName: string;
  lastName: string;
  age?: number;
  profession: string;
  classroom?: string | number | null;
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
    updateStudent: (state, action: PayloadAction<Student>) => {
      const idx = state.students.findIndex(
        (student) => student._id === action.payload._id
      );
      console.log(idx);
      state.students[idx] = action.payload;
      console.log(action.payload);
      studentService.update(action.payload);
    },
    deleteStudent: (state, action: PayloadAction<number>) => {
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
    },
    removeStudentClassroom: (state, action: PayloadAction<number>) => {
      const idx = state.students.findIndex(
        (student) => student._id === action.payload
      );
      state.students[idx].classroom = null;
      studentService.update(state.students[idx]);
    },
  },
});

export const {
  setStudents,
  addStudents,
  deleteStudent,
  updateStudent,
  removeStudentClassroom,
} = studentsSlice.actions;

export const getStudents = () => async (dispatch: Dispatch) => {
  try {
    const students = await studentService.query();
    dispatch(setStudents(students));
  } catch (err) {
    console.log(err);
  }
};

export default studentsSlice;
