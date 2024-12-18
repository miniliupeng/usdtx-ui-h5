import { DetailPage, SwiperTabs } from "@/components";
import { Details } from "./Details";
import { useTranslation } from "react-i18next";
import i18next from '@/config/i18next'

const AccountDetails = () => {
  const { t } = useTranslation();
  const items = [
    {
      key: "all",
      title: <span>{`${i18next.t("全部")}`}</span>,
      content: <Details />,
    },
    {
      key: "withdraw",
      title: i18next.t("支出"),
      content: <Details flag={'1'} />,
    },
    {
      key: "recharge",
      title: i18next.t("收入"),
      content: <Details flag={'0'} />,
    },
  ];
  return (
      <DetailPage backPath={'/user'} title={`${i18next.t("账户明细")}`}>
        <SwiperTabs
            className="project-list"
            items={items}
            tabStyle={{
              "--adm-color-border": "transparent",
              "--active-title-color": "#000000",
              "--active-line-color": "#000000",
              "--title-font-size": "14px",
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

export default AccountDetails;
