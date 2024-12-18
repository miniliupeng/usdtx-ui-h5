import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import homeEn from "./home/en.json";
import homeZh from "./home/zh.json";

import userEn from "./user/en.json";
import userZh from "./user/zh.json";
const nextLocal = {
  en: { ...homeEn, ...userEn },
  zh: { ...homeZh, ...userZh },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: nextLocal.en,
      },
      zh: {
        translation: nextLocal.zh,
      },
    },
    lng: "zh", // 默认语言
    fallbackLng: "zh", // 如果当前语言没有对应的翻译，将使用该语言作为备用
    interpolation: {
      escapeValue: false, // 不要对翻译的文本进行转义，以支持 HTML 标签
    },
  });
