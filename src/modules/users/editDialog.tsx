import { useState } from "react";
import Dialog, { dialogSizes } from "src/components/dialog";
import WhiteBoard from "src/components/whiteBoard";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import Form from "src/components/form/form";
import Toaster from "src/atoms/toaster";
import axios from "axios";

interface EditDialogProps {
  onHide: () => void;
  user: any;
  getUsers: () => void;
}

export default function EditDialog({
  onHide,
  user,
  getUsers,
}: EditDialogProps) {
  const [form, setForm] = useState(user);
  const [type, setType] = useState<"error" | "success" | "warning" | "info">(
    "info"
  );
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(value: Date | string, id: string) {
    setForm((prevForm: any) => ({ ...prevForm, [id]: value }));
  }

  function handleFormSubmit() {
    setLoading(true);

    axios
      .patch("/user/update", {
        ...form,
      })
      .then((response) => {
        const res = response.data;
        getUsers();
        setMessage(res.message);
        setType(res.status === 200 ? "success" : "info");
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
      })
      .finally(() => {
        onHide();
        setLoading(false);
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
              <Button isInline isWaiting={loading}>
                Update User
              </Button>
            </Form.Actions>
          </Form>
        </WhiteBoard>
      </Dialog>
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}
