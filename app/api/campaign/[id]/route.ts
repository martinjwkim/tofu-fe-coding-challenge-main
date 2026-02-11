import { NextRequest, NextResponse } from "next/server";
import { campaigns } from "@/data/mockData";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const campaign = campaigns.find((c) => c.id === id) || campaigns[0];

  console.log(`Serving mock campaign with ID: ${id}`);
  return NextResponse.json(campaign);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const updates = await req.json();

    const campaignIndex = campaigns.findIndex((c) => c.id === id);
    if (campaignIndex === -1) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    // Apply updates
    Object.assign(campaigns[campaignIndex], updates);

    // Update timestamp
    campaigns[campaignIndex].updated_at = new Date().toISOString();

    console.log(`Updated mock campaign with ID: ${id}`);
    return NextResponse.json(campaigns[campaignIndex]);
  } catch (error) {
    console.error("Error updating campaign:", error);
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
}
