import { Content } from "@/types";
import { apiHandler } from "./apiHandler";

export async function fetchContent(id: number): Promise<Content> {
  return await apiHandler({
    method: "GET",
    url: `/api/content/${id}`,
  });
}

export async function updateContent(id: number, payload: any): Promise<any> {
  return await apiHandler({
    method: "PATCH",
    url: `/api/content/${id}`,
    body: payload,
  });
}

export async function contentGeneration(
  id: number,
  payload: any
): Promise<any> {
  return await apiHandler({
    method: "POST",
    url: `/api/content/${id}/gen/`,
    body: payload,
  });
}
