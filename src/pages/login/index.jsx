import tpSdk from "tp-js-sdk";
import {useEffect} from "react";

const Login = () => {

  let chainName = "";
  function checkInstallMask(type) {
    return new Promise((resolve, reject) => {
      if (tpSdk.isConnected()) {
        // TP钱包
        tpSdk.getCurrentWallet().then((res) => {
          if (res.data) {
            if (res.data.blockchain === "bsc" || res.data.blockchain === "tron") {
              chainName = res.data.blockchain.toString().toUpperCase();
              resolve([res.data.address]);
            } else {
              console.log("请切换成BSC");
            }
          } else {
            console.log("获取钱包失败");
          }
        });
      } else {
        //鸿蒙安卓版本TP不支持这个变量
        if (typeof window.ethereum === "undefined") {
          console.log("请安装钱包");
        } else {
          window.ethereum
              .enable()
              .catch((err) => {
                console.log(err);
                console.log("未知错误，获取钱包失败");
              })
              .then((accounts) => {
                if (window.ethereum.networkVersion == (type === "BSC" ? 56 : 1)) {
                  console.log('start112',window.ethereum.networkVersion,type,accounts)
                  chainName = "BSC";
                  if (accounts && accounts[0]) {
                    resolve(accounts);
                  } else {
                    console.log("请解锁钱包，无法获取钱包地址");
                  }
                } else {
                  console.log("请切换成BSC链");
                }
              });
        }
      }
    });
  }

  useEffect(checkInstallMask, [])
  return <>login</>;
};

export default Login;
