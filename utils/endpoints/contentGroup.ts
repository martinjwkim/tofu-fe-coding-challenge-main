import { ContentGroup } from "@/types";
import { apiHandler } from "./apiHandler";

export async function fetchContentGroup(id: number): Promise<ContentGroup> {
  return await apiHandler({
    method: "GET",
    url: `/api/content_group/${id}`,
  });
}

export async function updateContentGroup(
  id: number,
  payload,
): Promise<any> {
  return await apiHandler({
    method: "PATCH",
    url: `/api/content_group/${id}`,
    body: payload,
  });
}
