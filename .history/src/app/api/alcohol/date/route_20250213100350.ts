import { NextResponse } from "next/server";
import { query } from "../../db";

export async function GET() {
  try {
    const queryText = `
    SELECT json_agg(json_build_object('id', id, 'date', date, 'soju', soju, 'beer', beer)) AS result
    FROM "alcohol_date"
  `;

    const result = await query(queryText);

    const data = result[0]?.result || [];

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: `Failed to fetch alcohol_date: ${error}`,
    });
  }
}

export async function POST() {
  try {
  } catch (error) {
    return NextResponse.json({
      error: `Failed to add alcohol_date: ${error}`,
    });
  }
}
