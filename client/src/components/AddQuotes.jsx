import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { getUser } from "../auth";

export default function AddQuote() {
  const [form, setForm] = useState({ author: "", text: "" });
  const navigate = useNavigate();
  const user = getUser();

  const submit = async () => {
    await API.post("/quotes/add", { ...form, userId: user._id });
    navigate("/add-quotes");
  };

  return (
    <div>
      <h2>Add Quote</h2>
      <input placeholder="author" onChange={e => setForm({ ...form, author: e.target.value })} />
      <textarea placeholder="Quote here" onChange={e => setForm({ ...form, text: e.target.value })}></textarea>
      <button onClick={submit}>Add</button>
    </div>
  );
}

