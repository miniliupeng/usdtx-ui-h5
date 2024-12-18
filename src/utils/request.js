import axios from "axios";
import { Toast } from "antd-mobile";
import { httpUrl } from "@/config";
import { handleParams } from "./url";

const instance = axios.create({
  baseURL: httpUrl,
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  },
});

export const request = ({ data, url, allData, showToast = true }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, handleParams(data))
      .then((response) => {
        const res = response.data;
        if (res.code !== "1") {
          showToast && Toast.show(res.msg);
          if (res.code === "0") {
            return reject(new Error(res.msg || "Error"));
          }
        }
        resolve(allData ? res : res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
