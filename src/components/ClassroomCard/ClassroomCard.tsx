import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import React, { FC } from "react";
import { classService } from "../../services/class.service";
import {
  Classroom,
  deleteClassroom,
} from "../../store.toolkit/features/class.slice";
import { useAppDispatch } from "../../store.toolkit/store";

export const ClassroomCard: FC<{ classRoom: Classroom }> = ({ classRoom }) => {
  const dispatch = useAppDispatch();

  const deleteClass = async () => {
    try {
      classService.remove(classRoom._id);
      dispatch(deleteClassroom(classRoom._id));
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <h1>{classRoom.name}</h1>
          <h4>There are {classRoom.placeLeft} seats left</h4>
          <p>Out of {classRoom.totalPlaces}</p>
          <div>
            <h3>STUDENT LIST</h3>
            <button onClick={deleteClass}>X</button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};
