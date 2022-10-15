import _ from "lodash";
import FormCheckbox from "../formCheckbox";

export default function MultiCheckbox({
  list,
  value,
  label,
  onSelect,
  Multiple,
}) {
  return (
    <div>
      {list.map((item, i) => {
        const { _id = "checkbox" + i } = item;
        let isChecked = value === item[label];

        if (Multiple && !_.isEmpty(value)) {
          isChecked = value.some((obj) => {
            return obj[label] === item[label];
          });
        }

        return (
          <FormCheckbox
            key={_id}
            label={item[label]}
            item={item}
            onChange={(item) => onSelect(item)}
            isChecked={isChecked}
          />
        );
      })}
    </div>
  );
}
