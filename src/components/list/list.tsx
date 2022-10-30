import classNames from "classnames";
import "./list.scss";

interface Item {
  Close: number;
  High: number;
  ISIN: string;
  Last: number;
  Low: number;
  Open: number;
  PrevClose: number;
  Profit: number;
  Series: string;
  Symbol: string;
  Timestamp: string;
  TotalTradeQuantity: number;
  TotalTradeValue: number;
  TotalTrades: number;
  __v: number;
  _id: string;
}

interface ListProps {
  data: Array<Item>;
  isSuccess?: boolean;
  isLoosers?: boolean;
}

export default function List({ data, isSuccess, isLoosers }: ListProps) {
  return (
    <ul className="list">
      {data.map((item: Item) => {
        const classes = classNames("", "", {
          "text-success": isSuccess,
          "text-danger": isLoosers,
        });

        return (
          <li key={item._id} className="list-item">
            <span>{item.Symbol}</span>
            <span className={classes}>
              <strong>{Number(item.Profit).toFixed(2)}%</strong>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
