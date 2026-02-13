import Web from "../contentTypes/web";
import { ShapedContentData, ShapedCampaignData } from "@/types";

type FactoryContentProps = {
  content: ShapedContentData;
  campaign: ShapedCampaignData;
};

const FactoryContent = ({ content, campaign }: FactoryContentProps) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <Web content={content} />
    </div>
  );
};

export default FactoryContent;
