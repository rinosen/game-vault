import { NextResponse } from 'next/server';
import db from '@/lib/db';

// Perhatikan tipe data params diubah menjadi Promise
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. WAJIB: Await params sebelum mengambil ID
    const { id } = await params;

    console.log("Mencoba menghapus Game ID:", id); // Cek terminal VS Code saat tombol ditekan

    // 2. Jalankan perintah SQL Delete
    const stmt = db.prepare('DELETE FROM games WHERE id = ?');
    const result = stmt.run(id);

    // 3. Cek apakah ada baris yang terhapus
    if (result.changes === 0) {
        // Jika 0, berarti ID tidak ditemukan di database
        return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("Error deleting game:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // 1. Await params (Next.js 15)
    const body = await request.json(); // 2. Ambil data baru dari form

    // 3. Update database
    const stmt = db.prepare(`
      UPDATE games 
      SET title = @title, 
          platform = @platform, 
          status = @status, 
          rating = @rating, 
          review = @review
      WHERE id = @id
    `);

    const result = stmt.run({
      ...body,
      id: id
    });

    if (result.changes === 0) {
      return NextResponse.json({ message: "Game not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated successfully" });

  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}