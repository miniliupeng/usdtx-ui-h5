import { EmptyPanel, Record, ScrollList } from "@/components";
import { queryCoinUserueryCoinUserDetail } from "@/hooks/reuqest";
import { useMore } from "@/hooks/useMore";
import i18next from '@/config/i18next'

export const Details = ({ flag }) => {
  const { loadMore, hasMore, data } = useMore(async (page, rows) =>
      queryCoinUserueryCoinUserDetail(page, rows, flag)
  );
  const flagMap = {
    1: i18next.t("购买"),
    2: i18next.t("支出"),
    5: i18next.t("收入")
  }
  return (
      <>
        {data.map((item, index) => (
            <Record
                key={item.withdrawId}
                type={flagMap[item.type]}
                title={item.changeDesc}
                time={item.createDateTime}
                count={item.cnt}
                flag={item.flag}
            />
        ))}
        {!hasMore && data.length === 0 ? (
            <EmptyPanel />
        ) : (
            <ScrollList hasMore={hasMore} loadMore={loadMore} />
        )}
      </>
  );
};
