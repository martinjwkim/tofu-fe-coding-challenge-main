import Settings from "components/factory/stages/settings";
import { ShapedContentData, ShapedCampaignData } from "@/types";

type PersonalizationFactoryControlSettingsProps = {
  currentPaneWidth: number;
  fixedButtonsPaddingRight: number;
  content: ShapedContentData;
  campaign: ShapedCampaignData;
};

export const PersonalizationFactoryControlSettings = ({
  currentPaneWidth,
  fixedButtonsPaddingRight,
  content,
  campaign,
}: PersonalizationFactoryControlSettingsProps) => {
  return (
    <>
      <div className="w-full h-full flex flex-col items-start">
        <div className="w-full grow flex flex-col p-6 gap-y-6 pb-40 text-neutral-700 bg-white">
          <div className="h-full">
            <Settings content={content} campaign={campaign} />
            <div
              style={{
                width: `${currentPaneWidth}%`,
                paddingRight: `${fixedButtonsPaddingRight}px`,
              }}
              className="fixed bottom-0 z-10"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
