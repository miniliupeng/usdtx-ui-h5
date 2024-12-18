import { /* overlayContainerRef,  */ useEffect, useState } from "react";
import { ReactComponent as LanguageSwitchIcon } from "@/assets/svg/languageSwitch.svg";
import { ReactComponent as SelectedIcon } from "@/assets/svg/selected.svg";

import i18next from "@/config/i18next";
import { useTranslation, Trans } from "react-i18next";
import "./index.less";

export const LanguageSwitch = () => {
  let [visible, setVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const handleClick = () => {
    if (visible) {
      visible = false;
    } else {
      visible = true;
    }
    setVisible(visible);
  };
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language == "en" ? "cn" : "en");
    if (i18n.language == "cn") {
      window.localStorage.setItem("changeLanguage", "cn");
    }
    visible = !visible;
    setVisible(visible);
  };
  const changeLanguage1 = () => {
    i18n.changeLanguage(i18n.language == "en" ? "cn" : "en");
    if (i18n.language == "en") {
      window.localStorage.setItem("changeLanguage", "en");
    }
    visible = !visible;
    setVisible(visible);
  };


  return (
    <>
      <div className="language-switch-div">
        <LanguageSwitchIcon width={23} height={23} onClick={handleClick} />
        <div
          className="m-test"
          /* ref={overlayContainerRef} */ style={{
            display: `${visible ? "block" : "none"}`,
          }}
        >
          <div
            className={`${i18n.language == "cn" ? "selected" : ""} px-1`}
            onClick={changeLanguage}
          >
            {i18next.t("中文")}
            {i18n.language === "cn" && (
              <SelectedIcon className=" float-right" width={24} height={24} />
            )}
          </div>
          <div
            className={`${i18n.language == "en" ? "selected" : ""} px-1`}
            onClick={changeLanguage1}
            style={{ borderTop: 0 }}
          >
            English
            {i18n.language === "en" && (
              <SelectedIcon className=" float-right" width={24} height={24} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
