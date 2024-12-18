import { noticeApi } from "@/api";
import useSWR from "swr";

export const useQueryNoticeList = () => {
  return useSWR("/api/queryNoticeList", () =>
    noticeApi.queryMsgLog({
      msgType: "XWXX",
      status: "ZT01",
    })
  );
};

export const useQueryNoticeBanner = () => {
  return useSWR("/api/queryNoticeBanner", () =>
    noticeApi.queryMsgLog({
      msgType: "BANNER",
      status: "ZT01",
    })
  );
};

export const useQueryNoticeInfo = (detailId) => {
  return useSWR("/api/msgLogInfo", () =>
    noticeApi.msgLogInfo({
      detailId,
    })
  );
};
