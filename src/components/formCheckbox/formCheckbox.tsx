import classNames from "classnames";

export type PortfolioType = {
  _id: string | number;
  Portfolio: string;
  FullName: string;
  Address: string;
  UpdatedAt: string;
  CreatedAt: string;
  __v: number | string;
};

export type SymbolType = {
  name: string;
  _id: string | number;
  __v: number | string;
};

export type ItemType = any;

type FormCheckboxProps = {
  item: ItemType;
  isChecked: boolean;
  onSelect: (value: ItemType) => void;
  className?: string;
};

export default function FormCheckbox({
  className,
  onSelect,
  isChecked,
  item,
}: FormCheckboxProps) {
  const classes = classNames("form-checkbox", className, {
    "form-checkbox--checked": isChecked,
  });

  function handleClick() {
    onSelect(item);
  }

  return (
    <div>
      <label className={classes}>
        <input
          type="checkbox"
          defaultChecked={isChecked}
          onChange={handleClick}
        />

        <span className="checkbox">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#5e2327"
          >
            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
          </svg>
        </span>

        <span className="text-capitalize">
          {item?.Portfolio || item?.name || item}
        </span>
      </label>
    </div>
  );
}
