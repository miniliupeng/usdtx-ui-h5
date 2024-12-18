// import { Record, ScrollList } from "@/components";
// import { useMore } from "@/hooks/useMore";
import { useQueryCoinUserProject } from "@/hooks/reuqest";
import { StandCard } from "@/pages/product-list/StandCard";
import { DotLoading } from "antd-mobile";
import { EmptyPanel } from "@/components";

export const Stand = ({ type }) => {
  // const { loadMore, hasMore, data } = useMore(async (page, rows) =>
  //   queryCoinUserProject(page, rows)
  // );
  const { isLoading, data = [] } = useQueryCoinUserProject({ status: '0' });
  if (isLoading) return <DotLoading />;
  if (!isLoading && data?.length === 0) return <EmptyPanel />;
  return (
    <>
      <div className="flex flex-col gap-1">
        {data.map((item) => {
          // if (item.status === '0') {

          // } else {

          // }
          return <StandCard key={item.projectId} data={item} status="0" />;
        })}
        {/* {MockData2.map((item) => (
            <StandCard key={item.projectId} data={item} />
          ))}
          {MockData1.map((item) => (
            <LatestCard key={item.projectId} data={item} />
          ))} */}
      </div>
      {/* {!hasMore && data.length === 0 ? (
        "暂无记录"
      ) : (
        <ScrollList hasMore={hasMore} loadMore={loadMore} />
      )} */}
    </>
  );
};
