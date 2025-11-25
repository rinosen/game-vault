import Link from "next/link";
import db from "@/lib/db";

interface Game {
  id: number;
  title: string;
  platform: string;
  status: string;
  rating: number;
  image_url?: string;
}

export const dynamic = 'force-dynamic';

export default function GameList() {
  const stmt = db.prepare('SELECT * FROM games ORDER BY created_at DESC');
  const games = stmt.all() as Game[];

  const getStatusBadge = (status: string) => {
    if (status === 'Finished') return 'bg-success';
    if (status === 'Playing') return 'bg-primary';
    return 'bg-secondary';
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Game Vault</h1>
        <Link href="/games/add" className="btn btn-primary">+ Add Game</Link>
      </div>

      {games.length === 0 ? (
        <div className="alert alert-info text-center">
          <p className="mb-0">Belum ada game. Tambahkan game favoritmu sekarang!</p>
        </div>
      ) : (
        <div className="row">
          {games.map((game) => (
            <div key={game.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm border-0 overflow-hidden">
                <div style={{ height: "140px", overflow: "hidden", position: "relative", backgroundColor: '#000' }}>
                  <img 
                    src={game.image_url || "https://placehold.co/600x400?text=No+Image"} 
                    alt={game.title}
                    className="card-img-top"
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      opacity: 0.9 
                    }} 
                  />
                  <span className={`badge ${getStatusBadge(game.status)} position-absolute top-0 end-0 m-2 shadow`}>
                    {game.status}
                  </span>
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate mb-1" title={game.title}>{game.title}</h5>
                  <small className="mb-3" style={{color: '#8f98a0'}}>{game.platform}</small>
                  
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-warning">★ {game.rating}/10</span>
                    <Link href={`/games/${game.id}`} className="btn btn-sm btn-outline-primary">
                      View Detail
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <Link href="/" className="btn btn-secondary">Back Home</Link>
      </div>
    </div>
  );
}
