import classNames from "classnames";
import "./dialog.scss";

export const dialogSizes = {
  SMALL: 300,
  MEDIUM: 400,
  LARGE: 500,
  HUGE: 700,
};

export default function Dialog({
  children,
  showUnderlay = true,
  className,
  size,
  onHide,
}) {
  const classes = classNames("dialog", className, {
    "dialog-overlay": showUnderlay,
  });
  return (
    <div className={classes}>
      <div className="dialog-body" style={{ width: size }}>
        <button className="dialog-close" onClick={onHide}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
