import { withdrawApi } from "@/api";
import { MyLocalStorage } from "@/utils";
import useSWR from "swr";

export const useQueryCoinUserWithdraw = (pageNumber) => {
  const userInfo = MyLocalStorage.localstorage.getItem("userInfo");
  return useSWR("/api/queryCoinUserWithdraw", () => withdrawApi.queryCoinUserWithdraw({
    coinAddress: userInfo.coinAddress,
    page: pageNumber,
    rows: 5,
  }));
};

export const queryCoinUserWithdraw = (page, rows) => {
  const userInfo = MyLocalStorage.localstorage.getItem("userInfo");
  return withdrawApi.queryCoinUserWithdraw({
    coinAddress: userInfo.coinAddress,
    page,
    rows,
  })
}

export const useGetSysInfo = () => {
  return useSWR("/api/getSysInfo", () => withdrawApi.getSysInfo({
    chain: 0,
    key: 'toAddress',
  }));
};