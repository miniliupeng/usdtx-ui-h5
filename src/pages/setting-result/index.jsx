import { useEffect } from "react";
import { DetailPage } from "@/components";
import { Result } from "antd-mobile";
import { ReactComponent as SuccessIcon } from "@/assets/svg/success.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from '@/config/i18next'

const SettingResult = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const back = () => {
    navigate("/user");
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      back();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <DetailPage
        title={`${i18next.t("设置成功")}`}
      backArrow={null}
      extra={<span onClick={back}>{`${i18next.t("完成")}`}</span>}
    >
      <Result
        icon={
          <SuccessIcon width={68} height={68} style={{ marginLeft: "-10px" }} />
        }
        description={<p className="text-[#505050] text-[14px]">{`${i18next.t("密码设置成功")}`}</p>}
        className="result mb-1 rounded-lg"
      />
    </DetailPage>
  );
};

export default SettingResult;
