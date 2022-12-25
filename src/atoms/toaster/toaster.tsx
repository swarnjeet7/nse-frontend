import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import "./toaster.scss";

export type ToasterTypes = "error" | "success" | "warning" | "info";

type ToasterProps = {
  type: ToasterTypes;
  message: string;
  onHide: (value: string) => void;
  className?: string;
  delay?: number;
};

export default function Toaster({
  type,
  className = "",
  message,
  delay = 3000,
  onHide,
}: ToasterProps) {
  const timeoutRef = useRef<number>(-1);
  const toasterRef = useRef(null);
  const dynamicClass = `toaster--${type}`;
  const classes: string = classNames("toaster", className, {
    [dynamicClass]: type,
  });

  useEffect(() => {
    function setTimer() {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = Number(
        setTimeout(function () {
          (toasterRef.current as unknown as HTMLElement)?.classList?.remove(
            "toaster--active"
          );
          timeoutRef.current = -1;
          const clearTime = setTimeout(() => {
            onHide("");
            clearTimeout(clearTime);
          }, 100);
        }, delay)
      );
    }

    (toasterRef.current as unknown as HTMLElement)?.classList?.add(
      "toaster--active"
    );
    setTimer();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [timeoutRef, delay, onHide]);

  function handleHide() {
    clearTimeout(timeoutRef.current);
    (toasterRef.current as unknown as HTMLElement).classList.remove(
      "toaster--active"
    );
    const clearTime = setTimeout(() => {
      onHide("");
      clearTimeout(clearTime);
    }, 100);
  }

  function getHtml() {
    return (
      <div className={classes} ref={toasterRef}>
        <div className="toaster__body">
          <span className="toaster__icon"></span>
          <span>{message}</span>
        </div>
        <div className="toaster__action" onClick={handleHide}>
          <button className="toaster__close">✕</button>
        </div>
      </div>
    );
  }

  const portal = document.getElementById("toaster");

  return <>{portal ? ReactDOM.createPortal(getHtml(), portal) : null}</>;
}
