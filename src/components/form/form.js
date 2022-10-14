import _ from "lodash";
import classnames from "classnames";
import Input from "src/components/formInput";
import Textarea from "src/components/formTextarea";
import FileInput from "src/components/fileInput";
import Select from "src/components/formSelect";
import Checkbox from "src/components/formCheckbox";
import "./form.scss";

function Form(props) {
  const {
    children,
    onSubmit = _.noop,
    className,
    isLoginForm,
    isVertical,
  } = props;
  const classes = classnames("form", className, {
    "form--login": isLoginForm,
    "form--vertical": isVertical,
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <form className={classes} onSubmit={handleFormSubmit}>
      {children}
    </form>
  );
}

export const Body = (props) => {
  const { children, isVertical, className } = props;
  const classes = classnames("form__body", className, {
    "form__body--vertical": isVertical,
  });

  return <div className={classes}>{children}</div>;
};

export const Actions = (props) => {
  const { children } = props;

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
