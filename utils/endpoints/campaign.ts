import { apiHandler } from "./apiHandler";

export async function fetchCampaign(id: number): Promise<any> {
  return await apiHandler({
    method: "GET",
    url: `/api/campaign/${id}`,
  });
}

export async function updateCampaign(id: number, payload: any): Promise<any> {
  return await apiHandler({
    method: "PATCH",
    url: `/api/campaign/${id}`,
    body: payload,
  });
}
