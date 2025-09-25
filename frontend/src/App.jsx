import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginSignup from "./pages/LoginSignup";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AddEquipment from "./pages/AddEquipment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<LoginSignup />} />
            <Route path="/Signup" element={<LoginSignup />} />
            <Route path="/Equipment/add" element={<AddEquipment />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
