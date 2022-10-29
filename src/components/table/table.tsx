import React from "react";
import "./table.scss";

interface TableProps {
  children: React.ReactNode;
}

function Table({ children }: TableProps) {
  return <div className="table">{children}</div>;
}

Table.Header = ({ children }: any) => {
  return (
    <div className="thead">
      {React.Children.map(children, (th: React.ReactElement, i: number) => {
        return (
          <div className="th" key={i}>
            <strong>{th.props.children}</strong>
          </div>
        );
      })}
    </div>
  );
};

Table.Body = ({ children }: TableProps) => {
  return <div className="tbody">{children}</div>;
};

Table.BodyItem = ({ children }: any) => {
  return (
    <div className="trow">
      {React.Children.map(children, (td: React.ReactElement, i) => {
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
