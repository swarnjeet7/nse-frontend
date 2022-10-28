import { useState } from "react";
import Dialog, { dialogSizes } from "src/components/dialog";
import WhiteBoard from "src/components/whiteBoard";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import Form from "src/components/form/form";
import Toaster from "src/atoms/toaster";
import axios from "axios";

export default function EditDialog({ onHide, user }) {
  const [form, setForm] = useState(user);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

  function handleChange(value, id) {
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  }

  function handleFormSubmit() {
    axios
      .patch("/user/update", {
        ...form,
      })
      .then((response) => {
        const res = response.data;
        setMessage(res.message);
        setType(res.status === 200 ? "success" : "info");
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
      })
      .finally(() => {
        onHide();
      });
  }

  return (
    <>
      <Dialog size={dialogSizes.LARGE} onHide={onHide} showUnderlay>
        <WhiteBoard>
          <Title divider>Update User</Title>
          <Form onSubmit={handleFormSubmit} isVertical>
            <Form.Body>
              <Form.Input
                id="UserName"
                isRequired
                value={form.UserName}
                label="Enter username"
                onChange={handleChange}
              />

              <Form.Select
                id="UserType"
                isRequired
                value={form.UserType}
                label="Enter usertype"
                onChange={handleChange}
              >
                <option value="Manager">Manager</option>
                <option value="Executive">Executive</option>
                <option value="Admin">Admin</option>
              </Form.Select>

              <Form.Input
                id="FullName"
                isRequired
                value={form.FullName}
                label="Enter full name"
                onChange={handleChange}
              />

              <Form.Input
                type="password"
                id="Password"
                isRequired
                value={form.Password}
                label="Enter password"
                onChange={handleChange}
              />

              <Form.Input
                id="ConfirmPassword"
                isRequired
                value={form.ConfirmPassword}
                label="Enter confirm password"
                onChange={handleChange}
              />
            </Form.Body>
            <Form.Actions>
              <Button isInline>Update User</Button>
            </Form.Actions>
          </Form>
        </WhiteBoard>
      </Dialog>
      {message && <Toaster type={type} message={message} />}
    </>
  );
}
