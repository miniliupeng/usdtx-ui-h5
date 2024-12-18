import { DetailPage, EmptyPanel } from "@/components";
import { ReactComponent as ArrowIcon } from "@/assets/svg/arrow-1.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryCoinProjectAllInfo } from "@/hooks/reuqest";
import { DotLoading, Image } from "antd-mobile";
import userPng from "@/assets/images/user.png";
import { formatCoinAddress } from "@/utils";
import i18next from "@/config/i18next";
import "./index.less";
import { getUrlParams } from "@/utils/url";

export const RecordCard = ({ joinList, JumpToJoinRecordDetail }) => {
  return (
    <div className="record-list rounded bg-white py-1">
      {joinList.map((item, index) => (
        <div
          key={index}
          className={`flex items-center p-1 px-2 border-b-[1px] ${
            item.status === "1" ? "bg-[#ffc30075]" : "text-[#505050]"
          } `}
          onClick={() =>
            JumpToJoinRecordDetail(item.projectId, item.coinAddress)
          }
        >
          <Image className="shrink-0 aspect-square" src={userPng} height={63} alt="" />
          <div className="flex flex-col  text-[12px] ml-1">
            <p className="mb-[4px]">{formatCoinAddress(item.coinAddress)}</p>
            <p>{item.buyTime}</p>
            <p className="mt-auto">
              {`${i18next.t("参与人次")}`} {item.coinCnt}
            </p>
          </div>
          <ArrowIcon width={33} height={33} className="ml-auto" />
        </div>
      ))}
    </div>
  );
};

const ProductLatest = () => {
  const { id } = useParams();
  const { status, from } = getUrlParams();
  let backPath
  if (from) {
    console.log(status);
    backPath = `/order?activeIndex=${status}`;
  }
  const navigate = useNavigate();
  const JumpToJoinRecordDetail = async (id, coinAddress) => {
    // 跳转到已揭晓项目
    navigate(`/join-record/${id}?type=${1}&coinAddress=${coinAddress}`);
  };
  const { isLoading, data: allData = {} } = useQueryCoinProjectAllInfo(id);
  const { data, joinList = [] } = allData;
  return (
    <DetailPage backPath={backPath} title={`${i18next.t("已揭晓")}`} bodyStyle={{ padding: 0 }}>
      {isLoading ? (
        <DotLoading />
      ) : (
        <>
          <Image src={data.projectImg} height={'auto'} className="aspect-square"  />
          <div className="p-1">
            <h1>
              {data.projectName}
              {/* (第10005期)
              <span className="ml-1 text-[14px]">2022路虎C700L运动版</span> */}
            </h1>
            <p className="py-1">
              <span className="text-[#505050]">
                {`${i18next.t("参与人次")}`}：
              </span>
              <span className="text-[#ff8d1a]">{data.joinCnt}</span>
            </p>
            <div className="bg-[#ffc30075] rounded text-center p-1">
              <h1 className="text-[#d43030] text-[18px] mb-1">
                {`${i18next.t("奖金")}`}：{data.rate}U
              </h1>
              <p className="text-[14px] mb-1">
                {`${i18next.t("中奖码")}`}：{data.luckNum}
              </p>
              <p className="text-[#505050] text-[14px] mb-1">
                {`${i18next.t("账户")}`}: {formatCoinAddress(data.luckCoin)}
              </p>
              <p className="text-[#a6a6a6] text-[11px]">
                {`${i18next.t("时间")}`}：{data.createDateTime}~
                {data.openDateTime}
              </p>
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
        </>
      )}
    </DetailPage>
  );
};

export default ProductLatest;
