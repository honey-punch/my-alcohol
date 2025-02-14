import { NextRequest, NextResponse } from "next/server";
import { query } from "../db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    const queryText = id
      ? `
    SELECT json_agg(json_build_object('id', id, 'date', date, 'soju', soju, 'beer', beer)) AS users
    FROM "user"
    WHERE id = $1
  `
      : `
    SELECT json_agg(json_build_object('id', id, 'date', date, 'soju', soju, 'beer', beer)) AS users
    FROM "user"
  `;
    const queryParam = id ? [id] : [];

    const result = await query(queryText, queryParam);

    const users = result[0]?.users || [];
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `Failed to fetch users: ${error}` });
  }
}
