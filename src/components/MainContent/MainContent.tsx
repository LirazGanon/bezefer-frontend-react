import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import AddPage from "../../pages/AddPage/AddPage";

import { ClassroomList } from "../../pages/ClassroomList/ClassroomList";
import { StudentList } from "../../pages/StudentList/StudentList";

export const MainContent: FC = () => {
  return (
    <Routes>
      <Route element={<ClassroomList />} path="/" />
      <Route element={<StudentList />} path="/student" />
      <Route element={<AddPage />} path="/add" />
    </Routes>
  );
};
