import React from "react";
import classnames from "classnames";
import "./tabs.scss";

function getDefaultActiveKey(children) {
  let defaultActiveKey;
  React.Children.map(children, (child) => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}

export const Tabs = ({
  children,
  activeKey = getDefaultActiveKey(children),
  onSelect,
  ...restProps
}) => {
  function handleSelectTab(eventKey) {
    onSelect(eventKey);
  }

  return (
    <div className="tabs">
      <ul className="tabs__list">
        {React.Children.map(children, (item, i) => {
          const { title, eventKey, className } = item.props;
          const classes = classnames("tabs__btn", className, {
            active: eventKey === activeKey,
          });
          return (
            <li className="tabs__item" key={i}>
              <button
                onClick={() => handleSelectTab(eventKey)}
                className={classes}
                data-target={eventKey}
              >
                {title}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="tabs__content">{children}</div>
    </div>
  );
};

export const Tab = ({ children, eventKey, activeKey }) => {
  console.log(activeKey);
  if (activeKey !== eventKey) {
    return null;
  }
  return (
    <div className="tabs__pane" id={eventKey}>
      {children}
    </div>
  );
};
