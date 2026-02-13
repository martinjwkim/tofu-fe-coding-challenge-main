import {
  Content,
  ContentGroup,
  Campaign,
  ShapedContentData,
  ShapedCampaignData,
} from "@/types";

export const tofuElementClass = "tofu-element";
export const tofuHoveredElement = "tofu-hovered-element";
export const selectDecorator = "tofu-selected-element";
export const hideTofuDecorator = "tofu-hide-element";

export const GenStatuses = {
  None: "None", // Begin state. No results generated yet.
  Progress: "Progress", // User clicked on 'Generate' button, and generation is in progress
  Done: "Done", // Generated results have been returned from BE.
};
export type GenStatus = typeof GenStatuses[keyof typeof GenStatuses];

// content group fields which are related to content settings
export const p13nContentSettingsFields = ["components", "content_group_params"];
export const repurposeContentSettingsFields = ["content_group_params"];

export const CampaignKeys = {
  campaignName: "campaignName",
  campaignId: "campaignId",
  playbookId: "playbookId",
  campaignGoal: "campaignGoal",
  campaignStage: "campaignStage",
  contentGroups: "contentGroups",
  targets: "targets",
  assets: "assets",
  allSelectedTargets: "allSelectedTargets",
  foundationModel: "foundationModel",
  customInstructions: "customInstructions",
  genStatus: "genStatus",
  enableAutoSync: "enableAutoSync",
  inboundLandingPages: "inboundLandingPages",
};

// Must match the keys in 'gen' state below.
export const Keys = {
  genStatus: "genStatus",
  contentName: "contentName",
  contentId: "contentId",
  contentType: "contentType",
  contentSourceUploadMethod: "contentSourceUploadMethod",
  contentSourceFormat: "contentSourceFormat",
  contentSource: "contentSource",
  contentSourceCopy: "contentSourceCopy",
  repurposeTemplateContentSourceCopy: "repurposeTemplateContentSourceCopy",
  subjectLineOnlyContentSourceCopy: "subjectLineOnlyContentSourceCopy",
  slateRepurposeTemplateContentSourceCopy:
    "slateRepurposeTemplateContentSourceCopy",
  exportContentSourceCopy: "exportContentSourceCopy",
  subjectLineOnlyContnetSourceCopy: "subjectLineOnlyContnetSourceCopy",
  components: "components",
  targets: "targets",
  assets: "assets",
  customInstructions: "customInstructions",
  template_settings: "template_settings",
  results: "results",
  playbook: "playbook",
  foundationModel: "foundationModel",
  contentGroup: "contentGroup",
  contentGroupName: "contentGroupName",
  campaignId: "campaignId",
  initialSetup: "initialSetup",
  template: "template",
  contentCollection: "contentCollection",
  reviewedContentList: "reviewedContentList",
  hasAnalysisRun: "hasAnalysisRun",
  hubspotEmailId: "hubspotEmailId",
};

export const initialContentState: Content = {
  id: 0,
  creator: 0,
  playbook: 0,
  campaign: 0,
  content_group: 0,
  content_name: "",
  content_params: {},
  components: {},
  updated_at: "",
  created_at: "",
  results: [],
  genStatus: GenStatuses.None,
};

export const initialCampaignState: ShapedCampaignData = {
  campaignId: 0,
  playbookId: 0,
  campaignName: "",
  campaignGoal: "",
  campaignStage: "",
  contentGroups: [],
  targets: [],
  assets: {},
  foundationModel: "",
  allSelectedTargets: [],
  customInstructions: [],
  genStatus: {},
  enableAutoSync: false,
  inboundLandingPages: {
    enabled: false,
  },
};

export const shapedContentData = (
  content: Content,
  contentGroup: ContentGroup
): ShapedContentData => {
  const { content_params } = content;
  const { content_group_params, components } = contentGroup;

  return {
    contentId: content.id,
    contentGroup: content?.content_group ?? "",
    campaignId: content?.campaign ?? "",
    contentName: content?.content_name ?? "",
    contentGroupName: contentGroup.content_group_name,
    contentType: content_group_params.content_type,
    contentSourceUploadMethod: content_group_params.content_source_upload_method,
    contentSourceFormat: content_group_params.content_source_format,
    contentSource: content_group_params.content_source ?? "",
    contentSourceCopy: content_group_params.content_source_copy ?? "",
    repurposeTemplateContentSourceCopy: content_group_params.repurpose_template_content_source_copy ?? "",
    subjectLineOnlyContentSourceCopy: content_group_params.subject_line_only_content_source_copy ?? null,
    slateRepurposeTemplateContentSourceCopy: content_group_params.slate_repurpose_template_content_source_copy ?? null,
    targets: content_params?.targets ?? {},
    customInstructions: content_group_params.custom_instructions ?? [],
    template_settings: content_group_params.template_settings ?? null,
    components: components,  
    results: content.results,
    initialSetup: content_group_params.initialSetup ?? false, 
    template: content_group_params.template ?? null,
    contentCollection: content_group_params.content_collection ?? null,
    reviewedContentList:
      content_group_params.reviewed_content_list ?? [],
    hasAnalysisRun: content_group_params.hasAnalysisRun ?? false,
  };
};

export const shapedCampaignData = (campaign: Campaign): ShapedCampaignData => {
  const campaignParams = campaign.campaign_params;
  return {
    campaignId: campaign.id,
    playbookId: campaign?.playbook,
    campaignName: campaign?.campaign_name ?? "",
    campaignGoal: campaignParams?.campaign_goal ?? "",
    contentGroups: campaign?.content_groups ?? [],
    campaignStage: campaignParams?.campaign_stage ?? "",
    targets: campaignParams?.targets ?? [],
    assets: campaignParams?.assets ?? {},
    foundationModel: campaignParams?.foundation_model ?? "",
    allSelectedTargets: campaignParams?.allSelectedTargets ?? [],
    customInstructions: campaignParams?.custom_instructions ?? [],
    genStatus: campaign.campaign_status?.gen_status ?? {},
    enableAutoSync: campaignParams?.enable_auto_sync ?? false,
    inboundLandingPages: {
      enabled: campaignParams?.inbound_landing_pages?.enabled ?? false,
      selectedTargetField: campaignParams?.inbound_landing_pages?.target_field,
    },
  };
};

export const calculateFixedButtonsPaddingRight = (panelWidth: number) => {
  const minWidth = 20;
  const maxWidth = 80;
  const minPadding = 58;
  const maxPadding = 87;

  const interpolatedPadding =
    minPadding +
    ((Math.max(minWidth, Math.min(maxWidth, panelWidth)) - minWidth) /
      (maxWidth - minWidth)) *
      (maxPadding - minPadding);

  return Math.round(interpolatedPadding);
};
