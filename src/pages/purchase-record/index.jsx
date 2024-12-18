import { useState } from "react";
import { useQueryCoinUserDetail } from "@/hooks/reuqest";
import { InfiniteScroll, List, NavBar, Space } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from '@/config/i18next'

const flagMap = {
  0: "-",
  1: "+",
};

const PurchaseRecord = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  const [pageIndex, setPageIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  function loadMore() {
    if (pageIndex * 10 < data.total) {
      setHasMore(true);
      setPageIndex(pageIndex + 1);
    } else {
      setHasMore(false);
    }
  }
  const { data } = useQueryCoinUserDetail(pageIndex);
  if (!data) return null;
  return (
    <>
      <NavBar className="bg-[#fff]" onBack={back}>
        {i18next.t("购买记录")}
      </NavBar>
      <div className="p-1">
        <div className=" bg-white rounded overflow-hidden p-1">
          <List className=" bg-white rounded overflow-hidden">
            {data.rows.map((item) => (
              <List.Item key={item.detailId}>
                <Space block justify="between" align="center">
                  <Space direction="vertical">
                    <span>{item.changeDesc.split(" ")[0]}</span>
                    <span className="text-[--adm-color-weak]">
                      {item.createDateTime}
                    </span>
                  </Space>
                  <p className="text-[--adm-color-danger]">
                    {flagMap[item.flag]}
                    {item.cnt}
                  </p>
                </Space>
              </List.Item>
            ))}
          </List>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </div>
      </div>
    </>
  );
};

export default PurchaseRecord;
