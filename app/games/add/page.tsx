"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface GameSuggestion {
  gameID: string;
  external: string;
  thumb: string;
}

export default function AddGame() {
  const [form, setForm] = useState({ 
    title: "", 
    platform: "", 
    status: "Playing", 
    rating: 5, 
    review: "",
    image_url: ""
  });
  
  const [suggestions, setSuggestions] = useState<GameSuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const platforms = [
    "PC (Steam/Epic)", "PlayStation 5", "PlayStation 4", 
    "Xbox Series X/S", "Xbox One", "Nintendo Switch", "Mobile"
  ];

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (form.title.length > 2 && showDropdown) {
        setIsSearching(true);
        try {
          const res = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${form.title}&limit=5`);
          const data = await res.json();
          setSuggestions(data);
        } catch (error) {
          console.error(error);
          setSuggestions([]);
        } finally {
          setIsSearching(false);
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [form.title, showDropdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/games", {
      method: "POST",
      body: JSON.stringify(form),
    });
    router.push("/games");
    router.refresh();
  };

  const handleSelectGame = (game: GameSuggestion) => {
    setForm({ ...form, title: game.external, image_url: game.thumb });
    setShowDropdown(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4">Add New Game</h2>

        {form.image_url && (
          <div className="mb-4 text-center">
            <img src={form.image_url} alt="Preview" className="img-thumbnail" style={{maxHeight: '200px'}} />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              className="form-control" 
              required 
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value, image_url: "" });
                setShowDropdown(true);
              }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder="Type game name..."
              autoComplete="off"
            />

            {showDropdown && form.title.length > 2 && (
              <div className="list-group position-absolute w-100 shadow z-3 mt-1">
                {isSearching ? (
                  <div className="list-group-item text-muted">Searching...</div>
                ) : suggestions.map((game) => (
                  <button
                    key={game.gameID}
                    type="button"
                    className="list-group-item list-group-item-action d-flex align-items-center gap-2"
                    onClick={() => handleSelectGame(game)}
                  >
                    <img src={game.thumb} alt="thumb" style={{width: '40px', borderRadius: '4px'}} />
                    <span>{game.external}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Platform</label>
            <select 
              className="form-select" 
              required 
              value={form.platform} 
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
            >
              <option value="" disabled>-- Select Platform --</option>
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select 
                className="form-select" 
                value={form.status} 
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Playing">Playing</option>
                <option value="Finished">Finished</option>
                <option value="Wishlist">Wishlist</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Rating</label>
              <input 
                type="number" 
                className="form-control" 
                min="1" 
                max="10" 
                required 
                value={form.rating} 
                onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Review</label>
            <textarea 
              className="form-control" 
              rows={3} 
              value={form.review} 
              onChange={(e) => setForm({ ...form, review: e.target.value })}
            ></textarea>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Save Game</button>
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
