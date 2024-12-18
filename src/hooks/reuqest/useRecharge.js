import { withdrawApi } from "@/api";
import { MyLocalStorage } from "@/utils";
import useSWR from "swr";

// export const useQueryCoinUserWithdraw = (coinCnt) => {
//   const userInfo = MyLocalStorage.localstorage.getItem("userInfo");
//   return useSWR("/api/queryCoinUserWithdraw", () => withdrawApi.queryCoinUserWithdraw({
//     coinAddress: userInfo.coinAddress,
//     coinCnt,
//     flag: '0',
//     // hash,
//   }));
// };
