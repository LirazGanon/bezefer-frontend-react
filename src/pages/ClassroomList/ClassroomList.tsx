import React, { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store.toolkit/store";
import { getClasses } from "../../store.toolkit/features/class.slice";
import { ClassroomCard } from "../../components/ClassroomCard/ClassroomCard";
import { MainGrid } from "./ClassroomListStyle";
import { Grid, Skeleton } from "@mui/material";

export const ClassroomList: FC = () => {
  const classes = useAppSelector((state) => state.classroom.Classes);

  if (!classes.length || !classes) {
    return (
      <MainGrid container spacing={6}>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" height={190} />
            </Grid>
          ))}
      </MainGrid>
    );
  }

  return (
    <MainGrid container spacing={6}>
      {classes.map((classroom) => (
        <ClassroomCard key={classroom._id} classroom={classroom} />
      ))}
    </MainGrid>
  );
};
