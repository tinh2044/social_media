import { Routes, Route } from "react-router-dom"

import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    /* A router that is used to navigate between pages. */
    <Routes>
      {/* A route that is used to navigate to the login page. */}
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
