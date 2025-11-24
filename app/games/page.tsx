import Link from "next/link";
import db from "@/lib/db"; // Kita import koneksi database langsung

// Definisikan tipe data
interface Game {
  id: number;
  title: string;
  platform: string;
  status: string;
  rating: number;
}

export const dynamic = 'force-dynamic'; // Pastikan data selalu fresh saat direfresh

export default function GameList() {
  // SOLUSI: Jangan pakai fetch(), tapi panggil DB langsung.
  // Ini berjalan di server, jadi aman & cepat.
  const stmt = db.prepare('SELECT * FROM games ORDER BY created_at DESC');
  const games = stmt.all() as Game[];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h1>My Game Vault (SQLite)</h1>
        <Link href="/games/add" className="btn btn-primary">+ Add Game</Link>
      </div>

      {games.length === 0 ? (
         <div className="alert alert-info">
            Belum ada game yang ditambahkan. Silakan tambah game baru!
         </div>
      ) : (
        <div className="row">
          {games.map((game) => (
            <div key={game.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{game.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{game.platform}</h6>
                  
                  <div className="mb-2">
                    <span className={`badge ${game.status === 'Finished' ? 'bg-success' : 'bg-warning'}`}>
                      {game.status}
                    </span>
                  </div>
                  
                  <p className="card-text">Rating: <strong>{game.rating}/10</strong></p>
                  
                  <Link href={`/games/${game.id}`} className="btn btn-sm btn-outline-primary stretched-link">
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <Link href="/" className="btn btn-secondary">Back Home</Link>
      </div>
    </div>
  );
}