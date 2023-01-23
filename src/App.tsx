import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import { MainContent } from "./components/MainContent/MainContent";
import { getClasses } from "./store.toolkit/features/class.slice";
import { getStudents } from "./store.toolkit/features/student.slice";
import { useAppDispatch } from "./store.toolkit/store";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getClasses());
    dispatch(getStudents());
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <AppHeader />
        <MainContent />
      </HashRouter>
    </div>
  );
}

export default App;
