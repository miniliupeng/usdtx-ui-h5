import { TabBar } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as HomeIcon } from "@/assets/svg/home.svg";
import { ReactComponent as OrderIcon } from "@/assets/svg/order.svg";
import { ReactComponent as UserIcon } from "@/assets/svg/user.svg";
import i18next from '@/config/i18next'
import { useTranslation, Trans } from 'react-i18next';

export const NavBar = () => {
  const { t, i18n } = useTranslation()
  let tabs = [
    {
      key: "/home",
      title: i18next.t("首页"),
      icon: <HomeIcon width={23} height={23} />,
    },
    {
      key: "/order",
      title: i18next.t("订单"),
      icon: <OrderIcon width={23} height={23} />,
    },
    {
      key: "/user",
      title: i18next.t("我的"),
      icon: <UserIcon width={23} height={23} />,
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value) => {
    navigate(value);
  };
  const showNavBar = tabs.some((item) => item.key === pathname);
  return (
    <>
      {showNavBar && (
        <TabBar
          activeKey={pathname}
          onChange={(value) => setRouteActive(value)}
          className="border-t border-[--adm-color-border]"
          style={{
            "--adm-font-size-2": "12px",
            "--adm-color-primary": "#000000",
            "--adm-color-text-secondary": "#aaaaaa",
          }}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      )}
    </>
  );
};
