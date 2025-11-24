import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  const stmt = db.prepare('SELECT * FROM games ORDER BY created_at DESC');
  const games = stmt.all();
  return NextResponse.json(games);
}

export async function POST(request: Request) {
  const body = await request.json();

  const stmt = db.prepare(`
    INSERT INTO games (title, platform, status, rating, review) 
    VALUES (@title, @platform, @status, @rating, @review)
  `);

  const result = stmt.run({
    title: body.title,
    platform: body.platform,
    status: body.status,
    rating: body.rating,
    review: body.review
  });

  return NextResponse.json({ id: result.lastInsertRowid, ...body });
}