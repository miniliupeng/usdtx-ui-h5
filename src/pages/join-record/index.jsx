import { DetailPage } from "@/components";
import { getUrlParams } from "@/utils/url";
import { ReactComponent as TimerIcon } from "@/assets/svg/timer.svg";
import {
  useQueryCoinProjectInfo,
  useQueryCoinUserProject,
} from "@/hooks/reuqest";
import { DotLoading, Image } from "antd-mobile";
import { formatCoinAddress } from "@/utils";
import { useParams } from "react-router-dom";
import i18next from "@/config/i18next";

// 1 进行中  0
// 0 已揭晓  1  2
// const data = MockData1[0];
const JoinRecord = () => {
  const { type = "0", from, coinAddress } = getUrlParams();
  const { id: projectId } = useParams();
  let backPath;
  if (from) {
    backPath = `/order?activeIndex=${type}`;
  }
  const { isLoading, data = [] } = useQueryCoinUserProject({
    projectId,
    coinAddress,
  });
  const item = data[0] || {};
  const { data: allData = { joinList: [] } } = useQueryCoinProjectInfo(
    projectId,
    coinAddress
  );
  const projectInfo = allData.data || {};
  const allNumbers = (allData.joinList || [])
    .map((item) => item.items)
    .flat(Infinity);
  const joinCnt = data.reduce((prev, item) => prev + item.coinCnt, 0);
  return (
    <DetailPage
      backPath={backPath}
      title={item.projectName}
      bodyStyle={{ padding: 0 }}
    >
      {isLoading ? (
        <DotLoading />
      ) : (
        <>
          <Image src={item.projectImg} height={'auto'} className="aspect-square"  />
          <div className="p-1">
            <h1>
              ({item.projectDesc
              })
              {/* <span className="ml-1 text-[14px]">2022路虎C700L运动版</span> */}
            </h1>
            <p className="py-1">
              <span className="text-[#505050]">{i18next.t("参与人次")}：</span>
              <span className="text-[#ff8d1a]">{projectInfo.joinCnt}</span>
            </p>
            {type === "0" ? (
              <div className="flex items-center justify-center gap-1 mb-1 bg-[#ffc30075] rounded p-1 text-[#d43030] text-[14px]">
                <TimerIcon width={28} height={28} />
                {i18next.t("还差{{count}}人参与，满员即将开奖", {
                  count: projectInfo.readyCnt,
                })}
              </div>
            ) : (
              <div className="mb-1 bg-[#ffc30075] rounded p-1 text-[#505050] text-[14px] text-center">
                {i18next.t("账户")} {formatCoinAddress(item.coinAddress)}
              </div>
            )}

            <div className="mb-1 bg-white rounded p-1 text-[#505050] text-[14px] text-center">
              {item.buyTime} {/* {type === "1" && `${i18next.t("您共")}`} */}
              {i18next.t("参与")}
              {joinCnt}
              {i18next.t("人次")}
            </div>
            <div className="grid grid-cols-3 gap-1 p-1">
              {allNumbers.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      item.status === "1"
                        ? "bg-[#ffc30075] text-[#d43030]"
                        : "bg-white text-[#505050]"
                    } rounded p-1  text-[14px] text-center`}
                  >
                    {item.luckNum}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </DetailPage>
  );
};

export default JoinRecord;
