import React from "react";
import "./navbar.scss";

interface NavbarProps {
  children: React.ReactNode;
}
function Navbar({ children }: NavbarProps) {
  return <nav className="navbar">{children}</nav>;
}

export default Navbar;
