import { useRef, useEffect, useState } from "react";
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
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutSide(evt) {
      const cur = menuRef.current;
      const node = evt.target;
      if (cur.contains(node)) return;
      setIsOpen(false);
    }

    document.addEventListener("click", handleClickOutSide);
  }, []);

  function handleToggle(event) {
    setIsOpen((prevState) => !prevState);
  }

  const toggleClasses = classnames("dropdown__toggle", "", {
    "dropdown__toggle--profile": isProfile,
  });

  return (
    <div ref={menuRef} className={isOpen ? "dropdown open" : "dropdown hidden"}>
      <a className={toggleClasses} href={href} id={id} onClick={handleToggle}>
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
