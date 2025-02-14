import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: `Failed to delete users: ${error}` });
  }
}
