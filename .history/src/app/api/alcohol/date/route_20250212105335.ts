import { NextResponse } from "next/server";
import { query } from "../../db";

export async function GET() {
  try {
    const queryText = `
    SELECT json_agg(json_build_object('id', id, 'date', date, 'soju', soju, 'beer', beer)) AS result
    FROM "alcohol_date"
  `;

    const result = await query(queryText);

    const dates = result[0]?.result || [];

    console.log(dates);

    return NextResponse.json(dates);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: `Failed to fetch alcohol_date: ${error}`,
    });
  }
}
