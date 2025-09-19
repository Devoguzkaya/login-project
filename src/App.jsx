import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Success from "./components/Success";
function App() {
  return (
    <div className="App main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
