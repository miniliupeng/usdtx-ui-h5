import { Swiper } from "@/components";
import { useQueryNoticeBanner } from "@/hooks/reuqest";

export const Banner = () => {
  const { data: noticeBanner } = useQueryNoticeBanner();
  const imgArr = noticeBanner?.map((item) => item.msgFile) || ["/404"];
  return <Swiper items={imgArr} />;
};
