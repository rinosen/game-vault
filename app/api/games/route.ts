// app/api/games/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

// GET: Ambil semua data
export async function GET() {
  // Syntax SQL biasa: SELECT * FROM ...
  const stmt = db.prepare('SELECT * FROM games ORDER BY created_at DESC');
  const games = stmt.all();
  return NextResponse.json(games);
}

// POST: Tambah data
export async function POST(request: Request) {
  const body = await request.json();

  // Syntax SQL: INSERT INTO ...
  const stmt = db.prepare(`
    INSERT INTO games (title, platform, status, rating, review) 
    VALUES (@title, @platform, @status, @rating, @review)
  `);

  // Jalankan query
  const result = stmt.run({
    title: body.title,
    platform: body.platform,
    status: body.status,
    rating: body.rating,
    review: body.review
  });

  return NextResponse.json({ id: result.lastInsertRowid, ...body });
}