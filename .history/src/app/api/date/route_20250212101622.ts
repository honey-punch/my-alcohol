import { NextRequest, NextResponse } from "next/server";
import { query } from "../db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    const queryText = id
      ? `
    SELECT json_agg(json_build_object('id', id, 'date', date, 'soju', soju, 'beer', beer)) AS dates
    FROM "date"
    WHERE id = $1
  `
      : `
    SELECT json_agg(json_build_object('id', id, 'date', date, 'soju', soju, 'beer', beer)) AS dates
    FROM "date"
  `;
    const queryParam = id ? [id] : [];

    const result = await query(queryText, queryParam);

    console.log(1, result[1]);

    const dates = result[0]?.dates || [];
    return NextResponse.json(dates);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `Failed to fetch dates: ${error}` });
  }
}
