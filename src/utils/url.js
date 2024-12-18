import md5 from "md5";
import { key } from "@/config";
import { MyLocalStorage } from "./Mylocalstorage";

function objKeySort(arys) {
  var newkey = Object.keys(arys).sort();
  var newObj = {};
  for (var i = 0; i < newkey.length; i++) {
    if (arys[newkey[i]] !== undefined) {
      newObj[newkey[i]] = arys[newkey[i]];
    }
  }
  return newObj; //返回排好序的新对象
}

function objectToQueryString(obj) {
  let queryString = '';

  // 遍历对象的属性，将其添加到queryString中
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = decodeURIComponent(obj[key]);
      queryString += `${key}=${value}&`;
    }
  }

  // 去掉末尾的&
  queryString = queryString.slice(0, -1);

  // 返回查询字符串
  return queryString;
}

export const handleParams = (data) => {
  const lang = window.localStorage.getItem("changeLanguage");
  const sortedObj = objKeySort({ ...data , lang });
  return {
    ...sortedObj,
    sign: md5(`${objectToQueryString(sortedObj)}&key=${key}`),
  };
};

export const getUrlParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(searchParams.entries());
};

export const saveParentAdress = () => {
  const { parentAddress } = getUrlParams();
  const prevParentInfo = MyLocalStorage.localstorage.getItem("parentInfo");
  if (parentAddress && parentAddress !== prevParentInfo?.parentAddress) {
    MyLocalStorage.localstorage.setItem("parentInfo", { parentAddress });
  }
};
