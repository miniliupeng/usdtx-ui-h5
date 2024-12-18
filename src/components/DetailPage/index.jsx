import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { ReactComponent as IconBack } from "@/assets/svg/arrow-back.svg";

export const DetailPage = ({
  className,
  backPath,
  title,
  children,
  bodyStyle,
  backArrow = <IconBack className="mt-[-5px]" width={21} height={21} />,
  extra,
}) => {
  const navigate = useNavigate();
  const back = () => {
    navigate(backPath || -1);
  };
  return (
    <section className={`flex flex-col h-full ${className}`}>
      <NavBar
        backArrow={backArrow}
        className="bg-[#fff]"
        onBack={back}
        right={extra}
      >
        <h1 className="text-[15px] text-[#505050]">{title}</h1>
      </NavBar>
      <div className="p-1 flex-1 overflow-y-auto" style={bodyStyle}>
        {children}
      </div>
    </section>
  );
};
