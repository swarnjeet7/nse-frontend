import _ from "lodash";
import React from "react";
import classnames from "classnames";
import Input from "src/components/formInput";
import Textarea from "src/components/formTextarea";
import FileInput from "src/components/fileInput";
import Select from "src/components/formSelect";
import Checkbox from "src/components/formCheckbox";
import "./form.scss";

interface FormProps {
  children: React.ReactNode;
  onSubmit?: () => void;
  className?: string;
  isLoginForm?: boolean;
  isVertical?: boolean;
}

function Form({
  children,
  onSubmit = _.noop,
  className,
  isLoginForm,
  isVertical,
}: FormProps) {
  const classes = classnames("form", className, {
    "form--login": isLoginForm,
    "form--vertical": isVertical,
  });

  function handleFormSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className={classes} onSubmit={handleFormSubmit}>
      {children}
    </form>
  );
}

interface FormBody {
  children: React.ReactNode;
  isVertical?: boolean;
  className?: string;
}

export const Body = ({ children, isVertical, className }: FormBody) => {
  const classes = classnames("form__body", className, {
    "form__body--vertical": isVertical,
  });

  return <div className={classes}>{children}</div>;
};

interface FormActions {
  children: React.ReactNode;
}

export const Actions = ({ children }: FormActions) => {
  return <div className="form__actions">{children}</div>;
};

export default Object.assign(Form, {
  Input,
  Body,
  Actions,
  Select,
  FileInput,
  Textarea,
  Checkbox,
});
