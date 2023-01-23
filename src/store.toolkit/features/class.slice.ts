import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { classService } from "../../services/class.service";
import { Dispatch } from "redux";

export interface Classroom {
  _id: string | number;
  name: string;
  totalPlaces?: number;
  placeLeft?: number;
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
  },
});

export const { setClasses, addClassroom } = ClassesSlice.actions;

export const getClasses = () => async (dispatch: Dispatch) => {
  try {
    const classes = await classService.query();
    dispatch(setClasses(classes));
  } catch (err) {
    console.log(err);
  }
};

export default ClassesSlice;
