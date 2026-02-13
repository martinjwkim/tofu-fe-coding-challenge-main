import { Campaign, Content, ContentGroup } from "@/types";
import { GenStatuses } from "@/utils/factoryHelpers";

export const mockContent: Content = {
  id: 1,
  creator: 1,
  playbook: 4,
  campaign: 3,
  content_group: 2,
  content_name: "",
  content_params: {
    no_rename_alert: true,
    content_type: "Landing Page",
    content_source: "tofuhq.com",
    content_source_format: "Html",
    content_source_upload_method: "Link",
  },
  components: {},
  updated_at: "2025-04-28T17:19:58.956598-07:00",
  created_at: "2025-04-28T17:19:58.956368-07:00",
  results: [],
  genStatus: GenStatuses.None,
};

export const mockContentGroup: ContentGroup = {
  id: 2,
  creator: 1,
  campaign: 3,
  action: null,
  content_group_name: "Landing Page 1",
  content_group_params: {
    content_type: "Landing Page",
    initialSetup: true,
    content_source: "tofuhq.com",
    template_settings: {
      follow_tone: true,
      follow_length: true,
      tone_reference: null,
      follow_core_message_and_key_point: true,
    },
    content_source_copy:
      "/api/web/storage/s3-presigned-url?file=bb548858-4a32-d415-1301-2efefc2c5c08.com&fileType=text/html&directory=tofu-uploaded-files",
    selected_pdf_method: "pdf_select_text",
    content_source_format: "Html",
    export_content_source_copy: "",
    content_source_upload_method: "Link",
    subject_line_only_content_source_copy: null,
  },
  content_group_status: {
    status: "NOT_GENERATED",
    gen_status: {
      status: "NOT_STARTED",
      contents: {
        "1": {
          status: "NOT_STARTED",
        },
      },
    },
  },
  components: {},
  contents: [
    {
      id: 1,
      content_name: "",
      content_params: {},
    },
  ],
  updated_at: "2025-04-28T17:20:06.728330-07:00",
  created_at: "2025-04-28T17:19:58.495420-07:00",
};

export const mockCampaign: Campaign = {
  id: 3,
  creator: 1,
  playbook: 4,
  campaign_name: "FE coding challenge",
  campaign_params: {
    assets: {},
    targets: [
      {
        "Targets for FE coding challenge": [
          "Tofu",
          "Apple",
          "Webflow",
          "Tesla",
          "Facebook",
          "Amazon",
        ],
      },
    ],
    campaign_goal: "Personalization",
    campaign_stage: "SetContent",
    is_campaign_v3: false,
    targets_concat: true,
    allSelectedTargets: [],
  },
  campaign_status: {
    gen_status: {
      status: "NOT_STARTED",
      content_groups: {
        "2": {
          status: "NOT_STARTED",
          contents: {
            "1": {
              status: "NOT_STARTED",
            },
          },
        },
      },
    },
  },
  content_groups: [mockContentGroup],
  tags: [],
  updated_at: "2025-04-28T17:19:28.264166-07:00",
  created_at: "2025-04-28T17:19:28.263967-07:00",
};

// Store mock data
export let contents: Content[] = [mockContent];
export let contentGroups: ContentGroup[] = [mockContentGroup];
export let campaigns: Campaign[] = [mockCampaign];
