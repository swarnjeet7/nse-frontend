import React from "react";
import "./table.scss";

function Table({ children, ...restProps }) {
  return (
    <div className="table" {...restProps}>
      {children}
    </div>
  );
}

Table.Header = ({ children, ...restProps }) => {
  return (
    <div className="thead">
      {React.Children.map(children, (th, i) => {
        return (
          <div className="th" key={i}>
            <strong>{th.props.children}</strong>
          </div>
        );
      })}
    </div>
  );
};

Table.Body = ({ children, ...restProps }) => {
  return (
    <div className="tbody" {...restProps}>
      {children}
    </div>
  );
};

Table.BodyItem = ({ children, ...restProps }) => {
  return (
    <div className="trow">
      {React.Children.map(children, (td, i) => {
        return (
          <div className="td" key={i}>
            {td.props.children}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
