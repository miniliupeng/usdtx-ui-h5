import { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { DotLoading } from "antd-mobile";
import AppLayout from "@/layout";
// import AuthRoute from './AuthRoute';
// 首页
const Home = lazy(() => import("@/pages/home"));
// 新闻列表
const Notice = lazy(() => import("@/pages/notice"));
// 新闻详情
const NoticeDetail = lazy(() => import("@/pages/notice-detail"));
// 项目列表
const ProductList = lazy(() => import("@/pages/product-list"));
// 购买项目
const ProductPurchase = lazy(() => import("@/pages/product-purchase"));
// 购买结果
const PurchaseResult = lazy(() => import("@/pages/purchase-result"));
// 已揭晓项目
const ProductLatest = lazy(() => import("@/pages/product-latest"));
// 参与详情
const JoinRecord = lazy(() => import("@/pages/join-record"));

//订单
const Order = lazy(() => import("@/pages/order"));
//提现
const Withdraw = lazy(() => import("@/pages/withdraw"));
//提现结果
const WithdrawResult = lazy(() => import("@/pages/withdraw-result"));
//提现记录
const WithdrawRecord = lazy(() => import("@/pages/withdraw-record"));

// 我的
const User = lazy(() => import("@/pages/user"));
// 密码设置
const Setting = lazy(() => import("@/pages/setting"));
// 密码设置结果
const SettingResult = lazy(() => import("@/pages/setting-result"));
// 充值
const Recharge = lazy(() => import("@/pages/recharge"));
// 充值结果
const RechargeResult = lazy(() => import("@/pages/recharge-result"));
// 账户明细
const AccountDetails = lazy(() => import("@/pages/account-details"));
// 常见问题
const Faq = lazy(() => import("@/pages/faq"));
// 联系客服
const ContactUs = lazy(() => import("@/pages/contact-us"));

const PurchaseRecord = lazy(() => import("@/pages/purchase-record"));

const Login = lazy(() => import("@/pages/login"));
const Error = lazy(() => import("@/pages/error"));

// 路由懒加载的封装
const LazyLoad = (module: ReturnType<typeof lazy>) => {
  const Com = module;
  return (
    <Suspense fallback={<DotLoading />}>
      <Com />
    </Suspense>
  );
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      // <AuthRoute>
      <AppLayout />
      // </AuthRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: LazyLoad(Home),
      },
      {
        path: "notice",
        element: LazyLoad(Notice),
      },
      {
        path: "notice-detail/:id",
        element: LazyLoad(NoticeDetail),
      },
      {
        path: "product-list",
        element: LazyLoad(ProductList),
      },
      {
        path: "product-purchase/:id",
        element: LazyLoad(ProductPurchase),
      },
      {
        path: "product-latest/:id",
        element: LazyLoad(ProductLatest),
      },
      {
        path: "purchase-result",
        element: LazyLoad(PurchaseResult),
      },
      {
        path: "join-record/:id",
        element: LazyLoad(JoinRecord),
      },
      {
        path: "order",
        element: LazyLoad(Order),
      },
      {
        path: "withdraw",
        element: LazyLoad(Withdraw),
      },
      {
        path: "withdraw-result",
        element: LazyLoad(WithdrawResult),
      },

      {
        path: "withdraw-record",
        element: LazyLoad(WithdrawRecord),
      },
      {
        path: "user",
        element: LazyLoad(User),
      },
      {
        path: "setting",
        element: LazyLoad(Setting),
      },
      {
        path: "setting-result",
        element: LazyLoad(SettingResult),
      },

      {
        path: "recharge",
        element: LazyLoad(Recharge),
      },
      {
        path: "recharge-result",
        element: LazyLoad(RechargeResult),
      },

      {
        path: "account-details",
        element: LazyLoad(AccountDetails),
      },
      {
        path: "faq",
        element: LazyLoad(Faq),
      },
      {
        path: "contact-us",
        element: LazyLoad(ContactUs),
      },
      {
        path: "purchase-record",
        element: LazyLoad(PurchaseRecord),
      },
    ],
  },
  {
    path: "/login",
    element: LazyLoad(Login),
  },
  {
    path: "/error",
    element: LazyLoad(Error),
  },
  {
    path: "*",
    element: <Navigate to="/error" />,
  },
];
