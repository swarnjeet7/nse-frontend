import classnames from "classnames";
import Input from "src/components/formInput";
import FileInput from "src/components/fileInput";
import Select from "src/components/formSelect";
import "./form.scss";

function Form(props) {
  const { children, onSubmit, className, isLoginForm } = props;
  const classes = classnames("form", className, {
    "form--login": isLoginForm,
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
  const { children } = props;

  return <div className="form__body">{children}</div>;
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
});
