import { DetailPage, EmptyPanel, Record, ScrollList } from "@/components";
import { queryCoinUserWithdraw } from "@/hooks/reuqest";
import { useMore } from "@/hooks/useMore";
import i18next from "@/config/i18next";
import "./index.less";

const WithdrawRecord = () => {
  const { loadMore, hasMore, data } = useMore(queryCoinUserWithdraw);
  return (
    <DetailPage title={`${i18next.t("提现记录")}`}>
      {!hasMore && data.length === 0 ? (
        <EmptyPanel />
      ) : (
        <div className="list">
          {data.map((item, index) => (
            <Record
              key={item.withdrawId}
              type={`${i18next.t("支出")}`}
              title={item.withdrawDesc}
              time={item.createDateTime}
              count={item.cnt}
            />
          ))}
          <ScrollList hasMore={hasMore} loadMore={loadMore} />
        </div>
      )}
    </DetailPage>
  );
};

export default WithdrawRecord;
