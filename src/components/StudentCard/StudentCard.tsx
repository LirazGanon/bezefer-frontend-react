import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import React, { FC } from "react";
import { Student } from "../../store.toolkit/features/student.slice";

export const StudentCard: FC<{ student: Student }> = ({ student }) => {
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <h1>{student._id}</h1>
          <h1>{student.firstName}</h1>
          <h1>{student.lastName}</h1>
          <h1>{student.age}</h1>
          <h1>{student.profession}</h1>
          <div>
            <h3>STUDENT LIST 😎😎</h3>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};
