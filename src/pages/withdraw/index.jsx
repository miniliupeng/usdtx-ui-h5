// import { coinUserWithdraw } from "@/api/withdraw";
// import { useQueryUser } from "@/hooks/reuqest";
// import { MyLocalStorage } from "@/utils";
// import {
//   Button,
//   Divider,
//   Image,
//   Form,
//   Input,
//   NavBar,
//   Tabs,
//   Checkbox,
//   Space,
// } from "antd-mobile";
// import { useNavigate } from "react-router-dom";

// const Withdraw = () => {
//   const { data, mutate } = useQueryUser();
//   const userInfo = MyLocalStorage.localstorage.getItem("userInfo");
//   const navigate = useNavigate();
//   const jumpToRecord = () => {
//     navigate("/withdraw-record");
//   };
//   const onFinish = async (values) => {
//     const { coinCnt } = values;
//     await coinUserWithdraw({ coinAddress: userInfo.coinAddress, coinCnt });
//     mutate();
//   };
//   return (
//     <>
//       <NavBar
//         className="bg-[#fff]"
//         backArrow={false}
//         right={
//           <Button
//             size="small"
//             color="primary"
//             className="px-[4px!important] py-[2px!important]"
//             fill="none"
//             onClick={jumpToRecord}
//           >
//             <span className="text-[12px]">提现记录</span>
//           </Button>
//         }
//       ></NavBar>
//       <div className="p-[16px]">
//         <div className="bg-[#fff] p-1 rounded">
//           <h1 className="text-[16px]"> 我的资产</h1>
//           <Divider />
//           <div className="flex justify-around">
//             <span>可用金额</span>
//             <span>{userInfo.coinCnt}</span>
//           </div>
//         </div>
//         <div className="bg-[#fff] p-1 rounded mt-1">
//           <Form
//             layout="horizontal"
//             footer={
//               <>
//                 <Form.Subscribe to={["coinCnt"]}>
//                   {({ coinCnt }) => <div>提示：预计到账{coinCnt || 0}U</div>}
//                 </Form.Subscribe>
//                 <Button block type="submit" color="primary" size="large">
//                   提现
//                 </Button>
//               </>
//             }
//             onFinish={onFinish}
//           >
//             <Form.Item
//               name="name"
//               label="提现账户"
//               initialValue={userInfo.coinName}
//             >
//               <Input disabled />
//             </Form.Item>
//             <Form.Item name="coinCnt" label="提现数量（U）">
//               <Input />
//             </Form.Item>
//             <Form.Item name="type" initialValue={"1"} label="到账方式">
//               <Checkbox.Group>
//                 <Space direction="vertical">
//                   <Checkbox value="1">立即到账（1U手续费）</Checkbox>
//                   <Checkbox value="2">24小时到账（免费）</Checkbox>
//                 </Space>
//               </Checkbox.Group>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Withdraw;

import { DetailPage, PwdConfirmModal } from "@/components";
import { Button, Form, Input, Modal, Toast } from "antd-mobile";
import { ReactComponent as RecordIcon } from "@/assets/svg/record.svg";
import md5 from "md5";
import "./index.less";
import { useNavigate } from "react-router-dom";
import { MyLocalStorage, formatCoinAddress } from "@/utils";
import { useGetSysInfo, useQueryUser } from "@/hooks/reuqest";
import { withdrawApi } from "@/api";
import { useTranslation } from "react-i18next";
import i18next from "@/config/i18next";
import { WithdrawModal } from "./WithdrawModal";
import { useState } from "react";

const Withdraw = () => {
  const navigate = useNavigate();
  const { data: userData = {}, mutate } = useQueryUser();
  const jumpToWithdrawRecord = () => {
    navigate("/withdraw-record");
  };
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [coinCnt, setCoinCnt] = useState();
  const onSubmit = () => {
    const { coinCnt } = form.getFieldsValue();
    if (!coinCnt) {
      return Toast.show({
        content: i18next.t("请输入提现数量"),
        position: "top",
      });
    }
    setVisible(true);
    setCoinCnt(coinCnt);
  };
  const onOk = async ({ payPasswd }) => {
    const userInfo = MyLocalStorage.localstorage.getItem("userInfo");
    await withdrawApi.coinUserWithdraw({
      coinAddress: userInfo.coinAddress,
      coinCnt,
      payPass: payPasswd,
    });
    mutate();
    navigate("/withdraw-result");
  };
  const onCancel = () => {
    passwordForm.resetFields();
    setCoinCnt(undefined);
  };
  const onAll = () => {
    form.setFieldsValue({
      coinCnt: userData.coinCnt,
    });
  };

  // const { data: address } = useGetSysInfo();
  return (
    <DetailPage
      className="withdraw-container"
      title={`${i18next.t("提现")}`}
      extra={
        <RecordIcon width={24} height={24} onClick={jumpToWithdrawRecord} />
      }
    >
      <h1 className="my-3 mx-3 text-[#505050] text-[14px]">
        {`${i18next.t("到账地址")}`}：
        <span className="">
          <span className="">{formatCoinAddress(userData.coinAddress)}</span>
        </span>
      </h1>
      <div className="rounded-lg bg-white py-1">
        <h1 className="py-1 px-3 text-[#505050] text-[14px]">
          {`${i18next.t("提现数量")}`}（U）
        </h1>
        <Form
          form={form}
          style={{
            "--prefix-width": "0.75rem",
            "--adm-color-text-secondary": "#000000",
          }}
          layout="horizontal"
          className="form pt-2 px-2"
        >
          <Form.Item name="coinCnt" label="¥">
            <Input
              type="number"
              placeholder={`${i18next.t("请输入提现数量")}`}
            />
          </Form.Item>
        </Form>
        <p className="p-2 pb-1">
          <span>{`${i18next.t("可用额度")}`}</span>
          <span className="ml-1">{userData.coinCnt}U</span>
          <span className="ml-2 text-[#2a82e4]" onClick={onAll}>
            {`${i18next.t("全部提现")}`}
          </span>
        </p>
      </div>
      <div className="mt-4 text-center">
        <Button
          style={{
            "--background-color": "#ffc300",
            "--border-color": "#ffc300",
            "--text-color": "white",
          }}
          className="w-[122px] h-[41px!important]"
          size="small"
          color="primary"
          onClick={onSubmit}
        >
          {`${i18next.t("提现")}`}
        </Button>
      </div>
      <PwdConfirmModal
        visible={visible}
        setVisible={setVisible}
        onCancel={onCancel}
        onOk={onOk}
      />
      {/* <WithdrawModal
        visible={visible}
        setVisible={setVisible}
        onCancel={onCancel}
        mutate={mutate}
        coinCnt={coinCnt}
      /> */}
    </DetailPage>
  );
};

export default Withdraw;
