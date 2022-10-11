import "./navbar.scss";

function Navbar(props) {
  const { children } = props;
  return <nav className="navbar">{children}</nav>;
}

export default Navbar;
