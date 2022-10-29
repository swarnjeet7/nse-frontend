import _ from "lodash";
import FormCheckbox from "../formCheckbox";

interface MultiCheckboxProps {
  list: Array<any>;
  value: string | Array<any>;
  label: string;
  onSelect: (item: boolean | string) => void;
  Multiple?: boolean;
}

export default function MultiCheckbox({
  list,
  value,
  label,
  onSelect,
  Multiple,
}: MultiCheckboxProps) {
  return (
    <div>
      {list.map((item, i) => {
        const { _id = "checkbox" + i } = item;
        let isChecked = value === item[label];

        if (Multiple && !_.isEmpty(value)) {
          const arr = [...value];
          isChecked = arr.some((obj: any) => {
            return obj[label] === item[label];
          });
        }

        return (
          <FormCheckbox
            key={_id}
            label={item[label]}
            item={item}
            onChange={(item: boolean | string) => onSelect(item)}
            isChecked={isChecked}
          />
        );
      })}
    </div>
  );
}
