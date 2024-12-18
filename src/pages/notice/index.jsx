import { DotLoading } from "antd-mobile";
import { DetailPage, EmptyPanel } from "@/components";
import { useQueryNoticeList } from "@/hooks/reuqest";
import { NoticeCard } from "./NoticeCard";
import i18next from '@/config/i18next'

const Notice = () => {
  const { isLoading, data: noticeList } = useQueryNoticeList();
  return (
    <DetailPage backPath="/home" title={`${i18next.t("消息中心")}`}>
      {isLoading ? (
        <DotLoading />
      ) : (
        <>
          {!isLoading && noticeList.length === 0 && (
            <EmptyPanel />
          )}
          {noticeList.map((notice, index) => (
            <NoticeCard
              className={`${index === noticeList.length - 1 ? "mb-0" : "mb-2"}`}
              data={notice}
              key={index}
            />
          ))}
        </>
      )}
    </DetailPage>
  );
};

export default Notice;
