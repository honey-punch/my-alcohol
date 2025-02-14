import { NextRequest, NextResponse } from "next/server";
import { query } from "../db";

export async function GET(req: NextRequest) {
  try {
    const queryText = `
    SELECT json_agg(json_build_object('id', id, 'date', date, 'soju', soju, 'beer', beer)) AS dates
    FROM "date"
  `;
    const queryParam = id ? [id] : [];

    const result = await query(queryText, queryParam);

    const dates = result[0]?.dates || [];
    return NextResponse.json(dates);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `Failed to fetch dates: ${error}` });
  }
}
