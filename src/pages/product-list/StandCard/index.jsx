import { Image, ProgressBar } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import i18next from "@/config/i18next";

export const StandCard = ({ data, status = '1' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOrder = location.pathname === "/order";
  const JumpToProjectPurchase = () => {
    if (isOrder) {
      // 购买记录页点击跳转
      navigate(
        `/join-record/${data.projectId}?type=${status}&coinAddress=${data.coinAddress}`
      );
    } else {
      // 项目列表页跳转到购买
      navigate(`/product-purchase/${data.projectId}`);
    }
  };
  return (
    <div
      className="flex p-2 bg-white gap-[15px] rounded-lg"
      onClick={JumpToProjectPurchase}
    >
      <Image
        className="shrink-0 aspect-square"
        height={77}
        src={data.projectImg}
        fit="contain"
        alt=""
      />
      <div className={`flex-1 min-w-0 flex flex-col ${isOrder ? 'justify-around' : 'justify-between'}`}>
        <h1 className=" text-[14px] truncate">{data.projectName}</h1>
        {!isOrder && (
          <ProgressBar
            percent={(data.joinCnt / (data.joinCnt + data.readyCnt)) * 100}
            style={{
              margin: "4px",

              "--track-width": "2px",
              "--fill-color": "#ff8d1a",
            }}
          />
        )}

        <div className="flex justify-between text-[12px]">
          {isOrder ? (
            <>
              <p>
                {i18next.t("已参与")}{' '}
                {data.coinCnt} {' '}
                {i18next.t("人次")}
              </p>
              <p className="text-[#ff8d1a]">{i18next.t(`${status === '0' ? "待开奖" : "未中奖"}`)}</p>
            </>
          ) : (
            <>
              <div className=" min-w-0 ">
                <p className="text-[#ff8d1a]">{data.joinCnt}</p>
                <p>{i18next.t("已参与")}</p>
              </div>
              <div className="flex-1  min-w-0 text-center ">
                <p>{data.needCnt}</p>
                <p>{i18next.t("共参人次")}</p>
              </div>
              <div className="  min-w-0 ">
                <p className="text-[#ff8d1a]">{data.readyCnt}</p>
                <p>{i18next.t("剩余")}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
