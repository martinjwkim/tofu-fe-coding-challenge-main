import { useMemo, useState } from "react";
import { ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Accordion from "../../../components/core/accordion";
import { ShapedContentData, ShapedCampaignData } from "@/types";
import { useUpdateContentGroup } from "@/hooks/api/contentGroup";

type SettingsProps = {
  content: ShapedContentData;
  campaign: ShapedCampaignData;
};

/** Flatten campaign.targets (e.g. [{ "Group": ["A", "B"] }]) to { groupName, value }[]. */
export function flattenTargets(
  targets: Array<Record<string, string[]>> | undefined
): { groupName: string; value: string }[] {
  if (!targets?.length) return [];
  const out: { groupName: string; value: string }[] = [];
  for (const record of targets) {
    for (const [groupName, values] of Object.entries(record)) {
      if (Array.isArray(values)) {
        values.forEach((value) => out.push({ groupName, value }));
      }
    }
  }
  return out;
}

export type SelectedTarget = { groupName: string; value: string } | null;

type TargetDropdownProps = {
  targets: Array<Record<string, string[]>>;
  value: SelectedTarget;
  onChange: (target: SelectedTarget) => void;
};

function TargetDropdown({ targets, value, onChange }: TargetDropdownProps) {
  const options = useMemo(() => flattenTargets(targets), [targets]);
  const displayLabel = value ? value.value : "Select a target…";

  if (options.length === 0) return null;

  return (
    <Listbox value={value} onChange={onChange}>
      <ListboxButton className="relative w-full cursor-default rounded-md border border-slate-300 bg-white py-2 pl-3 pr-10 text-left text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
        <span className="block truncate">{displayLabel}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon className="h-5 w-5 text-slate-400" aria-hidden />
        </span>
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className="mt-1 min-w-[12rem] max-h-60 overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {options.map((opt) => (
          <ListboxOption
            key={`${opt.groupName}-${opt.value}`}
            value={opt}
            className={({ selected }) =>
              [
                "w-full cursor-pointer select-none py-2 pl-3 pr-9 text-slate-900",
                selected ? "bg-primary-light" : "hover:bg-slate-100",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            {opt.value}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

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
      className="flex items-center gap-1 rounded border border-slate-200 px-3 py-2 text-sm text-slate-800"
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
        <XMarkIcon className="h-5 w-5" aria-hidden />
      </button>
    </li>
  );
}

const Settings = ({ content, campaign }: SettingsProps) => {
  const windowWidth = useMemo(() => window?.innerWidth, [window?.innerWidth]);
  const { updateContentGroup } = useUpdateContentGroup();
  const [selectedTarget, setSelectedTarget] = useState<SelectedTarget>(null);

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
              <div className="mt-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Select target
                </label>
                <TargetDropdown
                  targets={campaign.targets}
                  value={selectedTarget}
                  onChange={setSelectedTarget}
                />
              </div>
            </div>
          </Accordion>
        </div>
      </div>

    </div>
  );
};

export default Settings;
