import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import React, { FC } from "react";
import { Classroom } from "../../store.toolkit/features/class.slice";

export const ClassroomCard: FC<{ classRoom: Classroom }> = ({ classRoom }) => {
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <h1>{classRoom.name}</h1>
          <h4>There are {classRoom.placeLeft} seats left</h4>
          <p>Out of {classRoom.totalPlaces}</p>
          <div>
            <h3>STUDENT LIST</h3>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};
