import { DetailPage } from "@/components";
import i18next from "@/config/i18next";
import { Divider } from "antd-mobile";
import "./index.less";
import { Service } from "./Service";

const Faq = () => {
  return (
    <DetailPage title={`${i18next.t("常见问题")}`}>
      <div className="p-2 rounded bg-white text-[#505050] text-[14px]">
        <p className="question-div">
          1.{`${i18next.t("项目购买后什么时候开奖？")}`}
        </p>
        <p className="mt-1 mb-2">{`${i18next.t("项目购买后，满员即可开奖")}`}</p>
        <Divider direction="horizontal" style={{ margin: "10px 0 10px" }} />
        <p className="question-div">
          2.{`${i18next.t("购买的项目中奖后奖励是多少？")}`}
        </p>
        <p className="mt-1 mb-2">
          {`${i18next.t("购买的项目以U计算，获得项目总数量的90%")}`}
        </p>
        <Divider direction="horizontal" style={{ margin: "10px 0 10px" }} />
        <p className="question-div">3.{`${i18next.t("如何提升等级？")}`}</p>
        <p className="mt-1 mb-2">
          {`${i18next.t(
            "用户等级分为4种：0级为普通用户；1级用户为‘铜牌会员’可享受推荐用户参与中奖项目总次数的3%奖励；2级用户为‘银牌会员’可享受推荐用户参与中奖项目总次数的5%奖励；3级用户为‘金牌会员’可享受推荐用户参与中奖项目总次数的7%奖励。"
          )}`}
        </p>
        <div className="mt-1 mb-2">
          <p className="contact-service">{`${i18next.t(
            "如若想提升等级，请联系客服"
          )}`}</p>
          <Service />
        </div>
        <Divider direction="horizontal" style={{ margin: "10px 0 10px" }} />
        <p className="question-div">4.{`${i18next.t("如何找回密码？")}`}</p>
        <p className="mt-1 mb-2">
          {`${i18next.t("联系客服提供最近3笔交易的记录即可")}`}
        </p>
      </div>
    </DetailPage>
  );
};

export default Faq;
