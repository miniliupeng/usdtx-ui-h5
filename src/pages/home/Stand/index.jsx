import { DotLoading, Image, ProgressBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { Subfield } from "@/components";
import { ReactComponent as StandIcon } from "@/assets/svg/stand.svg";
import Project5 from "@/assets/images/banner-3.jpg";
import Swiper1 from "@/assets/images/swiper-1.png";
import { useQueryCoinProject } from "@/hooks/reuqest";
import i18next from '@/config/i18next'
import './index.less'

export const MockData2 = [
  {
    projectId: 5,
    projectImg: Project5, // 列表单个图
    imgs: [Project5, Swiper1], // 详情轮播图
    count: "第10001期",
    projectName: "(第10001期) 2023法拉利C500L运动版",
    needCnt: 10099,
    readyCnt: 10056,
    joinCnt: 43,
    user: "萌萌",
  },
];

export const JoinList = ({ readyCnt, needCnt, joinCnt, style }) => (
  <div className={`flex justify-between text-[12px]`} style={style}>
    <div className=" min-w-0 ">
      <p /* className="text-[#ff8d1a]" */>{joinCnt}</p>
      <p>{i18next.t('已参与')}</p>
    </div>
    <div className="flex-1  min-w-0 text-center ">
      <p>{needCnt}</p>
      <p>{i18next.t('共参人次')}</p>
    </div>
    <div className="  min-w-0 ">
      <p /* className="text-[#ff8d1a]" */>{readyCnt}</p>
      <p>{i18next.t('剩余')}</p>
    </div>
  </div>
);

export const Stand = () => {
  const navigate = useNavigate();
  const JumpToProjectList = () => {
    // 跳转到已揭晓项目
    navigate(`/product-list?activeIndex=0`);
  };
  const JumpToProjectPurchase = (projectId) => {
    // 跳转到已揭晓项目
    navigate(`/product-purchase/${projectId}`);
  };
  const { isLoading, data } = useQueryCoinProject({status: 1});
  return (
    <>
      <Subfield Icon={StandIcon} title={`${i18next.t('即将开奖')}`} onClick={JumpToProjectList} />
      {isLoading ? (
        <DotLoading />
      ) : (
        <div className="home-stand-list">
          {(data || []).map((item) => (
            <div
              className="flex p-2 bg-white gap-[15px]"
              onClick={() => JumpToProjectPurchase(item.projectId)}
              key={item.projectId}
            >
              <Image
                className="shrink-0 aspect-square"
                height={94}
                src={item.projectImg}
                fit="contain"
                alt=""
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <h1 className="text-[14px] truncate">{item.projectName}</h1>
                <ProgressBar
                  percent={item.joinCnt/(item.joinCnt + item.readyCnt)* 100}
                  style={{
                    margin: "4px",
                    "--track-width": "2px",
                    "--fill-color": "#ff8d1a",
                  }}
                />
                <JoinList
                  readyCnt={item.readyCnt}
                  needCnt={item.needCnt}
                  joinCnt={item.joinCnt}
                />
                <div className="w-[82px] bg-[#ffc300] rounded text-white text-[12px] text-center ml-auto">
                  {i18next.t('立即抽奖')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
