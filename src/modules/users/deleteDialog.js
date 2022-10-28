import { useState } from "react";
import Dialog, { dialogSizes } from "src/components/dialog";
import WhiteBoard from "src/components/whiteBoard";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import Form from "src/components/form/form";
import Toaster from "src/atoms/toaster";
import axios from "axios";

export default function DeleteDialog({ onHide, user, getData }) {
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

  function handleFormSubmit() {
    axios
      .delete("/user", {
        data: user,
      })
      .then((response) => {
        const res = response.data;
        setMessage(res.message);
        setType(res.status === 200 ? "success" : "info");
        getData();
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
          <Title divider>Delete User</Title>
          <Form onSubmit={handleFormSubmit} isVertical>
            <Form.Body>
              <p>Do you want to delete this user? </p>
            </Form.Body>
            <Form.Actions>
              <Button isInline>Delete User</Button>
            </Form.Actions>
          </Form>
        </WhiteBoard>
      </Dialog>
      {message && <Toaster type={type} message={message} />}
    </>
  );
}
