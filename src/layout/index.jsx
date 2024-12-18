import { Outlet } from "react-router-dom";
import { NavBar } from "./components";
import { addCoinUser, queryUser } from "@/hooks/reuqest";
import { MyLocalStorage } from "@/utils";
import { PwdConfirmModal } from "@/components";
import { useEffect, useState } from "react";
import { checkInstallMask } from "@/utils/check";
import { coinAddress as defaultCoinAddress } from "@/config";
import { Toast } from "antd-mobile";
import i18next from "i18next";

const Layout = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("confirm");
  const [coinAddress, setCoinAddress] = useState();
  const check = async () => {
    MyLocalStorage.localstorage.removeItem("userInfo");
    const coinAddress = await checkInstallMask().catch(() => {});
    if (!coinAddress) return;
    setCoinAddress(coinAddress);
    try {
      const userInfo = await queryUser(coinAddress);
      MyLocalStorage.localstorage.setItem("userInfo", userInfo);
      setVisible(true);
    } catch (error) {
      // 账户不存在
      // console.error(error);
      setType("set");
      setVisible(true);
    }
  };
  useEffect(() => {
    check();
  }, []);

  const onOk = async ({ coinName, payPasswd }) => {
    if (type === "confirm") {
      await true;
    } else {
      const prevParentInfo =  MyLocalStorage.localstorage.getItem("parentInfo") || {};
      await addCoinUser({
        coinAddress: coinAddress,
        coinName,
        parentAddress: prevParentInfo.parentAddress ? prevParentInfo.parentAddress : undefined,
        payPasswd,
      });
      Toast.show({
        content: i18next.t("注册成功"),
        position: "top",
      });
      const userInfo = await queryUser(coinAddress);
      MyLocalStorage.localstorage.setItem("userInfo", userInfo);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className=" flex-1 overflow-auto bg-[#f9f9f9]">
        <Outlet />
      </div>
      <NavBar />
      <PwdConfirmModal
        visible={visible}
        setVisible={setVisible}
        onOk={onOk}
        type={type}
      />
    </div>
  );
};

export default Layout;
