import { useNavigate } from "react-router-dom";
import { Divider, Image } from "antd-mobile";
import { ReactComponent as ArrowIcon } from "@/assets/svg/arrow-1.svg";
import i18next from '@/config/i18next'

export const NoticeCard = ({ data, className }) => {
  const navigate = useNavigate();
  const { id, msgTitle, msgTime, msgFile } = data;
  const jumpToDetail = () => {
    navigate(`/notice-detail/${id}`);
  };
  return (
    <div className={`bg-white ${className} rounded-md`} onClick={jumpToDetail}>
      {msgFile && <Image src={msgFile} alt="" height={150} />}
      <div className="p-1">
        <h1 className="text-[13px] mb-[4px]">{msgTitle}</h1>
        <p className="text-[12px] text-[#a6a6a6]">{msgTime}</p>
      </div>
      <Divider direction="horizontal" style={{ margin: "0 0 8px" }} />
      <div className="flex align-middle justify-between px-1 pb-[8px]">
        <span className="text-[#a6a6a6]">{i18next.t('查看详情')}</span>
        <ArrowIcon width={21} height={21} />
      </div>
    </div>
  );
};
