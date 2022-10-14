import FormCheckbox from "../formCheckbox";

export default function MultiCheckbox({ list, value, name, onSelect }) {
  return (
    <div>
      {list.map((item) => {
        const { FullName, _id } = item;

        return (
          <FormCheckbox
            key={_id}
            label={FullName}
            item={item}
            onChange={(item) => onSelect(item)}
            isChecked={value === item[name]}
          />
        );
      })}
    </div>
  );
}
