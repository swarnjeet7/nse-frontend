import classNames from "classnames";
import "./list.scss";

interface Item {
  id: string;
  name: string;
  gain: string;
}

interface ListProps {
  data: Array<Item>;
  isSuccess?: boolean;
  isLoosers?: boolean;
}

export default function List({ data, isSuccess, isLoosers }: ListProps) {
  return (
    <ul className="list">
      {data.map((item: Item, i: number) => {
        const id = item.id || `list-${i}`;
        const classes = classNames("", "", {
          "text-success": isSuccess,
          "text-danger": isLoosers,
        });
        return (
          <li key={id} className="list-item">
            <span>{item.name}</span>
            <span className={classes}>
              <strong>{item.gain}%</strong>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
