import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//page and components
import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";

const App = () => {
  const {user}=useAuthContext()
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user?<Home />: <Navigate to="/signup"/>} />
            <Route path="/signup" element={!user?<Signup />: <Navigate to='/'/>} />
            <Route path="/login" element={!user?<Login />: <Navigate to='/'/>} />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;
