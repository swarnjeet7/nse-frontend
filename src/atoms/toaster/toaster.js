import { useRef, useEffect } from "react";
import classNames from "classnames";
import "./toaster.scss";

export default function Toaster({ type, className, message, delay = 3000 }) {
  let timer = null;
  const toasterRef = useRef(null);
  const dynamicClass = `toaster--${type}`;
  const classes = classNames("toaster", className, {
    [dynamicClass]: type,
  });

  function setTimer() {
    if (timer != null) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      toasterRef.current.classList.remove("toaster--active");
      timer = null;
    }, delay);
  }

  useEffect(() => {
    toasterRef.current.classList.add("toaster--active");
    setTimer();
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function handleHide() {
    toasterRef.current.classList.remove("toaster--active");
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
