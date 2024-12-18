import { Form, Input, Modal, Toast } from "antd-mobile";
import i18next from "@/config/i18next";
import { withdrawApi } from "@/api";
import { useNavigate } from "react-router-dom";
import md5 from "md5";
import { MyLocalStorage } from "@/utils";

export const WithdrawModal = ({
  visible,
  setVisible,
  onCancel,
  mutate,
  coinCnt,
}) => {
  const [passwordForm] = Form.useForm();
  const navigate = useNavigate();
  const onAction = async (action, index) => {
    try {
      if (action.key === "confirm") {
        const { payPasswd } = passwordForm.getFieldsValue();
        if (!payPasswd) {
          return Toast.show({
            content: i18next.t("请输入密码"),
            position: "top",
          });
        }
        const userInfo = MyLocalStorage.localstorage.getItem("userInfo");
        await withdrawApi.coinUserWithdraw({
          coinAddress: userInfo.coinAddress,
          coinCnt,
          payPass: md5(payPasswd),
        });
        passwordForm.resetFields();
        mutate();
        navigate("/withdraw-result");
        onCancel();
        setVisible(false);
      } else {
        onCancel();
        setVisible(false);
        passwordForm.resetFields();
      }
    } catch (error) {}
  };
  return (
    <Modal
      visible={visible}
      bodyClassName={"custom-modal"}
      title={i18next.t("请输入密码")}
      content={
        <Form layout="horizontal" form={passwordForm}>
          <Form.Item name={"payPasswd"}>
            <Input
              className="pwd-input"
              type="password"
              placeholder={`${i18next.t("请输入密码")}`}
            />
          </Form.Item>
        </Form>
      }
      closeOnAction
      // onClose={() => {
      //   setVisible(false);
      // }}
      actions={[
        {
          key: "confirm",
          text: i18next.t("确定"),
        },
        {
          key: "cancel",
          text: i18next.t("取消"),
        },
      ]}
      onAction={onAction}
    />
  );
};
