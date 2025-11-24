"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Tipe data props
interface Game {
  id: number;
  title: string;
  platform: string;
  status: string;
  rating: number;
  review: string;
}

export default function EditGameForm({ game }: { game: Game }) {
  const router = useRouter();
  
  // State diisi dengan data awal dari database (game.*)
  const [form, setForm] = useState({
    title: game.title,
    platform: game.platform,
    status: game.status,
    rating: game.rating,
    review: game.review || ""
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Kirim request PUT
    await fetch(`/api/games/${game.id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    // Refresh dan kembali ke halaman detail
    router.refresh(); 
    router.push(`/games/${game.id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input 
          type="text" 
          className="form-control" 
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} 
          required 
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Platform</label>
        <input 
          type="text" 
          className="form-control" 
          value={form.platform}
          onChange={(e) => setForm({ ...form, platform: e.target.value })} 
          required 
        />
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
          <label className="form-label">Rating (1-10)</label>
          <input 
            type="number" 
            className="form-control" 
            min="1" max="10" 
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
            required 
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Review</label>
        <textarea 
          className="form-control" 
          rows={4}
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-warning text-white" disabled={isSaving}>
        {isSaving ? "Saving..." : "Update Game"}
      </button>
    </form>
  );
}