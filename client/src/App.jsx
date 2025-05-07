import {  Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Home from "./components/Home";
import MyQuotes from "./components/MyQuotes";
import AddQuote from "./components/AddQuote";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { createContext, useState } from "react";

export const AuthContext = createContext();

function App() {

  const [user, setUser] = useState(getUserFromSessionStorage());

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-quotes" element={<MyQuotes />} />
        <Route path="/add-quote" element={<AddQuote />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

