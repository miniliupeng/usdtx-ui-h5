import { useQueryCoinUserProject } from "@/hooks/reuqest";
import { DotLoading } from "antd-mobile";
import { StandCard } from "@/pages/product-list/StandCard";
import { EmptyPanel } from "@/components";

export const Not = ({ type }) => {
  const { isLoading, data = [] } = useQueryCoinUserProject({ status: "2" });
  if (isLoading) return <DotLoading />;
  if (!isLoading && data?.length === 0)
    return <EmptyPanel />;
  return (
    <>
      <div className="flex flex-col gap-1">
        {data.map((item) => {
          return <StandCard key={item.projectId} data={item} status={'2'} />;
        })}
      </div>
    </>
  );
};
