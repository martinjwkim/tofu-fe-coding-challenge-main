// List of marketing buzzwords to use in generated content
const buzzwords = [
  "Personalized",
  "Integrated",
  "Automated",
  "Targeted",
  "Strategic",
  "Scalable",
  "Innovative",
  "Powerful",
  "Streamlined",
  "Efficient",
  "Seamless",
  "Omnichannel",
  "ROI-driven",
  "Data-driven",
  "AI-powered",
  "Cloud-based",
  "Enterprise",
  "Solution",
  "Platform",
  "Analytics",
  "Marketing",
  "Campaigns",
  "Content",
  "Engagement",
  "Conversion",
  "Pipeline",
  "Revenue",
  "Growth",
  "Scale",
  "Transform",
];

// Generate a random string of the same length as the original
export const generateRandomStringOfSameLength = (original: string): string => {
  // Select random buzzwords
  let result = "";
  const targetLength = original.length;

  while (result.length < targetLength - 20) {
    const word = buzzwords[Math.floor(Math.random() * buzzwords.length)];
    result += (result ? " " : "") + word;
  }

  // Add the company name to make it more realistic
  result += " for Your Business";

  // Trim to approximately the same length as original
  return result.substring(0, targetLength);
};

// Create variation result object
export const createVariation = (text: string) => {
  const requestId = Math.random().toString(36).substring(2, 15);
  const runtime = Math.random() * 3 + 1; // Random runtime between 1-4 seconds

  return {
    meta: {
      request_id: requestId,
      gen_runtime: runtime,
      runtime_seconds: runtime + 0.1,
      postprocess_runtime: 0.1,
    },
    text,
  };
};

// Helper function to generate a random HTML element
export const generateRandomHTMLElement = (
  tag: string,
  id: string,
  text: string
): string => {
  const classes = [
    "tofu-element",
    "tofu-editable-element",
    "tofu-hovered-element",
  ];
  return `<${tag} class="${classes.join(
    " "
  )}" data-tofu-id="${id}">${text}</${tag}>`;
};

// Helper function to generate surrounding elements
export const generateSurroundingElements = (tag: string): [string, string] => {
  const elements: Record<string, [string, string]> = {
    h1: [
      "<a>See Product Demo</a>",
      "<p>1:1 ABM, personalized nurture, outbound prospecting, webinars and events, upsell and cross-sell.</p>",
    ],
    p: [
      "<h1>Ship Integrated Campaigns 8x Faster</h1>",
      "<a>Start Free Trial</a>",
    ],
    h2: ["<a>Book A Demo</a>", "<span>ONE PLATFORM</span>"],
  };
  return elements[tag] || ["", ""];
};

// Types
export interface ContentComponent {
  text: string;
  meta: {
    request_id?: string;
    gen_runtime?: number;
    runtime_seconds?: number;
    postprocess_runtime?: number;
    type?: string;
    html_tag?: string;
    time_added?: number;
    html_tag_index?: number | null;
    selected_element?: string;
    preceding_element?: string;
    succeeding_element?: string;
    variations?: Array<{
      meta: {
        request_id: string;
        gen_runtime: number;
        runtime_seconds: number;
        postprocess_runtime: number;
      };
      text: string;
    }>;
    current_version?: {
      text: string;
      request_id: string;
    };
    current_variation_index?: number;
  };
}

export interface Content {
  id: string | number;
  name?: string;
  content_name?: string;
  content_params?: {
    content_type?: string;
    targets?: Record<string, string>;
  };
  components: Record<string, ContentComponent> | null;
  results?: Array<{
    id: number;
    params: {
      targets: Record<string, string>;
      num_of_variations: number;
    };
    variations: Record<string, ContentComponent>;
    updated_at: string;
    created_at: string;
    content: string | number;
  }>;
  updated_at?: string;
  created_at?: string;
}
