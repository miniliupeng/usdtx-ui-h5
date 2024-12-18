import { useQueryCoinUserProject } from "@/hooks/reuqest";
import { LatestCard } from "@/pages/product-list/LatestCard";
import { DotLoading } from "antd-mobile";
import { EmptyPanel } from "@/components";

export const Latest = ({ type }) => {
  const { isLoading, data = [] } = useQueryCoinUserProject({ status: "1" });
  if (isLoading) return <DotLoading />;
  if (!isLoading && data?.length === 0)
    return <EmptyPanel />;
  return (
    <>
      <div className="flex flex-col gap-1">
        {data.map((item) => {
          return <LatestCard key={item.projectId} data={item} />;
        })}
      </div>
    </>
  );
};
