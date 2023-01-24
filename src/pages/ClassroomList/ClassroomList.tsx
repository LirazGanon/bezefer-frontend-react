import React, { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store.toolkit/store";
import { getClasses } from "../../store.toolkit/features/class.slice";
import { ClassroomCard } from "../../components/ClassroomCard/ClassroomCard";
import { MainGrid } from "./ClassroomListStyle";

export const ClassroomList: FC = () => {
  const classes = useAppSelector((state) => state.classroom.Classes);

  if (!classes) return <h1>Loading</h1>;

  return (
    <MainGrid container spacing={6}>
      {classes.map((classroom) => (
        <ClassroomCard key={classroom._id} classroom={classroom} />
      ))}
    </MainGrid>
  );
};
