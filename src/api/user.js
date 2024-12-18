import { request } from "@/utils";

// 用户注册
export const addCoinUser = (data) =>
  request({
    url: "/api/addCoinUser.do",
    data,
  });


// 用户查询
export const queryCoinUser = (data) =>
  request({
    url: "/api/queryCoinUser.do",
    data,
    showToast: false
  });

// 账户明细
export const queryCoinUserDetail = (data) =>
  request({
    url: "/api/queryCoinUserDetail.do",
    data,
  });

// 账户设置
export const changCoinUser = (data) =>
  request({
    url: "/api/changCoinUser.do",
    data,
  });
  
// 账户密码校验
export const checkPayPassword = (data) =>
  request({
    url: "/api/checkPayPassword.do",
    data,
  });
