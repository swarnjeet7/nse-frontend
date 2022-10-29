import { useState } from "react";
import Dialog, { dialogSizes } from "src/components/dialog";
import WhiteBoard from "src/components/whiteBoard";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import Form from "src/components/form/form";
import Toaster from "src/atoms/toaster";
import axios from "axios";

interface DeleteDialogProps {
  onHide: () => void;
  user: any;
  getUsers: () => void;
}

export default function DeleteDialog({
  onHide,
  user,
  getUsers,
}: DeleteDialogProps) {
  const [type, setType] = useState<"error" | "success" | "warning" | "info">(
    "info"
  );
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleFormSubmit() {
    setLoading(true);

    axios
      .delete("/user", {
        data: user,
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
          <Title divider>Delete User</Title>
          <Form onSubmit={handleFormSubmit} isVertical>
            <Form.Body>
              <p>Do you want to delete this user? </p>
            </Form.Body>
            <Form.Actions>
              <Button isInline isWaiting={loading}>
                Delete User
              </Button>
            </Form.Actions>
          </Form>
        </WhiteBoard>
      </Dialog>
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}
