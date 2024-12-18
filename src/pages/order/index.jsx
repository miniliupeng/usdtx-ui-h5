import { DetailPage, SwiperTabs } from "@/components";
import { getUrlParams } from "@/utils/url";
import { All } from "./All";
import { Stand } from "./Stand";
import { Latest } from "./Latest";
import i18next from '@/config/i18next'
import { Not } from "./Not";

const Order = () => {
  const { activeIndex = 0 } = getUrlParams();

  const items = [
    {
      key: "stand",
      title: `${i18next.t("进行中")}`,
      content: <Stand />,
    },
    {
      key: "latest",
      title: `${i18next.t("已中奖")}`,
      content: <Latest />,
    },
    {
      key: "not",
      title: `${i18next.t("未中奖")}`,
      content: <Not />,
    },
  ];
  return (
    <DetailPage
      backArrow={null}
      title={`${i18next.t("购买记录")}`}
      bodyStyle={{ padding: "2px 0 0" }}
    >
      <SwiperTabs
        className="project-list"
        items={items}
        defaultIndex={activeIndex}
        tabStyle={{
          "--adm-color-border": "transparent",
          "--active-title-color": "#000000",
          "--active-line-color": "#000000",
          "--title-font-size": "14px",
        }}
        bodyStyle={{
          padding: "0.25rem",
          height: "calc(100vh - 111px - 30px)",
          overflowY: "auto",
        }}
      />
    </DetailPage>
  );
};
export default Order;
