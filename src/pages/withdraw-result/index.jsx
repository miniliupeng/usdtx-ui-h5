import { DetailPage } from "@/components";
import { Button, Result, Space } from "antd-mobile";
import { ReactComponent as SuccessIcon } from "@/assets/svg/success.svg";
import { useNavigate } from "react-router-dom";
import { useQueryCoinUserWithdraw } from "@/hooks/reuqest";
import { useTranslation } from "react-i18next";
import i18next from '@/config/i18next'

const WithdrawResult = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const back = () => {
    navigate("/user");
  };
  const {data} = useQueryCoinUserWithdraw(1)
  const item = data?.items[0] || {}
  return (
    <DetailPage
      title="提现成功"
      backArrow={null}
      extra={<span onClick={back}>{`${i18next.t("完成")}`}</span>}
    >
      <Result
        icon={
          <SuccessIcon width={68} height={68} style={{ marginLeft: "-10px" }} />
        }
        description={
          <p className="text-[#505050] text-[14px]">{`${i18next.t("提现成功，请耐心等待")}`}！</p>
        }
        className="result mb-1 rounded-lg"
      />
      <div className="bg-white rounded p-2 px-4">
        <div className="flex mb-[8px]">
          <span className="w-[80px] text-[14px] text-[#808080]">{`${i18next.t("当前状态")}`}</span>
          <span className="text-[14px] text-[#383838]">{`${i18next.t("提现成功")}`}</span>
        </div>
        <div className="flex mb-[8px]">
          <span className="w-[80px] text-[14px] text-[#808080]">{`${i18next.t("提现时间")}`}</span>
          <span className="text-[14px] text-[#383838]">
            {item.createDateTime}
          </span>
        </div>
        <div className="flex ">
          <span className="w-[80px] text-[14px] text-[#808080]">{`${i18next.t("账单号")}`}</span>
          <span className="text-[14px] text-[#383838]">
            {item.withdrawId}
          </span>
        </div>
      </div>
    </DetailPage>
  );
};

export default WithdrawResult;
