import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../auth";

export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();

  return user ? (
    <nav>
      <Link to="/home">Home</Link> | <Link to="/my-quotes">My Quotes</Link> | <Link to="/profile">Profile</Link> |{" "}
      <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
    </nav>
  ) : null;
}
