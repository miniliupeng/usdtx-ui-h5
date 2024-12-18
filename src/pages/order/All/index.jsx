import { useQueryCoinUserProject } from "@/hooks/reuqest";
import { LatestCard } from "@/pages/product-list/LatestCard";
import { StandCard } from "@/pages/product-list/StandCard";
import { DotLoading } from "antd-mobile";
import { EmptyPanel } from "@/components";

export const All = ({ type }) => {
  const { isLoading, data = [] } = useQueryCoinUserProject();
  if (isLoading) return <DotLoading />;
  if (!isLoading && data?.length === 0) return <EmptyPanel />;
  return (
    <>
      <div className="flex flex-col gap-1">
        {data.map((item) => {
          if (item.status === '0') {
            return <StandCard key={item.projectId} data={item} />;
          } else {
            return <LatestCard key={item.projectId} data={item} />;
          }
       
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
