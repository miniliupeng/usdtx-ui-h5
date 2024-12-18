import { useNavigate } from "react-router-dom";
import { DetailPage } from "@/components";
import { Button, Form, Input, Toast } from "antd-mobile";

import "./index.less";
import { useGetSysInfo, useQueryUser } from "@/hooks/reuqest";
import { rechargeApi } from "@/api";
import { formatCoinAddress } from "@/utils";
import i18next from '@/config/i18next'
import { onOk } from "./helper";

const Recharge = () => {
  const navigate = useNavigate();
  const { data = {}, mutate } = useQueryUser();
  
  const { data: address } = useGetSysInfo();
  const [form] = Form.useForm();
  const onSubmit = async () => {
    const { coinCnt } = form.getFieldsValue();
    if (!coinCnt) {
      return Toast.show({
          content: i18next.t("请输入充值数量"),
        position: "top",
      });
    }
    await onOk(coinCnt, data.coinAddress, address,(transactionHash) => rechargeApi.coinUserRecharge({
      coinAddress: data.coinAddress,
      coinCnt: coinCnt,
      flag: "0",
      hash: transactionHash
    })).then(() => {
      navigate("/recharge-result");
      mutate()
    }).catch(() => {})
  };

  return (
    <DetailPage title={`${i18next.t("充值")}`}>
      <h1 className="my-3 mx-3 text-[#505050] text-[14px]">
          {`${i18next.t("充值地址")}`}：
        <span className="">{formatCoinAddress(data.coinAddress)}</span>
      </h1>
      <div className="rounded-lg bg-white py-1">
        <h1 className="py-1 px-3 text-[#505050] text-[14px]">{`${i18next.t("充值数量")}`}：</h1>
        <Form
          style={{
            "--prefix-width": "0.75rem",
            "--adm-color-text-secondary": "#000000",
          }}
          layout="horizontal"
          className="form p-2"
          form={form}
        >
          <Form.Item name="coinCnt" label="¥">
            <Input type="number" placeholder={`${i18next.t("请输入充值数量")}`} />
          </Form.Item>
        </Form>
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
            {`${i18next.t("充值")}`}
        </Button>
      </div>
    </DetailPage>
  );
};

export default Recharge;
