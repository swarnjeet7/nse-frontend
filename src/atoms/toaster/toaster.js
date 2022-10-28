import { useRef, useEffect } from "react";
import classNames from "classnames";
import "./toaster.scss";

export default function Toaster({
  type,
  className,
  message,
  delay = 3000,
  onHide,
}) {
  const timer = useRef(null);
  const toasterRef = useRef(null);
  const dynamicClass = `toaster--${type}`;
  const classes = classNames("toaster", className, {
    [dynamicClass]: type,
  });

  useEffect(() => {
    function setTimer() {
      if (timer.current != null) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(function () {
        toasterRef.current?.classList?.remove("toaster--active");
        timer.current = null;
        const clearTime = setTimeout(() => {
          onHide(null);
          clearTimeout(clearTime);
        }, 100);
      }, delay);
    }

    toasterRef.current?.classList?.add("toaster--active");
    setTimer();
    return () => {
      clearTimeout(timer.current);
    };
  }, [timer, delay, onHide]);

  function handleHide() {
    clearTimeout(timer.current);
    toasterRef.current.classList.remove("toaster--active");
    const clearTime = setTimeout(() => {
      onHide(null);
      clearTimeout(clearTime);
    }, 100);
  }

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
