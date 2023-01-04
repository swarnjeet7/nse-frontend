import _ from "lodash";
import FormCheckbox from "../formCheckbox";
import { ItemType } from "src/components/formCheckbox/formCheckbox";

type SingleCheckboxProps = {
  list: ItemType[];
  value: string;
  onSelect: (value: ItemType) => void;
};

export default function SingleCheckbox({
  list,
  value,
  onSelect,
}: SingleCheckboxProps) {
  return (
    <div>
      {list.map((item) => {
        return (
          <FormCheckbox
            key={item._id}
            isChecked={value === item.Portfolio || value === item.UserName}
            item={item}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}
