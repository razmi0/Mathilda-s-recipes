import { MouseEvent, SVGProps } from "react";

type IconNames =
  | "menu"
  | "check"
  | "chevron-right"
  | "dot-filled"
  | "setting"
  | "copy"
  | "cross2"
  | "search"
  | "minus"
  | "plus"
  | "alphab-up"
  | "alphab-down"
  | "num-up"
  | "delete"
  | "ingredients"
  | "num-down";

export type IconProps = { name: IconNames } & IconNamedProps &
  (IconNamedProps["name"] extends "copy" ? { check?: boolean } : {});

const Icon = ({ name, ...rest }: IconProps) => {
  switch (name) {
    case "menu":
      return <MenuIcon {...rest} />;
    case "check":
      return <CheckIcon {...rest} />;
    case "chevron-right":
      return <ChevronRightIcon {...rest} />;
    case "dot-filled":
      return <DotFilledIcon {...rest} />;
    case "setting":
      return <SettingIcon {...rest} />;
    case "copy":
      return <Copy {...rest} />;
    case "cross2":
      return <Cross2Icon {...rest} />;
    case "search":
      return <Search {...rest} />;
    case "minus":
      return <MinusIcon {...rest} />;
    case "alphab-up":
      return <SortAscendingAlphabIcon {...rest} />;
    case "alphab-down":
      return <SortDescendingAlphabIcon {...rest} />;
    case "num-up":
      return <SortAscendingNumIcon {...rest} />;
    case "num-down":
      return <SortDescendingNumIcon {...rest} />;
    case "delete":
      return <Delete {...rest} />;
    case "ingredients":
      return <Ingredients {...rest} />;
    case "plus":
      return <Plus {...rest} />;

    default:
      return <></>;
  }
};

type IconNamedProps = SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: MouseEvent) => void;
  title?: string;
  check?: boolean;
  mirror?: boolean;
};

const defaultHeight = 24;

const Plus = ({ color = "currentColor", height, width, className = "", title, ...rest }: IconNamedProps) => {
  return (
    <svg
      width={width}
      height={height || width || defaultHeight}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {title && <title>{title}</title>}
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M4 12H20M12 4V20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      </g>
    </svg>
  );
};

const Ingredients = ({
  color = "currentColor",
  height,
  width,
  className = "",
  title,
  mirror = false,
  ...rest
}: IconNamedProps) => {
  return (
    <>
      <svg
        fill={color}
        width={width}
        height={height || width || defaultHeight}
        className={className}
        version="1.2"
        baseProfile="tiny"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-63 65 128 128"
        xmlSpace="preserve"
        {...rest}
        {...(mirror && { transform: "matrix(-1, 0, 0, 1, 0, 0)" })}
      >
        {title && <title>{title}</title>}
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M49.6,115.7c0,0-1.2,24.4-22.6,22.4C26.9,138.1,24.5,117.7,49.6,115.7 M32.5,147.5c2.9-2.7,6.6-4.4,10.9-4.4 c8.6,0,15.6,6.9,15.6,15.5c0,0.3,0,0.5,0,0.9l0,0c-0.2,3.4-1.3,7.6-3.8,12.7c0,0-4.4,8.3-7.8,12.2l-0.3,0.3 c-1.6,1.6-4.1,2.7-6.6,2.7c-3.2,0-5.9-1.5-7.7-4l0,0c-1.8,2.4-4.5,4-7.7,4c-2.6,0-4.9-1.1-6.7-2.7l-0.3-0.3 c-3.5-3.8-7.8-12.2-7.8-12.2c-2.5-5.2-3.6-9.3-3.8-12.7H6.3c0-0.3,0-0.5,0-0.9c0-8.6,6.9-15.5,15.6-15.5 C25.8,143,29.7,144.7,32.5,147.5 M-37.4,73.3h18.9v7h-18.9V73.3z M-50.9,123.9c0,2.3,3.2,4.8,5.7,1.9l6.9-9.1 c0.3-0.4,0.8-1.3,0.8-2.2V92.7c0-6-5.7-1.1-7.8,1.1l-4.8,6.1c-0.8,1-0.8,1.4-0.8,2V123.9z M-55.3,101.6c0-1.3,0.4-2.5,1.1-3.5 l8.5-10.7c2.4-3,5.1-2.6,5.1-2.6h21.8C-5.3,86-5.3,99-5.3,99v83.6c0,2.2-1.8,4-4,4h-41.9c-2.2,0-4-1.8-4-4L-55.3,101.6z"></path>
        </g>
      </svg>
    </>
  );
};

const Delete = ({ color = "currentColor", height, width, className = "", title, ...rest }: IconNamedProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
    >
      {title && <title>{title}</title>}
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M4 7H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path
          d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

const MinusIcon = ({ color = "inherit", height, width, className = "", title, ...rest }: IconNamedProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
    >
      {title && <title>{title}</title>}
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M6 12L18 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      </g>
    </svg>
  );
};

const SortAscendingAlphabIcon = ({
  color = "inherit",
  height,
  width,
  className = "",
  title,
  ...rest
}: IconNamedProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
    >
      {title && <title>{title}</title>}
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M7 3V21M7 3L11 7M7 3L3 7M15.5 3H20.5L15.5 10H20.5M16 20H20M15 21L18 14L21 21"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

const SortDescendingAlphabIcon = ({
  color = "inherit",
  height,
  width,
  className = "",
  title,
  ...rest
}: IconNamedProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
    >
      {title && <title>{title}</title>}
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M7 3V21M7 3L11 7M7 3L3 7M15.5 14H20.5L15.5 21H20.5M16 9H20M15 10L18 3L21 10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

const SortAscendingNumIcon = ({ color = "inherit", height, width, className = "", title, ...rest }: IconNamedProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
    >
      {title && <title>{title}</title>}
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M16.5 16L18.5 14V21M16.5 21H20.5M20.5 7L18 10M7 21V3M7 3L3 7M7 3L11 7M21 5.5C21 6.88071 19.8807 8 18.5 8C17.1193 8 16 6.88071 16 5.5C16 4.11929 17.1193 3 18.5 3C19.8807 3 21 4.11929 21 5.5Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

const SortDescendingNumIcon = ({
  color = "currentColor",
  height,
  width,
  className = "",
  title,
  ...rest
}: IconNamedProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
    >
      {title && <title>{title}</title>}
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M16.5 5L18.5 3V10M16.5 10H20.5M20.5 18L18 21M7 3V21M7 3L11 7M7 3L3 7M21 16.5C21 17.8807 19.8807 19 18.5 19C17.1193 19 16 17.8807 16 16.5C16 15.1193 17.1193 14 18.5 14C19.8807 14 21 15.1193 21 16.5Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

const Cross2Icon = ({ color = "inherit", height, width, className = "", title, ...rest }: IconNamedProps) => {
  return (
    <svg
      width={width}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <path
        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const Copy = ({
  color = "inherit",
  height,
  width,
  className = "",
  title,
  check = false,
  ...rest
}: IconNamedProps & { check?: boolean }) => {
  return (
    <svg
      width={width || defaultHeight}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {check && (
          <>
            <path
              d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z"
              fill={color}
            ></path>
            <path
              d="M11.1 8H6.9C3.4 8 2 9.4 2 12.9V17.1C2 20.6 3.4 22 6.9 22H11.1C14.6 22 16 20.6 16 17.1V12.9C16 9.4 14.6 8 11.1 8ZM12.29 13.65L8.58 17.36C8.44 17.5 8.26 17.57 8.07 17.57C7.88 17.57 7.7 17.5 7.56 17.36L5.7 15.5C5.42 15.22 5.42 14.77 5.7 14.49C5.98 14.21 6.43 14.21 6.71 14.49L8.06 15.84L11.27 12.63C11.55 12.35 12 12.35 12.28 12.63C12.56 12.91 12.57 13.37 12.29 13.65Z"
              fill={color}
            ></path>
          </>
        )}
        {!check && (
          <>
            <path
              d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
              fill={color}
            ></path>
            <path
              d="M17.0998 2H12.8998C9.81668 2 8.37074 3.09409 8.06951 5.73901C8.00649 6.29235 8.46476 6.75 9.02167 6.75H11.0998C15.2998 6.75 17.2498 8.7 17.2498 12.9V14.9781C17.2498 15.535 17.7074 15.9933 18.2608 15.9303C20.9057 15.629 21.9998 14.1831 21.9998 11.1V6.9C21.9998 3.4 20.5998 2 17.0998 2Z"
              fill={color}
            ></path>
          </>
        )}
      </g>
    </svg>
  );
};

const CheckIcon = ({ color = "inherit", height, width, className = "", title, ...rest }: IconNamedProps) => {
  return (
    <svg
      width={width}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <path
        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const ChevronRightIcon = ({ color = "inherit", height, width, className = "", title, ...rest }: IconNamedProps) => {
  return (
    <svg
      width={width}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <path
        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const DotFilledIcon = ({ color = "inherit", height, width, className = "", title, ...rest }: IconNamedProps) => {
  return (
    <svg
      width={width}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <path
        d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
        fill={color}
      ></path>
    </svg>
  );
};

const SettingIcon = ({ color = "inherit", height, width, className = "", title, ...rest }: IconNamedProps) => {
  return (
    <svg
      width={width}
      height={height || width || defaultHeight}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608C20.4261 13.0639 20.1197 12.558 20.1197 11.9999C20.1197 11.4418 20.4261 10.9361 20.9022 10.6392C21.2263 10.4371 21.435 10.2757 21.5836 10.0835C21.9089 9.66273 22.0525 9.13087 21.9828 8.60497C21.9304 8.21055 21.6957 7.80703 21.2262 7C20.7567 6.19297 20.522 5.78945 20.2039 5.54727C19.7799 5.22436 19.244 5.08185 18.7141 5.15109C18.4722 5.18269 18.2269 5.28136 17.8887 5.4588C17.3915 5.71959 16.7969 5.73002 16.3099 5.45096C15.8229 5.17191 15.5347 4.65566 15.5136 4.09794C15.4993 3.71848 15.4628 3.45833 15.3694 3.23463C15.1649 2.74458 14.7726 2.35523 14.2788 2.15224ZM12.5 15C14.1695 15 15.5228 13.6569 15.5228 12C15.5228 10.3431 14.1695 9 12.5 9C10.8305 9 9.47716 10.3431 9.47716 12C9.47716 13.6569 10.8305 15 12.5 15Z"
          fill={color}
        ></path>
      </g>
    </svg>
  );
};

const MenuIcon = ({ title, color = "inherit", height, width, className = "", ...rest }: IconNamedProps) => {
  return (
    <svg
      width={width || defaultHeight}
      height={height || width || defaultHeight}
      className={className}
      {...rest}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
    </svg>
  );
};

const Search = ({ title, color = "inherit", height, width, className = "", ...rest }: IconNamedProps) => {
  return (
    <svg
      width={width || defaultHeight}
      height={height || width || defaultHeight}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      className={className}
      {...rest}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};

type CircleIconProps = {
  width?: number;
  color?: string;
};

export const CircleIcon = ({ width = 20, color = "#FFF" }: CircleIconProps) => {
  return (
    <svg width={width} height={width} className="rounded-full mr-1 border border-black/40 shadow-2xl">
      <circle cx="50%" cy="50%" r={width / 2} fill={color} />
    </svg>
  );
};

export default Icon;
