import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { setUser } from "../auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async () => {
    const res = await API.post("/auth/login", form);
    setUser(res.data.user);
    navigate("/home");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Login</button>
      <p>Don't have account? <Link to="/register">Register here</Link></p>
    </div>
  );
}
