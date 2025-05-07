import { useEffect, useState } from "react";
import API from "../api";
import { getUser, setUser } from "../auth";

export default function Profile() {
  const [form, setForm] = useState({});
  const user = getUser();

  useEffect(() => {
    API.get(`/profile/${user._id}`).then(res => setForm(res.data));
  }, []);

  const update = async () => {
    const res = await API.post("/profile/update", { ...form, userId: user._id });
    setUser(res.data);
  };

  return (
    <div>
      <h2>My Profile</h2>
      {["firstName", "lastName", "email", "address", "phone"].map(f => (
        <input key={f} placeholder={f} value={form[f] || ""}
               onChange={e => setForm({ ...form, [f]: e.target.value })} />
      ))}
      <button onClick={update}>Save</button>
    </div>
  );
}
