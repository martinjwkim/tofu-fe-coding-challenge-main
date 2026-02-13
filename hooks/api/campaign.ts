import { useQuery } from "@tanstack/react-query";
import { fetchCampaign } from "../../utils/endpoints/campaign";

export const useFetchCampaign = (
  campaignId: number,
  refetchOnWindowFocus = true
) => {
  return useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: () => fetchCampaign(campaignId),
    enabled: !!campaignId,
    refetchOnWindowFocus,
  });
};
