import { useParams } from "react-router-dom";
import { DotLoading, Image } from "antd-mobile";
import { DetailPage } from "@/components";
import { useQueryNoticeInfo } from "@/hooks/reuqest";
import i18next from '@/config/i18next'

const NoticeDetail = () => {
  const { id } = useParams();
  const { isLoading, data: { msgFile, msgTitle, msgTime, msgText } = {} } =
    useQueryNoticeInfo(id);
  if (isLoading) return <DotLoading />;
  return (
    <DetailPage backPath={"/notice"} title={i18next.t("消息详情")}>
      <div className="bg-white">
        {msgFile && <Image src={msgFile} alt="" height={150} />}
        <div className="p-1">
          <h1 className="text-[16px] text-center mb-[4px]">{msgTitle}</h1>
          <span className="text-[12px] text-[#a6a6a6]">{msgTime}</span>
          <p className="mt-[8px] indent-2" dangerouslySetInnerHTML={{
            __html: msgText
          }}></p>
        </div>
      </div>
    </DetailPage>
  );
};

export default NoticeDetail;
