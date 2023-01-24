import React, { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Classroom } from "../../store.toolkit/features/class.slice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Available Classes
            </Typography>
            {classes
              .filter(
                (classroom) =>
                  classroom.placeLeft > 0 &&
                  !classroom.students.includes(studentId)
              )
              .map((classroom) => (
                <div key={`${classroom._id}_${studentId}`}>
                  <span>{classroom.name}</span>
                  <button
                    onClick={() =>
                      assignToClass({ classroomId: classroom._id, studentId })
                    }
                  >
                    +
                  </button>
                </div>
              ))}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
