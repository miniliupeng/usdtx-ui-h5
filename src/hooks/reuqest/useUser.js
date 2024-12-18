import { userApi } from "@/api";
import { MyLocalStorage } from "@/utils";
import { checkInstallMask } from "@/utils/check";
import useSWR from "swr";

export const addCoinUser = (data) => {
  return userApi.addCoinUser(data);
};

export const useQueryUser = () => {
  // const userInfo = MyLocalStorage.localstorage.getItem("userInfo");
  // return userApi.queryCoinUser({ coinAddress: userInfo.coinAddress });
  return useSWR(`/api/queryCoinUser`, () =>
    checkInstallMask()
      .then((coinAddress) => {
        return userApi.queryCoinUser({ coinAddress });
      })
      .catch(() => {})
  );
};

export const queryUser = (coinAddress) => {
  return userApi.queryCoinUser({
    coinAddress,
  });
};

export const useQueryCoinUserDetail = (pageNumber) => {
  const userInfo = MyLocalStorage.localstorage.getItem("userInfo");
  return useSWR("/api/queryCoinUserDetail", () =>
    userApi.queryCoinUserDetail({
      coinAddress: userInfo.coinAddress,
      page: pageNumber,
      rows: 10,
    })
  );
};

export const queryCoinUserueryCoinUserDetail = (page, rows, flag) => {
  return checkInstallMask()
    .then((coinAddress) => {
      return userApi.queryCoinUserDetail({
        coinAddress,
        page,
        rows,
        flag,
      });
    })
    .catch(() => {});
};

export const checkPayPassword = (payPassword) => {
  return checkInstallMask()
    .then((coinAddress) => {
      return userApi.checkPayPassword({
        coinAddress,
        payPassword,
      });
    })
};
