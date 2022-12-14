import FormCheckbox from "../formCheckbox";
import { ItemType } from "src/components/formCheckbox/formCheckbox";

type MultiCheckboxProps = {
  list: ItemType[];
  values: string;
  onSelect: (value: ItemType) => void;
};

export default function MultiCheckbox({
  list,
  values,
  onSelect,
}: MultiCheckboxProps) {
  return (
    <div>
      {list.map((item: ItemType) => {
        const arr = values.split(",");
        const isChecked = arr.includes(item.name);
        return (
          <FormCheckbox
            isChecked={isChecked}
            key={item._id}
            item={item.name}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}
