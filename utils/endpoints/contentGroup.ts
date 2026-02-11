import { apiHandler } from "./apiHandler";

export async function fetchContentGroup(id: number): Promise<any> {
  return await apiHandler({
    method: "GET",
    url: `/api/content_group/${id}`,
  });
}

export async function updateContentGroup(
  id: number,
  payload: any
): Promise<any> {
  return await apiHandler({
    method: "PATCH",
    url: `/api/content_group/${id}`,
    body: payload,
  });
}
