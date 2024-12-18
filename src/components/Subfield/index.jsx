import { ReactComponent as ArrowIcon } from "@/assets/svg/arrow-1.svg";
import i18next from '../../config/i18next'

export const Subfield = ({
  Icon,
  title,
  description,
  extra = `${i18next.t("查看更多")}`,
  onClick,
  className = ''
}) => {
  return (
    <div className={`flex align-middle text-[14px] p-[10px] ${className}`}>
      {Icon && <Icon className=" flex-shrink-0" width={21} height={21} />}
      <h1 className="ml-0.5 text-[#505050] italic font-bold  flex-shrink-0">{title}</h1>
      <div className="ml-1 flex-1 min-w-0">{description}</div>
      <div className="ml-auto flex flex-shrink-0" onClick={onClick}>
        <div className=" text-[#9d9d9d]">{extra}</div>
        <ArrowIcon width={21} height={21} fill="#999999" />
      </div>
    </div>
  );
};
