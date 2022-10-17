import classNames from "classnames";
import "./list.scss";

export default function List({ data, isSuccess, isLoosers }) {
  return (
    <ul className="list">
      {data.map((item, i) => {
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
