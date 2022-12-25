import Badge from "./badge";
import "./badge.scss";

interface BadgeListProps {
  list: Array<string>;
  isClickAble: boolean;
}

export default function BadgeList({ list, isClickAble }: BadgeListProps) {
  return (
    <ul className="badge-list">
      {list.map((badge) => (
        <Badge key={badge} isClickAble={isClickAble}>
          {badge}
        </Badge>
      ))}
    </ul>
  );
}
