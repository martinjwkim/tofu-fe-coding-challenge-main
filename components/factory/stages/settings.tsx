import { useMemo } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Accordion from "../../../components/core/accordion";
import { ShapedContentData, ShapedCampaignData } from "@/types";
import { useUpdateContentGroup } from "@/hooks/api/contentGroup";

type SettingsProps = {
  content: ShapedContentData;
  campaign: ShapedCampaignData;
};

const MAX_PREVIEW_LENGTH = 60;

type SelectedItemProps = {
  id: string;
  data: { text?: string };
  index: number;
  onRemove: (id: string) => void;
};

function SelectedItem({ id, data, index, onRemove }: SelectedItemProps) {
  const text = (data?.text ?? "").trim() || "(empty)";
  const preview =
    text.length <= MAX_PREVIEW_LENGTH
      ? text
      : `${text.slice(0, MAX_PREVIEW_LENGTH)}…`;

  return (
    <li
      className="flex items-center gap-1 rounded border border-slate-200 px-3 py-1 text-sm text-slate-800"
    >
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-sm font-medium">
        {index + 1}.
      </span>
      <span className="min-w-0 flex-1 truncate" title={text}>
        {preview}
      </span>
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="rounded text-slate-500 hover:bg-slate-200 hover:text-slate-700"
        aria-label={`Remove component ${index + 1}`}
      >
        <XMarkIcon className="h-4 w-4" aria-hidden />
      </button>
    </li>
  );
}

const Settings = ({ content, campaign }: SettingsProps) => {
  const windowWidth = useMemo(() => window?.innerWidth, [window?.innerWidth]);
  const { updateContentGroup } = useUpdateContentGroup();

  const selectedComponents = useMemo(
    () => Object.entries(content.components ?? {}),
    [content.components]
  );

  const handleRemoveComponent = (idToRemove: string) => {
    const { [idToRemove]: _, ...rest } = content.components ?? {};
    updateContentGroup({
      id: content.contentGroup,
      payload: { components: rest },
    });
  };

  const accordionLabel = (number, text, stage) => {
    let preText = <span className="pl-1 pr-2">{number}.</span>;

    if (windowWidth < 1290 && stage === "instructions") {
      return (
        <div className="flex text-left">
          <span>{preText}</span>
          <div className="grid justify-items-start">
            <span>Add Instructions</span>
            <span>(optional)</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex text-left">
        <span>{preText}</span>
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div>
          <Accordion
            key="1"
            label={accordionLabel(1, "Select components", "components")}
            customizeClassName={{
              border: "border-none",
              paddingX: "px-0",
              paddingY: "py-1",
            }}
            testId="components-accordion"
            iconPosition="right"
            initOpen={true}
          >
            <div className="flex flex-col gap-y-1 mt-6">
              <p className="text-sm font-normal text-slate-700">
                On the canvas, select components that you want Tofu to
                personalize. We’ll generate multiple options for each component.
              </p>
              {selectedComponents.length > 0 && (
                <ul className="mt-3 flex flex-col gap-2" data-testid="selected-elements-list">
                  {selectedComponents.map(([id, data], index) => (
                    <SelectedItem
                      key={id}
                      id={id}
                      data={data}
                      index={index}
                      onRemove={handleRemoveComponent}
                    />
                  ))}
                </ul>
              )}
            </div>
          </Accordion>
        </div>
        <div>
          <Accordion
            key="2"
            label={accordionLabel(2, "Test it out!", null)}
            customizeClassName={{
              border: "border-none",
              paddingX: "px-0",
              paddingY: "py-1",
              paddingB: "pb-1",
            }}
            iconPosition="right"
            initOpen={false}
          >
            <div className="flex flex-col gap-y-1 mt-6 text-fontcolor-default">
              <h3 className="font-medium mb-3">
                Great job! 🎉 Now, let’s work together on your first target.
              </h3>
              <p className="text-sm font-normal pb-2">
                Once we get it right, Tofu will apply those learnings to your
                other targets.
              </p>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Settings;
