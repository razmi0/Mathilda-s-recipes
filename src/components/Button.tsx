import { ReactNode, useRef, useState } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  loading?: boolean;
  loader?: ReactNode;
  classNames?: string;
  disabled?: boolean;
  disabledIfLoading?: boolean;
};

const Button = ({
  children,
  onClick,
  loader = <></>,
  loading = false,
  classNames = "",
  disabled = false,
  disabledIfLoading = true,
}: ButtonProps) => {
  const [waves, setWaves] = useState<ReactNode[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const clickHandler = () => {
    onClick();
    if (!btnRef.current) return;
    setWaves((waves) => [...waves, <Wave width={btnRef.current?.offsetWidth} height={btnRef.current?.offsetHeight} />]);
    setTimeout(() => {
      setWaves((waves) => waves.slice(1));
    }, 2100);
  };

  const btnClasses = `relative flex gap-2 py-1 px-3 whitespace-nowrap rounded-md text-sm border-black/30 border-[1px] font-medium transition-colors ease-out shadow-inner-shadow-dark-sm bg-def-300 hover:bg-def-400  ${classNames}`;

  return (
    <button
      onClick={clickHandler}
      disabled={disabled}
      aria-disabled={disabled}
      type="button"
      className={`${
        disabledIfLoading && loading
          ? "cursor-wait text-def-300 bg-transparent hover:bg-transparent"
          : disabled
          ? "cursor-not-allowed"
          : "cursor-pointer"
      } ${btnClasses} ${classNames}`}
      ref={btnRef}
    >
      {children}
      {loading && loader}
      {waves.map((wave, i) => (
        <div key={i} className="absolute left-0 top-0">
          {wave}
        </div>
      ))}
    </button>
  );
};

type WaveProps = {
  height?: number;
  width?: number;
};

const Wave = ({ width, height }: WaveProps) => {
  const [active, setActive] = useState(false);
  setTimeout(() => setActive(true), 100);
  return (
    <div
      className={`button-wave wave-motion-appear wave-motion rounded-md ${active ? "wave-motion-appear-active" : ""}`}
      style={{ left: "-1px", top: "-1px", width: width || 0 + "px", height: height || 0 + "px" }}
    />
  );
};

export default Button;
