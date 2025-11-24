import Link from "next/link";
import db from "@/lib/db";
import DeleteButton from "./DeleteButton"; 

export default async function GameDetail({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;

  console.log("Sedang membuka detail untuk Game ID:", id);

  const stmt = db.prepare('SELECT * FROM games WHERE id = ?');
  const game: any = stmt.get(id);

  if (!game) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">Game not found</h2>
        <p className="text-muted">Tidak ada data game dengan ID: {id}</p>
        <Link href="/games" className="btn btn-secondary mt-3">Back to List</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <span>Game Detail</span>
          <span className="badge bg-light text-dark">ID: {game.id}</span>
        </div>
        <div className="card-body">
          <h2 className="card-title display-6">{game.title}</h2>
          
          <div className="row mt-4">
            <div className="col-md-6">
              <p><strong>Platform:</strong> <br/> {game.platform}</p>
              <p><strong>Status:</strong> <br/> 
                <span className={`badge ${game.status === 'Finished' ? 'bg-success' : 'bg-warning'}`}>
                  {game.status}
                </span>
              </p>
              <p><strong>Rating:</strong> <br/> {game.rating} / 10</p>
            </div>
            
            <div className="col-md-6">
              <div className="p-3 bg-light rounded h-100">
                <strong>Review:</strong>
                <p className="mt-2 fst-italic">"{game.review}"</p>
              </div>
            </div>
          </div>
          
          <hr className="my-4"/>
          
          <div className="d-flex gap-2">
            <Link href="/games" className="btn btn-secondary">Back</Link>
            <Link href={`/games/${game.id}/edit`} className="btn btn-warning text-white">
                Edit
            </Link>
            <DeleteButton id={game.id} />
          </div>
        </div>
      </div>
    </div>
  );
}