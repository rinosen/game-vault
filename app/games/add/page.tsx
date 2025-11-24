// app/games/add/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddGame() {
  const [form, setForm] = useState({ title: "", platform: "", status: "Playing", rating: 5, review: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/games", {
      method: "POST",
      body: JSON.stringify(form),
    });
    router.push("/games");
    router.refresh();
  };

  return (
    <div className="container mt-5">
      <h2>Add New Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" required 
                 onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Platform</label>
          <input type="text" className="form-control" required 
                 onChange={(e) => setForm({ ...form, platform: e.target.value })} />
        </div>
        <div className="mb-3">
           <label className="form-label">Status</label>
           <select className="form-select" onChange={(e) => setForm({ ...form, status: e.target.value })}>
             <option value="Playing">Playing</option>
             <option value="Finished">Finished</option>
             <option value="Wishlist">Wishlist</option>
           </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Rating (1-10)</label>
          <input type="number" className="form-control" min="1" max="10" required 
                 onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Review</label>
          <textarea className="form-control" rows={3} 
                 onChange={(e) => setForm({ ...form, review: e.target.value })}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Save Game</button>
      </form>
    </div>
  );
}