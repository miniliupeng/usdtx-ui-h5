import { DetailPage } from "@/components";
import { Result as AntResult, Button, Space } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SuccessIcon } from "@/assets/svg/success.svg";
import { getUrlParams } from "@/utils/url";
import i18next from "@/config/i18next";
import { useQueryUser } from "@/hooks/reuqest";
import { projectApi } from "@/api";
import { MyLocalStorage } from "@/utils";

const PurchaseResult = () => {
  const { projectId, projectName } = getUrlParams();
  const navigate = useNavigate();
  const back = () => {
    navigate("/home");
  };

  const JumpToJoinRecord = async () => {
    const userInfo = MyLocalStorage.localstorage.getItem("userInfo");
    const res = await projectApi.queryCoinProjectInfo({
      projectId,
    });
    const status = res.data.status;
    let type = "";
    if (status === "1") {
      type = "0";
      navigate(
        `/join-record/${projectId}?type=${type}&from=result`
      );
    } else if (status === "2") {
      if (res.data.luckCoin === userInfo.coinAddress) {
        type = "1";
      } else {
        type = "2";
      }
      navigate(`/product-latest/${projectId}?status=${type}&from=result`);
    }
  };
  return (
    <DetailPage
      title={`${i18next.t("支付成功")}`}
      backArrow={null}
      extra={<span onClick={back}>{`${i18next.t("完成")}`}</span>}
    >
      <AntResult
        icon={
          <SuccessIcon width={68} height={68} style={{ marginLeft: "-10px" }} />
        }
        description={
          <p className="text-[#505050] text-[14px]">
            {`${i18next.t("支付成功，请耐心等待揭晓结果")}`}！
          </p>
        }
        className="result mb-1 rounded-lg"
      />
      <h1 className="text-[16px] mt-2">{`${i18next.t("支付订单")}`}</h1>
      <div className="bg-white mt-1 p-1 rounded-xl">
        <Space
          block
          justify="between"
          align="center"
          onClick={JumpToJoinRecord}
        >
          <div>
            <span className="text-[#ff8d1a]">({projectName})</span>
            {/* <span className="ml-1">2023法拉利C500L运动版</span> */}
          </div>
          <Button
            style={{
              "--background-color": "#ffc300",
              "--border-color": "#ffc300",
            }}
            size="small"
            color="primary"
            shape="rounded"
          >
            {`${i18next.t("查看")}`}
          </Button>
        </Space>
      </div>
    </DetailPage>
  );
};

export default PurchaseResult;
