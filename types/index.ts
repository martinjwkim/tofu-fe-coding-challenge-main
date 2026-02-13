import { CampaignKeys, GenStatus, Keys } from "@/utils/factoryHelpers";

export interface TemplateSettings {
  follow_tone: boolean;
  follow_length: boolean;
  tone_reference: null | string;
  follow_core_message_and_key_point: boolean;
}

export interface ContentParams {
  no_rename_alert?: boolean;
  content_type?: string;
  content_source?: string;
  content_source_format?: string;
  content_source_upload_method?: string;
  targets?: Record<string, string>;
}

export interface Content {
  id: number;
  creator: number;
  playbook: number;
  campaign: number;
  content_group: number;
  content_name: string;
  content_params: ContentParams;
  components: null | Record<string, any>;
  updated_at: string;
  created_at: string;
  results: any[];
  genStatus: GenStatus;
}

export interface ShapedContentData {
  contentId: number;
  contentGroup: number;
  campaignId: number;
  contentName: string;
  contentGroupName: string;
  contentType: string;
  contentSourceUploadMethod: string;
  contentSourceFormat: string;
  contentSource: string;
  contentSourceCopy: string;
  repurposeTemplateContentSourceCopy: string;
  subjectLineOnlyContentSourceCopy: string | null;
  slateRepurposeTemplateContentSourceCopy: string | null;
  targets: Record<string, string>;
  customInstructions: unknown[];
  template_settings: TemplateSettings | null;
  components: Record<string, any>;
  results: any[];
  initialSetup: boolean;
  template: string | null;
  contentCollection: string | null;
  reviewedContentList: unknown[];
  hasAnalysisRun: boolean;
}

export interface ContentGroup {
  id: number;
  creator: number;
  campaign: number;
  action: null | string;
  content_group_name: string;
  content_group_params: {
    content_type: string;
    initialSetup?: boolean;
    content_source: string;
    template_settings: TemplateSettings;
    content_source_copy: string;
    selected_pdf_method: string;
    content_source_format: string;
    export_content_source_copy: string;
    content_source_upload_method: string;
    subject_line_only_content_source_copy: null | string;
    repurpose_template_content_source_copy?: string;
    custom_instructions?: unknown[];
    template?: string | null;
    content_collection?: string | null;
    reviewed_content_list?: unknown[];
    hasAnalysisRun?: boolean;
    slate_repurpose_template_content_source_copy?: string | null;
  };
  content_group_status: {
    status: string;
    gen_status: {
      status: string;
      contents: Record<string, { status: string }>;
    };
  };
  components: Record<string, any>;
  contents: Array<{
    id: number;
    content_name: string;
    content_params: Record<string, any>;
  }>;
  updated_at: string;
  created_at: string;
}

/** Shaped campaign returned by shapedCampaignData – use when consuming campaign from useFetchCampaign or similar. */
export interface ShapedCampaignData {
  campaignId: number;
  playbookId: number;
  campaignName: string;
  campaignGoal: string;
  contentGroups: ContentGroup[];
  campaignStage: string;
  targets: Array<Record<string, string[]>>;
  assets: Record<string, any>;
  foundationModel: string;
  allSelectedTargets: any[];
  customInstructions: any[];
  genStatus: Record<string, any>;
  enableAutoSync: boolean;
  inboundLandingPages: {
    enabled: boolean;
    selectedTargetField?: any;
  };
}

export interface Campaign {
  id: number;
  creator: number;
  playbook: number;
  campaign_name: string;
  campaign_params: {
    assets: Record<string, any>;
    targets: Array<Record<string, string[]>>;
    campaign_goal: string;
    campaign_stage: string;
    is_campaign_v3: boolean;
    targets_concat: boolean;
    allSelectedTargets: any[];
    foundation_model?: string;
    custom_instructions?: any[];
    enable_auto_sync?: boolean;
    inbound_landing_pages?: {
      enabled?: boolean;
      target_field?: any;
    };
  };
  campaign_status: {
    gen_status: {
      status: string;
      content_groups: Record<
        string,
        {
          status: string;
          contents: Record<string, { status: string }>;
        }
      >;
    };
  };
  content_groups: ContentGroup[];
  tags: any[];
  updated_at: string;
  created_at: string;
}

// ... rest of the type definitions from before ...
