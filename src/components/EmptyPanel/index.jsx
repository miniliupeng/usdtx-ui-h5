import { Empty } from "antd-mobile";
import i18next from "i18next";

export const EmptyPanel = ({ description = "暂无记录" }) => {
  return <Empty description={`${i18next.t(description)}`} />;
};
