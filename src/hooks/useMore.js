import { useCallback, useState } from "react";
const limit = 10;
export const useMore = (service) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const loadMore = useCallback(async () => {
    const append = await service(pageIndex, limit);
    if (!append) return
    setData((data) => data.concat(append.resultMap?.rows || append.rows));
    if (
      (append.resultMap && pageIndex * limit < append.resultMap.total) ||
      pageIndex * limit < append.total
    ) {
      setHasMore(true);
      setPageIndex(pageIndex + 1);
    } else {
      setHasMore(false);
    }
  }, [service, pageIndex]);

  return {
    pageIndex,
    hasMore,
    loadMore,
    data,
  };
};
