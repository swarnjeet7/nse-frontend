import Badge from "./badge";
import "./badge.scss";

export default function BadgeList({ list }) {
  return (
    <ul className="badge-list">
      {list.map((badge) => (
        <Badge key={badge}>{badge}</Badge>
      ))}
    </ul>
  );
}
