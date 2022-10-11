import { useState, useEffect } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import loginBackground from "src/img/login-bg.jpeg";
import Form from "src/components/form";
import Button from "src/components/button/button";
import axios from "axios";
import logo from "src/img/logo-md.png";
import "./login.scss";

function Login() {
  const [form, setForm] = useState({
    UserName: "",
    Password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = sessionStorage.getItem("auth");
    if (isLogin) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  // function handleUsernameChange(value) {
  //   setForm((prevState) => ({ ...prevState, UserName: value }));
  // }

  // function handlePasswordChange(value) {
  //   setForm((prevState) => ({ ...prevState, Password: value }));
  // }

  function handleInputChange(value, id) {
    setForm((prevState) => ({ ...prevState, [id]: value }));
  }

  function handleFormSubmit() {
    if (_.isEmpty(_.pickBy(form, _.identity))) {
      alert("Please enter username and password");
      return false;
    }

    axios
      .post("/user/login", {
        ...form,
      })
      .then((res) => {
        const { data } = res;
        if (data.status === 200) {
          sessionStorage.setItem("auth", data.token);
          navigate("/dashboard", { replace: true });
        } else {
          alert(data.message);
          // set error to show the message;
          // setError(res.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="container login-wrapper">
      <div className="login-box">
        <div
          className="login-box__left"
          style={{
            backgroundImage: `url(${loginBackground})`,
          }}
        >
          <h1 className="title">NSE</h1>
          <h2 className="subtitle">Stock Analysis</h2>
          <p className="caption">Indias best stock analysis tools</p>
        </div>
        <div className="login-box__right">
          <div className="image-wrapper">
            <img src={logo} alt="NSE Stock Analysis" width="320" />
          </div>
          <h2 className="page-title">Login</h2>

          <Form onSubmit={handleFormSubmit} isLoginForm>
            <Form.FormBody>
              <Form.FormInput
                id="UserName"
                value={form.UserName}
                label="Username"
                onChange={handleInputChange}
              />
              <Form.FormInput
                id="Password"
                value={form.Password}
                label="Password"
                type="password"
                onChange={handleInputChange}
              />
            </Form.FormBody>
            <Form.FormActions>
              <Button>Login</Button>
            </Form.FormActions>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
