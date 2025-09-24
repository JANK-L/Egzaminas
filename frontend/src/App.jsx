import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginSignup from "./pages/LoginSignup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/Login" element={<LoginSignup />} />
            <Route path="/Signup" element={<LoginSignup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
