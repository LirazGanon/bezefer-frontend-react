import React, { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Classroom } from "../../store.toolkit/features/class.slice";
import SchoolIcon from "@mui/icons-material/School";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import * as S from "./AssignModalStyle";

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

export const AssignModal: FC<{
  handleClose: () => void;
  open: boolean;
  classes: Classroom[];
  studentId: number | undefined;
  assignToClass: (payload: {
    classroomId: number | string;
    studentId: number;
  }) => void;
}> = ({ handleClose, open, classes, studentId, assignToClass }) => {
  if (!studentId) return null;
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
            <S.Title>Available Classes</S.Title>
            <List>
              {classes
                .filter(
                  (classroom) =>
                    classroom.placeLeft > 0 &&
                    !classroom.students.includes(studentId)
                )
                .map((classroom) => (
                  <ListItem disableGutters key={classroom._id}>
                    <ListItemButton
                      onClick={() =>
                        assignToClass({ classroomId: classroom._id, studentId })
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <SchoolIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={classroom.name} />
                      <span>+</span>
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
