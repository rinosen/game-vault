import db from "@/lib/db";
import Link from "next/link";
import EditGameForm from "./EditGameForm";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const stmt = db.prepare('SELECT * FROM games WHERE id = ?');
  const game: any = stmt.get(id);

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Game: <span className="text-primary">{game.title}</span></h2>
      
      <div className="card shadow p-4">
        <EditGameForm game={game} />
      </div>

      <div className="mt-3">
        <Link href={`/games/${id}`} className="btn btn-secondary">Cancel</Link>
      </div>
    </div>
  );
}