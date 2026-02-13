"use client";

import { useFetchContent } from "hooks/api/content";
import { useFetchContentGroup } from "hooks/api/contentGroup";
import { useFetchCampaign } from "hooks/api/campaign";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import {
  initialContentState,
  shapedContentData,
  shapedCampaignData,
} from "utils/factoryHelpers";

import Spinner from "components/core/spinner";

import FactoryBodySettingsWrapper from "components/factory/wrappers/factoryBodySettings/personalizationFactoryBodySettings";

export default function Content() {
  const searchParams = useSearchParams();
  const contentId = 1;

  const { data: contentData = initialContentState } = useFetchContent(contentId);
  const { data: contentGroup } = useFetchContentGroup(contentData.content_group);
  const { data: campaignData, isLoading } = useFetchCampaign(contentData.campaign);

  const content = useMemo(() => {
    if (!contentData || !contentGroup) return;
    return shapedContentData(contentData, contentGroup);
  }, [contentData, contentGroup, searchParams]);

  const campaign = useMemo(() => {
    if (!campaignData) return;
    return shapedCampaignData(campaignData);
  }, [campaignData]);

  if (!content || !campaign || isLoading) return (
    <div className="flex justify-center items-center h-[200px]">
      <Spinner />
    </div>
  );

  return (
    <div className="w-full flex flex-col">
      <FactoryBodySettingsWrapper content={content} campaign={campaign} />
    </div>
  )
}
