import { ClassesSlice } from "./features/class.slice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import studentsSlice from "./features/student.slice";

export const store = configureStore({
  reducer: {
    classroom: ClassesSlice.reducer,
    student: studentsSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
