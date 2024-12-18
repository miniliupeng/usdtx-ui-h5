import { Form, Input, Modal, Toast } from "antd-mobile";
import i18next from "@/config/i18next";
import { checkPayPassword } from "@/hooks/reuqest";
import md5 from "md5";
import "./index.less";
import { LockOutline, UserOutline } from "antd-mobile-icons";

export const PwdConfirmModal = ({
  visible,
  setVisible,
  onCancel,
  onOk,
  type = "confirm",
}) => {
  const title =
    type === "confirm"
      ? i18next.t("请输入登录密码")
      : i18next.t("请设置登录密码");
  const [passwordForm] = Form.useForm();
  const onAction = async (action, index) => {
    try {
      if (action.key === "confirm") {
        const { coinName, payPasswd } = passwordForm.getFieldsValue();
        if (!coinName && type === "set") {
          return Toast.show({
            content: i18next.t("请输入用户昵称"),
            position: "top",
          });
        }
        // if(/[\u4E00-\u9FA5]/g.test(coinName)) {
        //   return Toast.show({
        //     content: i18next.t("钱包名称不能输入中文"),
        //     position: "top",
        //   });
        // }
        if (!payPasswd) {
          return Toast.show({
            content: i18next.t("请输入密码"),
            position: "top",
          });
        }
        if (type === "confirm") {
          await checkPayPassword(md5(payPasswd));
        }
        await onOk({ coinName, payPasswd: md5(payPasswd) });
        passwordForm.resetFields();
        onCancel?.();
        setVisible(false);
      } else {
        onCancel?.();
        setVisible(false);
        passwordForm.resetFields();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      visible={visible}
      bodyClassName={`custom-modal ${!onCancel ? "validate-modal" : ""}`}
      title={title}
      content={
        <Form layout="horizontal" form={passwordForm} mode="card">
          {type === "set" && (
            <>
              <Form.Item
                name={"coinName"}
                label={<UserOutline />}
              >
                <Input
                  className="pwd-input"
                  placeholder={`${i18next.t("请输入用户昵称")}`}
                />
              </Form.Item>
              <Form.Header />
            </>
          )}
          <Form.Item name={"payPasswd"} label={<LockOutline />}>
            <Input
              className="pwd-input"
              type="password"
              placeholder={`${i18next.t("请输入密码")}`}
            />
          </Form.Item>
        </Form>
      }
      closeOnAction
      actions={[
        {
          key: "confirm",
          text: i18next.t("确定"),
        },
        ...(onCancel
          ? [
              {
                key: "cancel",
                text: i18next.t("取消"),
              },
            ]
          : []),
      ]}
      onAction={onAction}
    />
  );
};
