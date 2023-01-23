import React from "react";
import AddClassroom from "../../components/AddClassroom/AddClassroom";
import AddStudent from "../../components/AddStudent/AddStudent";
import { MainSection } from "./AddPageStyle";

export default function AddPage() {
  return (
    <MainSection>
      <AddClassroom />
      <AddStudent />
    </MainSection>
  );
}
