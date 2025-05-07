import { useEffect, useState } from "react";
import API from "../api";
import { getUser } from "../auth";

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [tab, setTab] = useState("all");
  const user = getUser();

  useEffect(() => {
    API.get("/quotes").then(res => setQuotes(res.data));
    API.get(`/quotes/favorites/${user._id}`).then(res => setFavorites(res.data));
  }, []);

  const toggleFavorite = async (quoteId) => {
    const res = await API.post("/quotes/favorite", { userId: user._id, quoteId });
    setFavorites(res.data);
  };

  const isFav = (id) => favorites.some(q => q._id === id);

  const displayed = tab === "favorites" ? favorites : quotes;

  return (
    <div>
      <h2>Quotes Around the World</h2>
      <button onClick={() => setTab("all")}>All</button>
      <button onClick={() => setTab("favorites")}>Favorites</button>
      {displayed.map(q => (
        <div key={q._id} style={{ border: "1px solid", margin: 10 }}>
          <p>{q.text} - {q.author}</p>
          <button onClick={() => toggleFavorite(q._id)}>
            {isFav(q._id) ? "❤️" : "🤍"}
          </button>
        </div>
      ))}
    </div>
  );
}
