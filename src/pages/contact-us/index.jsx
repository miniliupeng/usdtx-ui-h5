import { DetailPage } from "@/components";
import { Divider } from "antd-mobile";
import i18next from "@/config/i18next";
import { Service } from "../faq/Service";

const ContactUs = () => {
  return (
    <DetailPage backPath={"/user"} title={`${i18next.t("联系客服")}`}>
      <div className="p-1 bg-white rounded">
        <div className="px-2 py-1 text-[14px] text-[#505050]">
          {`${i18next.t("尊敬的用户您好：如若您遇到问题请联系以下客服电话")}`}
        </div>
        <Divider direction="horizontal" style={{ margin: "0 0 8px" }} />
        <div className="px-2">
          <Service />
        </div>
      </div>
    </DetailPage>
  );
};

export default ContactUs;
