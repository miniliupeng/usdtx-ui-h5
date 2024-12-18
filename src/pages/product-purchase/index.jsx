import { DetailPage, EmptyPanel, Swiper } from "@/components";
import { JoinList } from "../home/Stand";
import {
  Button,
  Divider,
  DotLoading,
  Input,
  ProgressBar,
  Space,
  Swiper as AntSwiper,
  Toast,
} from "antd-mobile";
import { ReactComponent as SafeIcon } from "@/assets/svg/safe.svg";
import { useState } from "react";
import { formatCoinAddress } from "@/utils";
import { useNavigate, useParams } from "react-router-dom";
import { addCoinUserProject, useQueryCoinProjectAllInfo, useQueryUser } from "@/hooks/reuqest";
import i18next from "@/config/i18next";
import { RecordCard } from "../product-latest";

const ProductPurchase = () => {
  const { id } = useParams();
  const { isLoading, data: allData = {}, mutate } = useQueryCoinProjectAllInfo(id);
  const { data = {}, joinList = [], joinSucc = [] } = allData;
  const navigate = useNavigate();
  const [coinCnt, setCoinCnt] = useState(1);
  const { data: userInfo = {} } = useQueryUser();
  const onBuy = async () => {
    try {
      if (coinCnt < 1) {
        Toast.show('请输入购买数量')
        return;
      }
      await addCoinUserProject({
        buyType: "0",
        coinCnt: coinCnt,
        projectId: id,
      });
      mutate()
      navigate(
        `/purchase-result?projectName=${data.projectName}&projectId=${data.projectId}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const JumpToJoinRecordDetail = (id, coinAddress) => {
    navigate(`/join-record/${id}?type=0&coinAddress=${coinAddress}`);
  };
  if (data.status === "2") {
    navigate(`/product-latest/${data.projectId}`);
  }
  return (
    <DetailPage
      title={data.projectName}
      bodyStyle={{ padding: 0, paddingBottom: 85 }}
    >
      {isLoading ? (
        <DotLoading />
      ) : (
        <>
          <Swiper items={[data.projectImg]} height={'auto'} className="aspect-square"/>
          <div className="p-1">
            <AntSwiper
              direction="vertical"
              style={{ "--height": "18px" }}
              autoplay
              indicator={() => <></>}
            >
              {[...joinSucc, ...joinList].map((item, index) => (
                <AntSwiper.Item key={index}>
                  <h1 className="text-[#ff8d1a] text-[12px]">
                    {formatCoinAddress(item.coinAddress)}
                    {i18next.t("抢购了")}
                    {item.coinCnt}
                    {i18next.t("人次")}
                  </h1>
                </AntSwiper.Item>
              ))}
            </AntSwiper>

            <div className="p-1">
              <ProgressBar
                percent={(data.joinCnt / (data.joinCnt + data.readyCnt)) * 100}
                style={{
                  margin: "8px 0 16px",
                  "--track-width": "2px",
                  "--fill-color": "#ff8d1a",
                }}
              />
              <JoinList
                style={{ fontSize: 12 }}
                readyCnt={data.readyCnt}
                needCnt={data.needCnt}
                joinCnt={data.joinCnt}
              />
            </div>
            <div className="bg-white rounded mt-1">
              <h1 className="text-[15px] py-1 px-2">
                <span /* className="text-[#ff8d1a]" */>{data.projectDesc}</span>
                {/* <span className="ml-1">2023法拉利C500L运动版</span> */}
              </h1>
              <Divider direction="horizontal" style={{ margin: "0 0 8px" }} />
              <div className="flex justify-between py-1 px-2 text-[#a6a6a6]">
                <div>
                  <SafeIcon
                    width={13}
                    height={13}
                    style={{ marginRight: 4, marginTop: "-3" }}
                  />
                  {i18next.t("100%公平公正")}
                </div>
                <div>
                  <SafeIcon
                    width={13}
                    height={13}
                    style={{ marginRight: 4, marginTop: "-3" }}
                  />
                  {i18next.t("100%正品保证")}
                </div>
                <div>
                  <SafeIcon
                    width={13}
                    height={13}
                    style={{ marginRight: 4, marginTop: "-3" }}
                  />
                  {i18next.t("100%正品保障")}
                </div>
              </div>
            </div>
            <h1 className="text-[#505050] text-[14px] mt-2 mb-1 text-center">
              {`${i18next.t("参与记录")}`}
            </h1>
            {joinList.length > 0 ? (
              <RecordCard
                joinList={joinList}
                JumpToJoinRecordDetail={JumpToJoinRecordDetail}
              />
            ) : (
              <EmptyPanel />
            )}
          </div>
          <div className="bg-white py-1 px-1 fixed bottom-0 w-[100%]">
            <div className="pb-[8px] flex items-center gap-1">
              {i18next.t("快捷")}:
              <Button
                style={{
                  "--background-color": "#ffc300",
                  "--border-color": "#ffc300",
                  width: 40,
                  padding: 0,
                }}
                size="small"
                color="primary"
                onClick={() => setCoinCnt(Math.round(data.readyCnt / 2))}
              >
                1/2
              </Button>
              <Button
                style={{
                  "--background-color": "#ffc300",
                  "--border-color": "#ffc300",
                  width: 40,
                  padding: 0,
                }}
                size="small"
                color="primary"
                onClick={() => setCoinCnt(Math.round(data.readyCnt / 3))}
              >
                1/3
              </Button>
              <Button
                style={{
                  "--background-color": "#ffc300",
                  "--border-color": "#ffc300",
                  width: 40,
                  padding: 0,
                }}
                size="small"
                color="primary"
                onClick={() => setCoinCnt(Math.round(data.readyCnt / 4))}
              >
                1/4
              </Button>
              <Button
                style={{
                  "--background-color": "#ffc300",
                  "--border-color": "#ffc300",
                  width: 50,
                  padding: 0,
                }}
                size="small"
                color="primary"
                onClick={() => setCoinCnt(data.readyCnt)}
              >
                {i18next.t("全部")}
              </Button>
              <span className="ml-auto">余额: {userInfo.coinCnt}U</span>
            </div>
            <Space block justify="between" align="center" className="text-[14px]">
              <Space align="center">
                {i18next.t("购买")}
                <Input
                  type="number"
                  style={{
                    "--font-size": "16px",
                    "--text-align": "right",
                  }}
                  className="border rounded-sm w-[120px!important] h-[32px!important]  px-1"
                  value={coinCnt}
                  onChange={(value) => {
                    setCoinCnt(value);
                  }}
                />
                {i18next.t("份")}
              </Space>
              <Button
                style={{
                  "--background-color": "#ffc300",
                  "--border-color": "#ffc300",
                  width: 120,
                  height: 36,
                }}
                size="small"
                color="primary"
                onClick={() => onBuy()}
              >
                {i18next.t("支付")}
              </Button>
            </Space>
          </div>
        </>
      )}
    </DetailPage>
  );
};
export default ProductPurchase;
