import { Toast } from "antd-mobile";
import tpSdk from "tp-js-sdk";
import i18next from "@/config/i18next";
export const checkInstallMask = (type = "BSC") => {
  return new Promise((resolve, reject) => {
    if (tpSdk.isConnected()) {
      // TP钱包
      tpSdk.getCurrentWallet().then((res) => {
        if (res.data) {
          if (res.data.blockchain === "bsc" || res.data.blockchain === "tron") {
            resolve(res.data.address);
          } else {
            Toast.show(i18next.t("请切换成BSC链"))
            reject()
          }
        } else {
          Toast.show(i18next.t("获取钱包失败"))
          reject()
        }
      });
    } else {
      //鸿蒙安卓版本TP不支持这个变量
      if (typeof window.ethereum === "undefined") {
        Toast.show("请安装钱包")
      } else {
        window.ethereum.on('accountsChanged', function (accounts) {
          window.location.href = '/home'
          // window.location.reload();
        })
        
        window.ethereum
            .enable()
            .catch((err) => {
              Toast.show(i18next.t("未知错误，获取钱包失败"))
              reject()
            })
            .then((accounts) => {
              if (window.ethereum.networkVersion == (type === "BSC" ? 56 : 1)) {
                if (accounts && accounts[0]) {
                  resolve(accounts[0]);
                } else {
                  Toast.show(i18next.t("请解锁钱包，无法获取钱包地址"))
                  reject()
                }
              } else {
                Toast.show(i18next.t("请切换成BSC链"))
                reject()
              }
            });
      }
    }

  });
}

