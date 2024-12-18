import Web3 from "web3";
import ABI from "@/config/abi";
import { urls } from "@/config";
import { Toast } from "antd-mobile";
import i18next from '@/config/i18next'

const type = "BSC";

export const onOk = async (usdtNum, coinAddress, address, fn) => {
  return new Promise((resolve, reject) => {
    let web3;
    web3 = new Web3(urls[type]);
    web3.eth.setProvider(Web3.givenProvider);
    let myContract = new web3.eth.Contract(
      ABI[type].usdtContractAbi,
      ABI[type].usdtContract
    );
    myContract.methods
      .balanceOf(coinAddress) // 当前用户
      .call()
      .then((res) => {
        Toast.show({
          icon: "loading",
          content: i18next.t("交易中，请勿关闭"),
          duration: 0,
          position: "center",
        });
        myContract.methods
          .transfer(address, web3.utils.toWei(String(usdtNum), "ether")) // 后台账户
          .send({
            from: coinAddress, // 当前用户
            gas:210000,
          })
          .on("error", (error) => {
            if (error.code===4001){
              Toast.show({
                content: i18next.t("交易已取消"),
                position: "center",
              });
            }else {
              Toast.show({
                content: i18next.t("交易失败"),
                position: "center",
              });
            }
            reject()
          })
          .on("transactionHash", (transactionHash) => {
            console.log("success----->");
            if (transactionHash) {
              Toast.show({
                content: i18next.t("交易成功"),
                position: "center",
              });
              fn(transactionHash);
              resolve()
            }
          });
      });
  });
};
