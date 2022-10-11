import classnames from "classnames";
import "./breadcrumb.scss";

function Breadcrumb({ children, ...restProps }) {
  return (
    <nav className="breadcrumb" {...restProps}>
      <ul className="breadcrumb__list">{children}</ul>
    </nav>
  );
}

Breadcrumb.Item = (props) => {
  const { children, href, isActive } = props;
  const classes = classnames("breadcrumb__link", props.className, {
    active: isActive,
  });

  return (
    <li className="breadcrumb__item">
      <a className={classes} href={href}>
        {children}
      </a>
    </li>
  );
};

export default Breadcrumb;
