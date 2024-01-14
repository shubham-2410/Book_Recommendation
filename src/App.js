import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashBoard from './pages/DashBoard';
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
function App() {
  return (
    <div className=" bg-slate-900 min-h-screen" >

      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>

        
        <Route path="/dashboard" element={ <PrivateRoute><DashBoard/> </PrivateRoute>}></Route>
        <Route path="/my-profile" element={<PrivateRoute><MyProfile/> </PrivateRoute>}></Route>
        
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
