type IconNames = "menu" | "check" | "chevron-right" | "dot-filled";

type IconNamedProps = {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
};

const defaultHeight = 24;

const CheckIcon = ({ color = "inherit", height, width, className = "" }: IconNamedProps) => {
  return (
    <svg
      width={width}
      height={height || width || defaultHeight}
      className={className}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const ChevronRightIcon = ({ color = "inherit", height, width, className = "" }: IconNamedProps) => {
  return (
    <svg
      width={width}
      height={height || width || defaultHeight}
      className={className}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const DotFilledIcon = ({ color = "inherit", height, width, className = "" }: IconNamedProps) => {
  return (
    <svg
      width={width}
      height={height || width || defaultHeight}
      className={className}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
        fill={color}
      ></path>
    </svg>
  );
};

const MenuIcon = ({ color = "inherit", height, width, className = "" }: IconNamedProps) => {
  return (
    <svg
      width={width || defaultHeight}
      height={height || width || defaultHeight}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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

type IconProps = IconNamedProps & { name: IconNames };

const Icon = ({ name, ...rest }: IconProps) => {
  switch (name) {
    case "menu":
      return <MenuIcon {...rest} />;
    case "check":
      return <CheckIcon {...rest} />;
    case "chevron-right":
      return <ChevronRightIcon {...rest} />;
    default:
      return <></>;
  }
};

export default Icon;
