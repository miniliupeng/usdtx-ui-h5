import { Image } from "antd-mobile";
import purchaseIcon from "@/assets/svg/purchase.svg";
import rechargeImg from "@/assets/images/recharge.png";
import withdrawImg from "@/assets/images/withdraw.png";
import i18next from "../../config/i18next";

export const Record = ({
  type = i18next.t("收入"),
  title = "0x23***8fsdf",
  time = `2023${i18next.t("年")}10${i18next.t("月")}23${i18next.t("日")} 14:34`,
  count = 600,
  flag,
}) => {
  const typeMap = {
    [i18next.t("购买")]: {
      img: purchaseIcon,
      text: "购买项目支付-",
      color: "#000000",
      operate: "-",
    },
    [i18next.t("收入")]: {
      img: rechargeImg,
      text: "充值到-",
      color: "#000000",
      operate: "+",
    },
    [i18next.t("支出")]: {
      img: withdrawImg,
      text: "余额提现到-",
      color: "#000000",
      operate: "-",
    },
  };

  const map = typeMap[type] || {};
  return (
    <div className="flex items-center bg-white rounded-lg p-1 mb-[4px]">
      <Image
        src={map.img}
        width={38}
        height={38}
        fit="cover"
        style={{ borderRadius: 4 }}
      />
      <div className="ml-1 w-[60%]">
        <h1 className="text-[14px] text-[#505050] text-ellipsis whitespace-nowrap overflow-hidden">
          {title}
        </h1>
        <p className="text-[12px] text-[#a6a6a6]">{time}</p>
      </div>
      <p className={`ml-auto text-[12px] text-[${map.color}]`}>
        {flag === "0" ? "+" : "-"}
        {count}U
      </p>
    </div>
  );
};
