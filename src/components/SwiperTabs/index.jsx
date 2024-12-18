import { useRef, useState } from "react";
import { Tabs, Swiper } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
// import styles from './demo3.less'

export const SwiperTabs = ({
  defaultIndex = 0,
  items,
  className,
  tabStyle,
  bodyStyle,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const handleTabClick = (index) => {
    navigate(`${location.pathname}?activeIndex=${index}`)
    setActiveIndex(index)
  }
  return (
    <div className={className}>
      <Tabs
        activeKey={items[activeIndex].key}
        onChange={(key) => {
          const index = items.findIndex((item) => item.key === key);
          handleTabClick(index);
          swiperRef.current?.swipeTo(index);
        }}
        style={tabStyle}
      >
        {items.map((item) => (
          <Tabs.Tab title={item.title} key={item.key} />
        ))}
      </Tabs>
      <Swiper
        direction="horizontal"
        loop
        indicator={() => null}
        ref={swiperRef}
        defaultIndex={activeIndex}
        onIndexChange={(index) => {
          handleTabClick(index);
        }}
      >
        {items.map((item, index) => (
          <Swiper.Item key={index}>
            <div style={bodyStyle}>{item.content}</div>
          </Swiper.Item>
        ))}
      </Swiper>
    </div>
  );
};
