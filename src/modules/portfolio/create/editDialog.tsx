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
  portfolio: any;
  getData: () => void;
}

export default function EditDialog({
  onHide,
  portfolio,
  getData,
}: EditDialogProps) {
  const [form, setForm] = useState(portfolio);
  const [type, setType] = useState<"error" | "success" | "warning" | "info">(
    "info"
  );
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleFormSubmit() {
    setLoading(true);

    axios
      .patch("/portfolio", {
        ...form,
      })
      .then((response) => {
        const res = response.data;
        getData();
        setMessage(res.message);
        setType(res.status === 200 ? "success" : "info");
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
      })
      .finally(() => setLoading(false));
  }

  function handleChange(value: string | Date, id: string) {
    setForm((prevForm: any) => ({ ...prevForm, [id]: value }));
  }

  return (
    <>
      <Dialog size={dialogSizes.LARGE} onHide={onHide} showUnderlay>
        <WhiteBoard>
          <Title divider>Update Portfolio</Title>
          <Form onSubmit={handleFormSubmit} isVertical>
            <Form.Body>
              <Form.Input
                id="Portfolio"
                isRequired
                value={form.Portfolio}
                label="Portfolio Name"
                onChange={handleChange}
              />

              <Form.Input
                id="FullName"
                isRequired
                value={form.FullName}
                label="Full Name"
                onChange={handleChange}
              />

              <Form.Textarea
                id="Address"
                isRequired
                value={form.Address}
                label="Full Address"
                onChange={handleChange}
              />
            </Form.Body>
            <Form.Actions>
              <Button isInline isWaiting={loading}>
                Update Portfolio
              </Button>
            </Form.Actions>
          </Form>
        </WhiteBoard>
      </Dialog>
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}
