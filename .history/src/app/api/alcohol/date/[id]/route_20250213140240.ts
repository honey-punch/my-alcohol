import { query } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const queryText = `
    DELETE FROM alcohol_date WHERE id = ${id}
  `;

    const result = await query(queryText);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: `Failed to delete users: ${error}` });
  }
}
