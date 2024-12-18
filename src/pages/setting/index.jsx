import { DetailPage } from "@/components";
import md5 from "md5";
import { Button, Dialog, Form, Input, Toast } from "antd-mobile";
import "./index.less";
import { useQueryUser } from "@/hooks/reuqest";
import { userApi } from "@/api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from '@/config/i18next'

const Setting = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const JumpToResult = () => {
    navigate("/setting-result");
  };
  const { data: userData = {}, mutate } = useQueryUser();
  const onFinish = async ({ payPassword, rePayPassword }) => {
    if (!payPassword || !rePayPassword) {
      return Toast.show({
        content: i18next.t("请输入密码"),
        position: "top",
      });
    }
    console.log(payPassword, rePayPassword );
    await userApi.changCoinUser({
      coinAddress: userData.coinAddress,
      coinName: userData.coinName,
      payPassword: md5(payPassword),
      rePayPassword: md5(rePayPassword),
    });
    JumpToResult()
    mutate();
  };
  return (
    <DetailPage
      className="setting-container"
      title={`${i18next.t("设置")}`}
      bodyStyle={{ padding: 0 }}
    >
      <Form className="form" layout="horizontal" onFinish={onFinish} style={{ '--prefix-width': '9em'}}>
        <Form.Item className="rounded-xl" label={`${i18next.t("设置密码")}：`} name="payPassword">
          <Input type="password" placeholder={`${i18next.t("输入密码")}`} />
        </Form.Item>
        <Form.Item
          className="rounded-xl"
          label={`${i18next.t("重复密码")}：`}
          name="rePayPassword"
        >
          <Input type="password" placeholder={`${i18next.t("再次输入密码")}`} />
        </Form.Item>
        <Button
          style={{
            "--background-color": "#ffc300",
            "--border-color": "#ffc300",
            "--text-color": "white",
            position: "fixed",
          }}
          className="w-[122px] h-[41px!important] bottom-10 left-[50%] -translate-x-[50%]"
          size="small"
          color="primary"
          type="submit"
        >
          {`${i18next.t("确定")}`}
        </Button>
      </Form>
    </DetailPage>
  );
};

export default Setting;
