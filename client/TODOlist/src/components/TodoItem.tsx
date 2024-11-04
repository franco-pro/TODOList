import { FunctionComponent } from "react";
import Select from "react-select";

type props = {
  label: string;
  value: boolean;
  onChange: FunctionComponent;
};

export const TodoList = ({ label, value, onChange }: props) => {
  const options = [
    { value: "important", label: "Pas important" },
    { value: "urgent", label: "Pas urgent" },
  ];
  return (
    <>
      <div className="container">
        <label>
          <input type="checkbox" checked={value} onChange={onChange} />
          {label}
        </label>

        <div className="selectDiv">
          <Select options={options} />
        </div>
      </div>
    </>
  );
};
