import { Button, Image } from "antd-mobile";
import i18next from "i18next";
import KefuImg from "@/assets/images/kefu.png";

const url = "https://t.me/usdtx_service";
export const Service = () => {
  return (
    <div /* className="flex items-center gap-1" */>
      <div className="flex">
        <p className="mr-1">{i18next.t("邮箱")}</p>
        <p>info@usdtx.cc</p>
      </div>

      <div className="pt-1 flex items-center">
        <Image
          src={KefuImg}
          className="shrink-0 aspect-square mr-1"
          height={34}
          fit="contain"
          alt=""
        />
        <div className=" flex mt-[4px]">
          <p className="mr-1">{i18next.t("Telegram 客服")}</p>
          <p>
            <Button
              style={{
                "--background-color": "#ffc300",
                "--border-color": "#ffc300",
                "--text-color": "white",
                "--adm-font-size-7": "12px",
                // width: 76,
              }}
              size="small"
              color="primary"
              onClick={() => window.open(url)}
            >
              {`${i18next.t("在线交流")}`}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};
