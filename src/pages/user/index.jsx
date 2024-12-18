import { useQueryUser } from "@/hooks/reuqest";
import { Button, Divider, Image, List, Toast } from "antd-mobile";
import { StarFill } from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as SettingIcon } from "@/assets/svg/setting.svg";
import { ReactComponent as RechargeIcon } from "@/assets/svg/recharge.svg";
import { ReactComponent as WithdrawIcon } from "@/assets/svg/withdraw.svg";

import { ReactComponent as Service1Icon } from "@/assets/svg/service-1.svg";
import { ReactComponent as Service2Icon } from "@/assets/svg/service-2.svg";
import { ReactComponent as Service3Icon } from "@/assets/svg/service-3.svg";
import { ReactComponent as Service4Icon } from "@/assets/svg/service-4.svg";

import { ReactComponent as ArrowIcon } from "@/assets/svg/arrow-1.svg";
import { ReactComponent as LevelIcon } from "@/assets/svg/level.svg";

import userPng from "@/assets/images/user.png";
import { useTranslation } from "react-i18next";
import i18next from "@/config/i18next";

import "./index.less";
import { MyLocalStorage, formatCoinAddress } from "@/utils";
import { PwdConfirmModal } from "@/components";
import { useState } from "react";


const User = () => {

  const { t } = useTranslation();
  const { isLoading, data = {} } = useQueryUser();
  const navigate = useNavigate();

  const jumpToPurchaseRecord = () => {
    navigate("/purchase-record");
  };
  const jumpToWithdraw = () => {
    if (!data.coinAddress) {
      return Toast.show({
        content: i18next.t("请解锁钱包，无法获取钱包地址"),
      });
    }
    navigate("/withdraw");
  };
  const jumpToSetting = () => {
    navigate("/setting");
  };
  const jumpToRecharge = () => {
    if (!data.coinAddress) {
      return Toast.show({
        content: i18next.t("请解锁钱包，无法获取钱包地址"),
      });
    }
    navigate("/recharge");
  };
  const jumpToAccountDetails = () => {
    if (!data.coinAddress) {
      return Toast.show({
        content: i18next.t("请解锁钱包，无法获取钱包地址"),
      });
    }
    navigate("/account-details");
  };
  const JumpToFaq = () => {
    navigate("/faq");
  };
  const JumpToContactUs = () => {
    navigate("/contact-us");
  };
  // const onClickContactUs = () => {
  //   window.location.href = `tel:${"10086"}`;
  // };
  const onInvite = () => {
    if (!data.coinAddress) {
      return Toast.show({
        content: i18next.t("请解锁钱包，无法获取钱包地址"),
      });
    }
    //创建input辅助元素
    const input = document.createElement("input");
    document.body.append(input);
    input.value = `${window.location.origin}?parentAddress=${data.coinAddress}`;
    //选中input元素
    input.select();
    //复制
    const flag = document.execCommand("copy", false, null);
    //移除辅助元素
    input.remove();
    Toast.show({
      icon: "success",
      content: i18next.t("链接已生成，去邀请吧"),
    });
  };
  const [visible, setVisible] = useState(false);
  const openModal = () => {
    if (!data.coinAddress) {
      return Toast.show({
        content: i18next.t("请解锁钱包，无法获取钱包地址"),
      });
    }
    setVisible(true);
  };

  const levelMap = {
    0: i18next.t("普通用户"),
    1: i18next.t("铜牌会员"),
    2: i18next.t("银牌会员"),
    3: i18next.t("金牌会员"),
  };
  
  return (
    <div>
      <div className="py-1 px-2 bg-[url('@/assets/images/my.jpg')] bg-cover bg-center">
        <div className="flex justify-between items-center">
          <div className=" basis-[26px]"></div>
          <span className="text-[16px] text-black font-bold">{t("我的")}</span>
          <SettingIcon
            fill="rgba(153, 153, 153, 1)"
            width={26}
            height={26}
            onClick={openModal}
          />
        </div>
        <div className="p-1 grid grid-cols-[auto,1fr] gap-x-1 items-center">
          <Image
            className="rounded-full"
            src={userPng}
            width={56}
            height={56}
            fit="cover"
          />
          <div className="text-[14px] text-black">
            <p>{formatCoinAddress(data.coinAddress)}</p>
            <div className="mt-1">
              <span className="text-[12px] text-black mr-[4px]">{levelMap[data.level]}</span>
              {new Array(parseInt(data.level || 0)).fill(0).map((_, index) => (
                <LevelIcon key={index} width={29} height={29} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 mt-[-12px]">
        <div className="bg-white rounded mt-[-4px] text-[14px] text-[#505050]">
          <p className="px-3 py-1">
            {i18next.t("余额")}：
            <span className="text-[#3b8be0] ml-2">{data.coinCnt}U</span>
          </p>
          <Divider direction="horizontal" style={{ margin: "0 0 8px" }} />
          <div className="flex justify-around p-1">
            <div
              className="flex flex-col items-center"
              onClick={jumpToRecharge}
            >
              <RechargeIcon width={38} height={38} />
              <span>{i18next.t("充值")}</span>
            </div>
            <div
              className="flex flex-col items-center"
              onClick={jumpToWithdraw}
            >
              <WithdrawIcon width={38} height={38} />
              <span>{i18next.t("提现")}</span>
            </div>
          </div>
        </div>
        <h1 className="mt-2 mb-1 text-[14px] text-[#505050]">
          {i18next.t("更多服务")}
        </h1>
        <List className="list">
          <List.Item
            prefix={<Service1Icon width={24} height={24} />}
            arrow={<ArrowIcon width={21} height={21} />}
            onClick={jumpToAccountDetails}
          >
            {i18next.t("账户明细")}
          </List.Item>
          <List.Item
            prefix={<Service2Icon width={24} height={24} />}
            arrow={<ArrowIcon width={21} height={21} />}
            onClick={JumpToFaq}
          >
            {i18next.t("常见问题")}
          </List.Item>
          <List.Item
            prefix={<Service3Icon width={24} height={24} />}
            arrow={<ArrowIcon width={21} height={21} />}
            onClick={JumpToContactUs}
          >
            {i18next.t("联系客服")}
          </List.Item>
          <List.Item
            prefix={<Service4Icon width={24} height={24} />}
            arrow={
              <Button
                style={{
                  "--background-color": "#ffc300",
                  "--border-color": "#ffc300",
                  "--text-color": "white",
                  width: 71,
                }}
                size="small"
                color="primary"
              >
                {i18next.t("邀请")}
              </Button>
            }
            onClick={onInvite}
          >
            {i18next.t("邀请他人参与")}
          </List.Item>
        </List>
      </div>
      <PwdConfirmModal
        visible={visible}
        setVisible={setVisible}
        onOk={jumpToSetting}
        onCancel={() => {}}
      />
    </div>
  );
};

export default User;
