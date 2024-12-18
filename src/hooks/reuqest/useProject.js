import { projectApi } from "@/api";
import { MyLocalStorage } from "@/utils";
import { checkInstallMask } from "@/utils/check";
import useSWR from "swr";

export const useQueryCoinProject = ({ status }) => {
  return useSWR(`/api/queryCoinProject?status=${status}`, () =>
    projectApi.queryCoinProject({ status })
  );
};

export const useQueryCoinProjectAllInfo = (projectId) => {
  return useSWR(`/api/queryCoinProjectInfo?id=${projectId}`, () =>
    projectApi.queryCoinProjectInfo({
      projectId,
    })
  );
};

export const useQueryCoinProjectInfo = (projectId, coinAddress) => {
  const userInfo = MyLocalStorage.localstorage.getItem("userInfo");
  return useSWR(
    `/api/queryCoinProjectInfo?id=${projectId}&coinAddress=${coinAddress}`,
    () =>
      projectApi.queryCoinProjectInfo({
        coinAddress: coinAddress || userInfo.coinAddress,
        projectId,
      })
  );
};

export const useQueryCoinUserProject = ({
  pageNum = 1,
  projectId,
  status,
  coinAddress,
} = {}) => {
  const userInfo = MyLocalStorage.localstorage.getItem("userInfo");
  return useSWR(
    `/api/queryCoinUserProject?projectId=${projectId || ""}&status=${
      status || ""
    }&coinAddress=${coinAddress}`,
    () =>
      projectApi.queryCoinUserProject({
        coinAddress: coinAddress || userInfo.coinAddress,
        page: pageNum,
        projectId,
        rows: 10,
        status,
      })
  );
};

export const addCoinUserProject = (data) => {
  return checkInstallMask().then((coinAddress) =>
    projectApi
      .addCoinUserProject({
        coinAddress,
        ...data,
      })
      // .catch(() => {})
  );
};
