import { NextRequest, NextResponse } from "next/server";
import { contents } from "@/data/mockData";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const content = contents.find((c) => c.id === id) || contents[0];

  console.log(`Serving mock content with ID: ${id}`);
  return NextResponse.json(content);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const updates = await req.json();

    const contentIndex = contents.findIndex((c) => c.id === id);
    if (contentIndex === -1) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    // Handle component updates - full replacement (not merge) so removals are respected
    if (updates.components !== undefined) {
      contents[contentIndex].components = { ...updates.components };
    }

    // Handle content_params updates
    if (updates.content_params) {
      contents[contentIndex].content_params = {
        ...contents[contentIndex].content_params,
        ...updates.content_params,
      };
    }

    // Handle other updates
    if (!updates.components && !updates.content_params) {
      Object.assign(contents[contentIndex], updates);
    }

    // Update timestamp
    contents[contentIndex].updated_at = new Date().toISOString();

    console.log(`Updated mock content with ID: ${id}`);
    return NextResponse.json(contents[contentIndex]);
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
