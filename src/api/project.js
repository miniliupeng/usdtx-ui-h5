import { request } from "@/utils";

export const queryCoinProject = (data) =>
  request({
    url: "/api/queryCoinProject.do",
    data,
  });

export const queryCoinProjectInfo = (data) =>
  request({
    url: "/api/queryCoinProjectInfo.do",
    data,
    allData: true
  });

export const addCoinUserProject = (data) =>
  request({
    url: "/api/addCoinUserProject.do",
    data,
  });

export const queryCoinUserProject = (data) =>
  request({
    url: "/api/queryCoinUserProject.do",
    data,
  });
