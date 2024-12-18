import { Divider, DotLoading, InfiniteScroll } from "antd-mobile";
import i18next from '@/config/i18next'

const InfiniteScrollContent = ({ hasMore }) => {
  return (
    <>
      {hasMore ? (
        <>
          <span>Loading</span>
          <DotLoading />
        </>
      ) : (
        <Divider style={{ borderColor: "#999999", width: "100%", margin: 0 }}>
          {`${i18next.t("我是有底线的")}`}
        </Divider>
      )}
    </>
  );
};

export const ScrollList = ({ loadMore, hasMore }) => {
  return (
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
      <InfiniteScrollContent hasMore={hasMore} />
    </InfiniteScroll>
  );
};
