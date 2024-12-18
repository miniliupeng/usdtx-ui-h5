import { request } from "@/utils";

export const coinUserWithdraw = (data) =>
  request({
    url: "/api/coinUserWithdraw.do",
    data,
  });

export const queryCoinUserWithdraw = (data) =>
  request({
    url: "/api/queryCoinUserWithdraw.do",
    data,
  });

  export const getSysInfo = (data) =>
  request({
    url: "/api/getSysInfo.do",
    data,
  });
