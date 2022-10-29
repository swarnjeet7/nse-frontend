import classnames from "classnames";
import React from "react";
import "./breadcrumb.scss";

interface BreadcrumbProps {
  children: React.ReactNode;
}

function Breadcrumb({ children }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb">
      <ul className="breadcrumb__list">{children}</ul>
    </nav>
  );
}

interface BreadcrumbItemProps {
  children: React.ReactNode;
  href?: string;
  isActive?: boolean;
  className?: string;
}

Breadcrumb.Item = ({
  children,
  href,
  isActive,
  className,
}: BreadcrumbItemProps) => {
  const classes = classnames("breadcrumb__link", className, {
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
