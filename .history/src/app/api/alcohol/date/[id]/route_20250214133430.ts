import { query } from "@/app/api/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const queryText = `
    DELETE FROM alcohol_date WHERE id = ${id}
  `;

    const result = await query(queryText);

    const data = result[0]?.result || [];

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: `Failed to delete date: ${error}` });
  }
}
