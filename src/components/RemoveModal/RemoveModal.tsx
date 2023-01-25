import React, { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Student } from "../../store.toolkit/features/student.slice";
import { Classroom } from "../../store.toolkit/features/class.slice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import * as S from "./RemoveModalStyle";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 3,
};

export const RemoveModal: FC<{
  handleClose: () => void;
  open: boolean;
  students: Student[];
  classroom: Classroom;
  deleteFromClass: (payload: {
    classroomId: number | string;
    studentId: number;
  }) => void;
}> = ({ handleClose, open, students, classroom, deleteFromClass }) => {
  if (!classroom) return null;
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <S.Title>Class Students</S.Title>
            <List>
              {students
                .filter((student) => classroom.students.includes(student._id))
                .map((student) => (
                  <ListItem disableGutters key={student._id}>
                    <ListItemButton
                      onClick={() =>
                        deleteFromClass({
                          classroomId: classroom._id,
                          studentId: student._id,
                        })
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <S.StudentItemText
                        primary={`${student.firstName} ${student.lastName}`}
                      />
                      <S.DeleteStudentIcon />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
