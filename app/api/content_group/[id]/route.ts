import { NextRequest, NextResponse } from "next/server";
import { contentGroups } from "@/data/mockData";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const contentGroup =
    contentGroups.find((cg) => cg.id === id) || contentGroups[0];

  console.log(`Serving mock content_group with ID: ${id}`);
  return NextResponse.json(contentGroup);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const updates = await req.json();

    const contentGroupIndex = contentGroups.findIndex((cg) => cg.id === id);
    if (contentGroupIndex === -1) {
      return NextResponse.json(
        { error: "Content group not found" },
        { status: 404 }
      );
    }

    // Handle component updates specifically – replace (don't merge) so removals take effect
    if (updates.components !== undefined) {
      contentGroups[contentGroupIndex].components = { ...updates.components };
    } else {
      // Handle other updates
      Object.assign(contentGroups[contentGroupIndex], updates);
    }

    // Always update the timestamp
    contentGroups[contentGroupIndex].updated_at = new Date().toISOString();

    console.log(`Updated mock content_group with ID: ${id}`);
    return NextResponse.json(contentGroups[contentGroupIndex]);
  } catch (error) {
    console.error("Error updating content group:", error);
    return NextResponse.json(
      { error: "Failed to update content group" },
      { status: 500 }
    );
  }
}
