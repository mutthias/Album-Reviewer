import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, body: 'hello world!' }, { status: 200 });
}
