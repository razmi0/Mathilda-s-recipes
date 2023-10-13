interface CheckboxProps {
  handler: (checked: boolean, ingredients: string[]) => void;
  ingredients: string[];
}

const Checkbox = ({ handler, ingredients }: CheckboxProps) => {
  return (
    <label className="container">
      <input
        type="checkbox"
        onChange={(e) => handler(e.target.checked, ingredients)}
      />
      <div className="checkmark"></div>
    </label>
  );
};

export default Checkbox;
