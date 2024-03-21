import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useRef, useState } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  onClick?: () => void | ((e: MouseEvent<HTMLButtonElement>) => void) | ((e: MouseEvent) => void);
  ariaLabel: string;
  loading?: boolean;
  loader?: ReactNode;
  disabled?: boolean;
  className?: string;
  disabledIfLoading?: boolean;
  variant?: "primary" | "invisible";
};

const variantClasses = {
  primary:
    "relative flex gap-2 py-1 px-3 whitespace-nowrap rounded-md text-sm border-black/30 border-[1px] font-medium transition-colors ease-out shadow-inner-shadow-dark-sm bg-def-300 hover:bg-def-400 ",
  invisible: "h-fit w-fit p-0 m-0 border-0 bg-transparent text-transparent hover:text-transparent hover:bg-transparent",
};

const Button = ({
  children,
  onClick,
  loader = <></>,
  loading = false,
  disabled = false,
  disabledIfLoading = true,
  ariaLabel,
  className = "",
  variant = "primary",
  type = "button",
  ...rest
}: ButtonProps) => {
  const [waves, setWaves] = useState<ReactNode[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
    if (!btnRef.current) return;
    setWaves((waves) => [...waves, <Wave width={btnRef.current?.offsetWidth} height={btnRef.current?.offsetHeight} />]);
    setTimeout(() => {
      setWaves((waves) => waves.slice(1));
    }, 2100);
  };

  const disabledClasses =
    disabledIfLoading && loading
      ? "cursor-wait text-def-300 bg-transparent hover:bg-transparent"
      : disabled
      ? "cursor-not-allowed"
      : "cursor-pointer";

  return (
    <button
      {...rest}
      onClick={clickHandler}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      aria-disabled={disabled}
      className={`${disabledClasses} ${variantClasses[variant]} ${className}`}
      ref={btnRef}
    >
      {children}
      {loading && loader}
      {variant !== "invisible" &&
        waves.map((wave, i) => (
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
  setTimeout(() => setActive(true), 10);
  return (
    <div
      className={`button-wave wave-motion-appear wave-motion rounded-md ${active ? "wave-motion-appear-active" : ""}`}
      style={{ left: "-1px", top: "-1px", width: width || 0 + "px", height: height || 0 + "px" }}
    />
  );
};

export default Button;
