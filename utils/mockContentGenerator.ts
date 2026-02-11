/**
 * Utility for generating mock content variations
 */

import {
  generateRandomStringOfSameLength,
  createVariation,
  Content,
  ContentComponent,
} from "./contentGenerationUtils";

// Generate variations for all components
export const generateContentVariations = (
  content: Content,
  targetName: string,
  numVariations: number = 2
): Content => {
  if (!content.components) {
    return content;
  }

  const results: Array<{
    id: number;
    params: {
      targets: Record<string, string>;
      num_of_variations: number;
    };
    variations: Record<string, ContentComponent>;
    updated_at: string;
    created_at: string;
    content: string | number;
  }> = [];
  const timestamp = new Date().toISOString();
  const resultId = Math.floor(Math.random() * 1000000);

  // Set content name with target
  content.content_name = `${
    content.content_params?.content_type || "Content"
  }_${targetName}`;

  // Create variations object
  const variations: Record<string, ContentComponent> = {};

  // Process each component
  Object.keys(content.components).forEach((componentId) => {
    const component = content.components![componentId];
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

    // Create variation object for this component
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
        [targetName.split("_")[0]]: targetName.split("_")[1],
      },
      num_of_variations: numVariations,
    },
    variations,
    updated_at: timestamp,
    created_at: timestamp,
    content: content.id,
  };

  // Add result to content
  results.push(result);

  // Update content with results
  return {
    ...content,
    results,
    updated_at: timestamp,
  };
};

// Process target and generate content
export const processContentGeneration = (
  content: Content,
  payload: any
): Content => {
  // Extract target info from payload
  const targetCategory = Object.keys(payload.targets)[0];
  const targetValue = payload.targets[targetCategory];
  const targetName = `${targetCategory}_${targetValue}`;

  // Update content params with targets
  content.content_params = {
    ...content.content_params,
    targets: payload.targets,
  };

  // Generate variations
  const numVariations = payload.num_of_variations || 2;
  return generateContentVariations(content, targetName, numVariations);
};
