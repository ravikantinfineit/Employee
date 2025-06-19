import React, { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { initializeEmployeeData } from "./utils/initializeData";

const App: React.FC = () => {
  useEffect(() => {
    initializeEmployeeData();
  }, []);

  return <Dashboard />;
};

export default App;
