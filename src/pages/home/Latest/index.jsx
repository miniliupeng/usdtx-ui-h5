import { Subfield } from "@/components";
import { ReactComponent as LatestIcon } from "@/assets/svg/latest.svg";

import Project1 from "@/assets/images/banner-1.jpg";
import Project2 from "@/assets/images/project-2.jpg";
import Project3 from "@/assets/images/banner-2.jpg";
import Project4 from "@/assets/images/project-4.jpg";
import { useNavigate } from "react-router-dom";
import { useQueryCoinProject } from "@/hooks/reuqest";
import { DotLoading, Image } from "antd-mobile";
import i18next from '@/config/i18next'

export const MockData1 = [
  {
    projectId: 1,
    projectImg: Project1,
    count: "第10005期",
    projectName: "(第10001期) 2023法拉利C500L运动版",
    needCnt: 10099,
    readyCnt: 10056,
    joinCnt: 43,
    user: "萌萌",
    jiexiaoTime: "2023-10-23 14:34:23",
    number: 1082867,
  },
  {
    projectId: 2,
    projectImg: Project2,
    count: "第10006期",
    projectName: "(第10001期) 2023法拉利C500L运动版",
    needCnt: 10099,
    readyCnt: 10056,
    joinCnt: 43,
    user: "李四",
    jiexiaoTime: "2023-10-23 14:34:23",
    number: 1082867,
  },
  {
    projectId: 3,
    projectImg: Project3,
    count: "第10007期",
    projectName: "(第10001期) 2023法拉利C500L运动版",
    needCnt: 10099,
    readyCnt: 10056,
    joinCnt: 43,
    user: "秦国",
    jiexiaoTime: "2023-10-23 14:34:23",
    number: 1082867,
  },
  {
    projectId: 4,
    projectImg: Project4,
    count: "第10008期",
    projectName: "(第10001期) 2023法拉利C500L运动版",
    needCnt: 10099,
    readyCnt: 10056,
    joinCnt: 43,
    user: "悦悦",
    jiexiaoTime: "2023-10-23 14:34:23",
    number: 1082867,
  },
];

export const Latest = () => {
  const navigate = useNavigate();
  const JumpToProjectList = () => {
    // 跳转到已揭晓项目列表
    navigate(`/product-list?activeIndex=1`);
  };
  const JumpToProjectLatest = (id) => {
    // 跳转到已揭晓项目
    navigate(`/product-latest/${id}`);
  };

  const { isLoading, data } = useQueryCoinProject({ status: '2' });

  return (
    <>
      <Subfield
        Icon={LatestIcon}
        title={`${i18next.t("最新中奖")}`}
        onClick={JumpToProjectList}
      />
      <div className="grid grid-cols-[repeat(4,minmax(70px,1fr))] gap-1 justify-between bg-white p-2">
        {isLoading ? (
          <DotLoading />
        ) : (
          <>
            {(data || []).slice(0, 4).map((item) => (
              <div
                key={item.projectId}
                className="flex flex-col gap-1"
                onClick={() => JumpToProjectLatest(item.projectId)}
              >
                <Image
                  className="aspect-square self-center"
                  src={item.projectImg}
                  alt=""
                  fit="cover"
                  width={68}
                />
                <h1 className="rounded bg-[#ffc300] text-white italic text-center">
                  {item.projectName.slice(0, 8)}
                </h1>
                <p className="text-[9px] text-[#505050] text-center flex">
                  {`${i18next.t("中奖者")}`}：<span className="flex-1 text-ellipsis whitespace-nowrap overflow-hidden">{item.luckCoin}</span>
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
