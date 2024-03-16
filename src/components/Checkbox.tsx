interface CheckboxProps {
  handler: (checked: boolean, name: string) => void;
  name: string;
}

const Checkbox = ({ handler, name }: CheckboxProps) => {
  return (
    <label className="checkbox-container">
      <input type="checkbox" onChange={(e) => handler(e.target.checked, name)} />
      <div className="checkmark"></div>
    </label>
  );
};

export default Checkbox;
