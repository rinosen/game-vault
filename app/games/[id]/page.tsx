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
      <div className="card shadow overflow-hidden">
        <div style={{ height: "300px", position: "relative", backgroundColor: "black" }}>
           <img 
             src={game.image_url || "https://placehold.co/600x400?text=No+Image"} 
             alt={game.title} 
             style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
           />
           <div className="position-absolute bottom-0 start-0 p-4 text-white" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'}}>
             <h1 className="display-4 fw-bold">{game.title}</h1>
             <span className="badge bg-primary me-2">{game.platform}</span>
             <span className={`badge ${game.status === 'Finished' ? 'bg-success' : 'bg-warning'}`}>{game.status}</span>
           </div>
        </div>

        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-8">
              <h4 className="mb-3 text-primary">Your Review</h4>
              <div className="p-4 rounded bg-light border-0">
                <p className="fst-italic lead mb-0">"{game.review}"</p>
              </div>
            </div>
            <div className="col-md-4 border-start border-secondary">
               <div className="text-center">
                 <h5 className="mb-0">Personal Rating</h5>
                 <h1 className="display-1 fw-bold text-warning">{game.rating}</h1>
               </div>
               <hr />
               <div className="d-grid gap-2">
                 <Link href={`/games/${game.id}/edit`} className="btn btn-warning">Edit Data</Link>
                 <DeleteButton id={game.id} />
                 <Link href="/games" className="btn btn-secondary">Back to List</Link>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}