import { request } from "@/utils";

export const queryMsgLog = (data) =>
  request({
    url: "/api/queryMsgLog.do",
    data,
  });

export const msgLogInfo = (data) =>
  request({
    url: "/api/msgLogInfo.do",
    data,
  });
