import { useEffect, useState } from "react";
import API from "../api";
import { getUser } from "../auth";
import { Link } from "react-router-dom";

export default function MyQuotes() {
  const [quotes, setQuotes] = useState([]);
  const user = getUser();

  useEffect(() => {
    API.get(`/quotes/my/${user._id}`).then(res => setQuotes(res.data));
  }, []);

  return (
    <div>
      <h2>My Quotes</h2>
      <Link to="/my-quote"><button>Add</button></Link>
      {quotes.map(q => (
        <div key={q._id} style={{ border: "1px solid", margin: 10 }}>
          <p>{q.text} - {q.author}</p>
        </div>
      ))}
    </div>
  );
}
