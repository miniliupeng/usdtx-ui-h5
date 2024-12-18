import { useNavigate } from "react-router-dom";
import { useQueryCoinProject, useQueryNoticeList } from "@/hooks/reuqest";
import { Banner } from "./Banner";
import { DetailPage, Subfield } from "@/components";
import { ReactComponent as NewsIcon } from "@/assets/svg/news.svg";
import { Latest } from "./Latest";
import { Stand } from "./Stand";
import { NoticeBar,   Swiper as AntSwiper, } from "antd-mobile";
import { LanguageSwitch } from "./LanguageSwitch";
import i18next from "../../config/i18next";
import { useTranslation, Trans } from "react-i18next";
import "./index.less";

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const JumpToNotice = () => {
    navigate("/notice");
  };
  const { data: noticeList = [] } = useQueryNoticeList();
  // const notice = noticeList?.[0] || {};
  return (
    <DetailPage
      title={<h1 className="font-bold">{i18next.t("一U购")}</h1>}
      bodyStyle={{ padding: "2px 0 0" }}
      backArrow={null}
    >
      <LanguageSwitch />
      <Banner />
      <Subfield
        Icon={NewsIcon}
        title={`${i18next.t("新闻快报")}`}
        description={
          // <NoticeBar
          //   className="notice-bar -mt-[2px]"
          //   content={notice.msgTitle}
          //   color="alert"
          // />
          <AntSwiper
          direction="vertical"
          style={{ "--height": "18px", paddingRight: "10px"}}
          autoplay
          loop
          indicator={() => <></>}
        >
          {noticeList.map((notice, index) => (
            <AntSwiper.Item key={index}>
              <h1 className="text-[14px] text-ellipsis whitespace-nowrap overflow-hidden">
                {notice.msgTitle}
              </h1>
            </AntSwiper.Item>
          ))}
        </AntSwiper>
        }
        onClick={JumpToNotice}
      />
      <Latest />
      <Stand />
    </DetailPage>
  );
};

export default Home;
