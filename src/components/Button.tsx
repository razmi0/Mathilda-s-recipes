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

  console.log(loading);

  const btnClasses = `relative cursor-pointer py-1 px-3 whitespace-nowrap rounded-md text-sm border-black/30 border-[1px] font-medium transition-colors ease-out shadow-inner-shadow-dark-sm bg-def-300 hover:bg-def-400 ${classNames}`;

  return (
    <button
      onClick={clickHandler}
      disabled={disabled}
      aria-disabled={disabled}
      type="button"
      className={`${
        disabledIfLoading && loading ? "cursor-not-allowed text-def-300 bg-transparent" : " cursor-pointer"
      } ${btnClasses} ${classNames}`}
      ref={btnRef}
    >
      {loading && loader}
      {waves.map((wave, i) => (
        <div key={i} className="absolute left-0 top-0">
          {wave}
        </div>
      ))}
      {!loading && children}
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

// type SimpleButtonProps = {
//   handler: () => void;
//   children: JSXElement;
//   class?: string;
// };
// export const SimpleButton = (props: SimpleButtonProps) => {
//   const [btnSize, setBtnSize] = createStore<{ width: number; height: number }>({ width: 0, height: 0 });
//   const [waves, setWaves] = createStore({
//     list: [] as (() => JSXElement)[],
//   });

//   const clickHandler = () => {
//     props.handler();
//     setWaves(
//       "list",
//       produce((waves) => waves.push(() => <Wave />))
//     );
//     setTimeout(() => {
//       setWaves(
//         "list",
//         produce((waves) => waves.shift())
//       );
//     }, 2100);
//   };

//   let btn: HTMLButtonElement;
//   createEffect(() => {
//     if (btn) {
//       setBtnSize("width", btn.offsetWidth);
//       setBtnSize("height", btn.offsetHeight);
//     }
//   });

//   const Wave = () => {
//     const [active, setActive] = createSignal(false);

//     onMount(() => {
//       setTimeout(() => setActive(true), 100);
//     });

//     return (
//       <div class="absolute left-0 top-0">
//         <div
//           classList={{
//             ["wave-motion-appear-active"]: active(),
//           }}
//           class={`conway-wave wave-motion-appear wave-motion rounded-md`}
//           style={{ left: "-1px", top: "-1px", width: `${btnSize.width}px`, height: `${btnSize.height}px` }}
//         />
//       </div>
//     );
//   };

//   return (
//     <>
//       <button
//         onClick={clickHandler}
//         class={`relative cursor-pointer py-1 px-3 whitespace-nowrap rounded-md text-sm border-black/30 border-[1px] font-medium transition-colors ease-out shadow-inner-shadow-dark-sm bg-dw-300 hover:bg-dw-400  ${props.class || ""}`} // prettier-ignore
//         ref={(el) => (btn = el)}
//       >
//         <For each={waves.list}>{(wave) => wave()}</For>
//         {props.children}
//       </button>
//     </>
//   );
// };
