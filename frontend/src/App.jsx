import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginSignup from "./pages/LoginSignup";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AddEquipment from "./pages/AddEquipment";
import Product from "./pages/Product";
import Reservations from "./pages/Reservations";
import EditEquipment from "./pages/EditEquipment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Reservation" element={<Reservations />} />
            <Route path="/Reservation/:id" element={<Product />} />
            <Route path="/Login" element={<LoginSignup />} />
            <Route path="/Signup" element={<LoginSignup />} />
            <Route path="/Equipment/add" element={<AddEquipment />} />
            <Route path="/Equipment/edit" element={<Home />} />
            <Route path="/Equipment/edit/:id" element={<EditEquipment />} />
            <Route path="/Equipment/:id" element={<Product />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
