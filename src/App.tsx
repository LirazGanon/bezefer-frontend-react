import React, { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import { MainContent } from "./components/MainContent/MainContent";
import { getClasses } from "./store.toolkit/features/class.slice";
import { getStudents } from "./store.toolkit/features/student.slice";
import { useAppDispatch } from "./store.toolkit/store";

// export const ThemeContext = React.createContext({
//   theme: "#3F5022",
//   toggleThemeColor: () => {
//     return;
//   },
// });
export const ThemeContext = React.createContext("#3F50B5");

export function App() {
  const [theme, setTheme] = useState("#3F50B5");

  const toggleThemeColor = () => {
    setTheme((currTheme) => (currTheme === "#3F50B5" ? "#F50057" : "#3F50B5"));
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getClasses());
    dispatch(getStudents());
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <ThemeContext.Provider value={theme}>
          <AppHeader toggleThemeColor={toggleThemeColor} />
          <MainContent />
        </ThemeContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
