import { query } from "@/app/api/db";
import { NextRequest, NextResponse } from "next/server";
import * as React from "react";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = React.use(params);

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const queryText = `
    DELETE FROM alcohol_date WHERE id = $1
  `;

    const result = await query(queryText, [id]);

    const data = result[0]?.result || [];

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: `Failed to delete date: ${error}` });
  }
}
