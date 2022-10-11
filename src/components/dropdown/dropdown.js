import { useRef } from "react";
import classnames from "classnames";
import "./dropdown.scss";

const USER = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
  </svg>
);

function Dropdown(props) {
  const { children, title, id, isProfile } = props;
  const href = "#";
  const dropdownRef = useRef(null);
  const togglerRef = useRef(null);
  const menuRef = useRef(null);

  function handleToggle(event) {
    event.preventDefault();
    const toggler = togglerRef.current;
    toggler.classList.toggle("dropdown__toggle--active");
    const menu = menuRef.current;
    const isShowing = menu.classList.contains("dropdown__menu--show");
    menu.style.height = isShowing ? `0px` : `${menu.scrollHeight}px`;
    menu.classList.toggle("dropdown__menu--show");
  }

  const toggleClasses = classnames("dropdown__toggle", "", {
    "dropdown__toggle--profile": isProfile,
  });

  return (
    <div className="dropdown" ref={dropdownRef}>
      <a
        className={toggleClasses}
        href={href}
        id={id}
        onClick={handleToggle}
        ref={togglerRef}
      >
        {isProfile ? USER : title}
      </a>
      <div ref={menuRef} className="dropdown__menu">
        {children}
      </div>
    </div>
  );
}

Dropdown.Item = (props) => {
  const { children, href } = props;

  return (
    <a className="dropdown__item" href={href}>
      {children}
    </a>
  );
};

export default Dropdown;
