import { DetailPage, SwiperTabs } from "@/components";
import { getUrlParams } from "@/utils/url";
import { ReactComponent as StandIcon } from "@/assets/svg/stand-icon.svg";
import { ReactComponent as LatestIcon } from "@/assets/svg/latest-icon.svg";

import { StandCard } from "./StandCard";
import { LatestCard } from "./LatestCard";
import { useQueryCoinProject } from "@/hooks/reuqest";
import "./index.less";
import { DotLoading } from "antd-mobile";
import i18next from '@/config/i18next'

const TabTitle = ({ Icon, label }) => (
  <div className="flex flex-col items-center">
    {Icon}
    <span className="text-[12px] mt-[4px]">{label}</span>
  </div>
);

const ProductList = () => {
  const { activeIndex = 0 } = getUrlParams();
  const { isLoading: standIsLoading, data: standData = [] } =
    useQueryCoinProject({ status: "1" });
  const { isLoading: latestIsLoading, data: latestData = [] } =
    useQueryCoinProject({ status: "2" });
  const items = [
    {
      key: "stand",
      title: (
        <TabTitle Icon={<StandIcon width={23} height={23} />} label={`${i18next.t("进行中")}`} />
      ),
      content: (
        <div className="flex flex-col gap-1">
          {standIsLoading && <DotLoading />}
          {!standIsLoading &&
            standData.map((item) => (
              <StandCard key={item.projectId} data={item} />
            ))}
        </div>
      ),
    },
    {
      key: "latest",
      title: (
        <TabTitle Icon={<LatestIcon width={23} height={23} />} label={`${i18next.t("已揭晓")}`} />
      ),
      content: (
        <div className="flex flex-col gap-1">
          {latestIsLoading && <DotLoading />}
          {!latestIsLoading &&
            latestData.map((item) => (
              <LatestCard key={item.projectId} data={item} />
            ))}
        </div>
      ),
    },
  ];
  return (
    <DetailPage
      backPath="/home"
      title={`${i18next.t("项目列表")}`}
      bodyStyle={{ padding: "2px 0 0" }}
    >
      <SwiperTabs
        className="project-list"
        defaultIndex={activeIndex}
        items={items}
        tabStyle={{
          "--active-line-height": 0,
          "--active-title-color": "#000000",
          "--adm-color-border": "transparent",
        }}
        bodyStyle={{
          padding: "0.25rem",
          height: "calc(100vh - 111px)",
          overflowY: "auto",
        }}
      />
    </DetailPage>
  );
};

export default ProductList;
