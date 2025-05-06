import React, { useState, useEffect } from 'react';
import './App.css';

const content = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    music: "https://www.youtube.com/embed/5qap5aO4i9A",
    message: "Take a deep breath. You're doing great."
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    music: "https://www.youtube.com/embed/1ZYbU82GVz4",
    message: "Peace begins with a pause."
  },
  {
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1600&q=80",
    music: "https://www.youtube.com/embed/MkNeIUgNPQ8",
    message: "You are enough, just as you are."
  },
  {
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1600&q=80",
    music: "https://www.youtube.com/embed/jfKfPfyJRdk",
    message: "One step at a time. No rush."
  },
  {
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
    music: "https://www.youtube.com/embed/odtC5gHUPLk",
    message: "Listen to silence. It speaks too."
  }
];

function App() {
  const [current, setCurrent] = useState(content[0] || {});
  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const parsed = JSON.parse(stored);
      setFavorites(parsed);
      checkIfFavorited(current, parsed);
    }
  }, []);

  useEffect(() => {
    checkIfFavorited(current, favorites);
  }, [current, favorites]);

  const checkIfFavorited = (item, list) => {
    if (!item || !item.image) {
      setIsFavorited(false);
      return;
    }
    const already = list.some(
      (f) => f.image === item.image && f.music === item.music
    );
    setIsFavorited(already);
  };

  const handleClick = () => {
    const random = content[Math.floor(Math.random() * content.length)];
    setCurrent(random);
  };

  const handleAddFavorite = () => {
    if (!current || !current.image) return;
    const updated = [...favorites, current];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
    setIsFavorited(true);
  };

  if (!current || !current.image) {
    return <div className="App"><h2>Loading...</h2></div>;
  }

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${current.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <div className="overlay">
        <h1>SereniTap</h1>
        <div className="player-wrapper">
          <iframe
            width="560"
            height="315"
            src={current.music}
            title="Soothing Music"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
        <p className="message">"{current.message}"</p>
        <div className="button-group">
          <button onClick={handleClick}>🌿 Tap for Calm</button>
          <button onClick={handleAddFavorite} disabled={isFavorited}>
            {isFavorited ? "★ Saved!" : "💾 Save to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
