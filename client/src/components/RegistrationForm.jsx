import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const submit = async () => {
    await API.post("/auth/register", form);
    navigate("/");
  };

  return (
    <div>
      <h2>Register</h2>
      {["firstName", "lastName", "email", "password", "confirmPassword"].map(f => (
        <input key={f} placeholder={f} type={f.includes("password") ? "password" : "text"}
               onChange={e => setForm({ ...form, [f]: e.target.value })} />
      ))}
      <button onClick={submit}>Register</button>
      <p>Already have account? <Link to="/">Login here</Link></p>
    </div>
  );
}
