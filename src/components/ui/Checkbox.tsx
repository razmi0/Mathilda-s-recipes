import { forwardRef, type InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  htmlFor?: string;
  checked?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ htmlFor, children, checked, ...props }, ref) => {
  return (
    <div className="checkbox-ctn">
      <label className="checkbox-container" htmlFor={htmlFor}>
        <span className="sr-only">{children}</span>
        <input id={htmlFor} type="checkbox" ref={ref} checked={checked} aria-checked={checked} {...props} />
        <div className="checkmark"></div>
      </label>
    </div>
  );
});

export default Checkbox;
