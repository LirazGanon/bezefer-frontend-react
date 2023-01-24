import React, { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Student } from "../../store.toolkit/features/student.slice";
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Class Students
            </Typography>
            {students
              .filter((student) => classroom.students.includes(student._id))
              .map((student) => (
                <div key={`${student._id}_${classroom._id}`}>
                  <span>{student.firstName}</span>
                  <button
                    onClick={() =>
                      deleteFromClass({
                        classroomId: classroom._id,
                        studentId: student._id,
                      })
                    }
                  >
                    X
                  </button>
                </div>
              ))}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
