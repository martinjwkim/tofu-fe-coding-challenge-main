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
}

export interface ContentGroup {
  id: number;
  creator: number;
  campaign: number;
  action: null | string;
  content_group_name: string;
  content_group_params: {
    content_type: string;
    initialSetup: boolean;
    content_source: string;
    template_settings: TemplateSettings;
    content_source_copy: string;
    selected_pdf_method: string;
    content_source_format: string;
    export_content_source_copy: string;
    content_source_upload_method: string;
    subject_line_only_content_source_copy: null | string;
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
