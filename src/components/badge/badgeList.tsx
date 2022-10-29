import Badge from "./badge";
import "./badge.scss";

interface BadgeListProps {
  list: Array<string>;
}

export default function BadgeList({ list }: BadgeListProps) {
  return (
    <ul className="badge-list">
      {list.map((badge) => (
        <Badge key={badge}>{badge}</Badge>
      ))}
    </ul>
  );
}
