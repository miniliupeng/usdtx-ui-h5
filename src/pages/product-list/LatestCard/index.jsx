import { Image, Space } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import i18next from "@/config/i18next";

export const LatestCard = ({ data }) => {
  const navigate = useNavigate();
  const JumpToProjectLatest = (id) => {
    // 跳转到已揭晓项目
    navigate(`/product-latest/${id}`);
  };
  return (
    <div
      className="flex p-2 bg-white gap-[15px] rounded-lg"
      onClick={() => JumpToProjectLatest(data.projectId)}
    >
      <Image
        className="shrink-0 aspect-square"
        height={77}
        src={data.projectImg}
        fit="contain"
        alt=""
      />
      <div className="min-w-0 flex flex-col justify-between">
        <h1 className=" text-[14px] truncate">{data.projectName}</h1>
        <Space className="text-[12px]">
          <span className="text-[#a6a6a6]">{`${i18next.t("中奖号码")}`}：</span>
          <span className="text-[#ff8d1a]">{data.luckNum}</span>
        </Space>
        <Space className="text-[12px]">
          <span className="text-[#a6a6a6]">{`${i18next.t("揭晓时间")}`}：</span>
          <span className="text-[#ff8d1a]">{data.openDateTime}</span>
        </Space>
      </div>
    </div>
  );
};
