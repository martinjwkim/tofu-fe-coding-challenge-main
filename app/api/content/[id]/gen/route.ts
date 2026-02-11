import { NextRequest, NextResponse } from "next/server";
import { contents } from "@/data/mockData";
import {
  generateRandomStringOfSameLength,
  createVariation,
  generateRandomHTMLElement,
  generateSurroundingElements,
  Content,
  ContentComponent,
} from "@/utils/contentGenerationUtils";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const payload = await req.json();

    const contentIndex = contents.findIndex((c) => c.id === id);
    if (contentIndex === -1) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    const content = contents[contentIndex];
    const timestamp = new Date().toISOString();

    // Extract target info
    const targets = payload.targets || {};
    const targetCategory =
      Object.keys(targets)[0] || "Targets for FE coding challenge";
    const targetValue = targets[targetCategory] || "Tofu";

    // Update content name
    content.content_name = `${
      content.content_params?.content_type || "Content"
    }_${targetCategory}_${targetValue}`;

    // Update content params with targets
    content.content_params = {
      ...content.content_params,
      targets: {
        [targetCategory]: targetValue,
      },
    };

    // Create mock components if they don't exist
    if (!content.components || Object.keys(content.components).length === 0) {
      const componentTypes = [
        { tag: "h1", text: "Ship Integrated Campaigns 8x Faster" },
        {
          tag: "p",
          text: "1:1 ABM, personalized nurture, outbound prospecting, webinars and events, upsell and cross-sell.",
        },
        { tag: "h2", text: "Trusted by Industry Leaders" },
      ];

      content.components = {};
      componentTypes.forEach(({ tag, text }, index) => {
        const componentId = Math.random().toString(36).substring(2, 15);
        const [preceding, succeeding] = generateSurroundingElements(tag);

        content.components![componentId] = {
          meta: {
            type: "text",
            html_tag: `<${tag}>`,
            time_added: Date.now() + index,
            html_tag_index: null,
            selected_element: generateRandomHTMLElement(tag, componentId, text),
            preceding_element: preceding,
            succeeding_element: succeeding,
          },
          text: text,
        };
      });
    }

    // Process components for variations
    const resultId = Math.floor(Math.random() * 1000000);
    const numVariations = payload.num_of_variations || 2;
    const variations: Record<string, ContentComponent> = {};

    // Create variations for each component
    const components = content.components;
    if (!components) {
      return NextResponse.json(
        { error: "No components found" },
        { status: 400 }
      );
    }

    Object.keys(components).forEach((componentId) => {
      const component = components[componentId];
      const originalText = component.text;

      // Generate variations
      const componentVariations: Array<{
        meta: {
          request_id: string;
          gen_runtime: number;
          runtime_seconds: number;
          postprocess_runtime: number;
        };
        text: string;
      }> = [];

      for (let i = 0; i < numVariations; i++) {
        componentVariations.push(
          createVariation(generateRandomStringOfSameLength(originalText))
        );
      }

      // Create variation object
      variations[componentId] = {
        meta: {
          ...component.meta,
          variations: componentVariations,
          current_version: {
            text: componentVariations[0].text,
            request_id: componentVariations[0].meta.request_id,
          },
          current_variation_index: 0,
        },
        text: originalText,
      };
    });

    // Create result object
    const result = {
      id: resultId,
      params: {
        targets: {
          [targetCategory]: targetValue,
        },
        num_of_variations: numVariations,
      },
      variations,
      updated_at: timestamp,
      created_at: timestamp,
      content: content.id,
    };

    // Add result to content
    if (!content.results) {
      content.results = [];
    }
    content.results.push(result);

    // Update content timestamp
    content.updated_at = timestamp;

    return NextResponse.json(content);
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
