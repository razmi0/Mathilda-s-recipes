import "../styles/checkbox.css";

interface CheckboxProps {
  handler: (checked: boolean, ingredients: string[], name: string) => void;
  ingredients: string[];
  name: string;
}

const Checkbox = ({ handler, ingredients, name }: CheckboxProps) => {
  return (
    <label className="container">
      <input
        type="checkbox"
        onChange={(e) => handler(e.target.checked, ingredients, name)}
      />
      <div className="checkmark"></div>
    </label>
  );
};

export default Checkbox;
