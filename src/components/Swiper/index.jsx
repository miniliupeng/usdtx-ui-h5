import { Swiper as AntSwiper, Image } from "antd-mobile";
export const Swiper = ({ items, height = 197, className = '' }) => {
  return (
    <AntSwiper
      loop
      autoplay
      indicatorProps={{
        style: {
          "--dot-color": "#BBBBBB",
          "--active-dot-color": "#333333",
          "--dot-size": "7px",
          "--active-dot-size": "7px",
          "--dot-border-radius": "50%",
          "--active-dot-border-radius": "50%",
          "--dot-spacing": "8px",
        },
      }}
    >
      {items.map((item, index) => (
        <AntSwiper.Item key={index}>
          <Image src={item} className={className} height={height}  />
        </AntSwiper.Item>
      ))}
    </AntSwiper>
  );
};
