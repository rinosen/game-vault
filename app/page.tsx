// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mt-5 text-center">
      <div className="card shadow p-4">
        <h1 className="display-4">Game Vault</h1>
        <hr />
        <p className="lead">Nama: <strong>Carlo Fagasto</strong></p>
        <p className="lead">NIM: <strong>535240139</strong></p>
        <p>Topik Project: <strong>Personal Game Tracker & Database</strong></p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link href="/games" className="btn btn-primary">
            My Game List
          </Link>
          <Link href="/explore" className="btn btn-outline-secondary">
            Explore New Games
          </Link>
        </div>
      </div>
    </div>
  );
}