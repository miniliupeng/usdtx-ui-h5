
import { request } from "@/utils";

export const coinUserCntChange = (data) =>
  request({
    url: "/api/coinUserCntChange.do",
    data,
  });

export const coinUserRecharge = (data) =>
request({
  url: "/api/coinUserRecharge.do",
  data,
});