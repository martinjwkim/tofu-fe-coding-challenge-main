import { apiHandler } from "./apiHandler";
import { Campaign } from "@/types";

export async function fetchCampaign(id: number): Promise<Campaign> {
  return await apiHandler({
    method: "GET",
    url: `/api/campaign/${id}`,
  });
}

export async function updateCampaign(id: number, payload: any): Promise<Campaign> {
  return await apiHandler({
    method: "PATCH",
    url: `/api/campaign/${id}`,
    body: payload,
  });
}
