import FormCheckbox from "../formCheckbox";

export default function MultiCheckbox({ list, value, label, onSelect }) {
  return (
    <div>
      {list.map((item) => {
        const { _id } = item;

        return (
          <FormCheckbox
            key={_id}
            label={item[label]}
            item={item}
            onChange={(item) => onSelect(item)}
            isChecked={value === item[label]}
          />
        );
      })}
    </div>
  );
}
