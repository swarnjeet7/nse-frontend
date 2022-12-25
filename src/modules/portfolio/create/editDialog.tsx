import { useState } from "react";
import Dialog, { dialogSizes } from "src/components/dialog";
import WhiteBoard from "src/components/whiteBoard";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import Form from "src/components/form/form";
import axios from "axios";

import { ToasterTypes } from "src/atoms/toaster/toaster";

interface EditDialogProps {
  onHide: () => void;
  portfolio: any;
  getData: () => void;
  setMessage: (value: string) => void;
  setType: (value: ToasterTypes) => void;
  setSelectedPortfolio: (value: any) => void;
}

export default function EditDialog({
  onHide,
  portfolio,
  getData,
  setType,
  setMessage,
  setSelectedPortfolio,
}: EditDialogProps) {
  const [form, setForm] = useState(portfolio);
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
        onHide();
        setSelectedPortfolio({ Portfolio: "" });
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
  );
}
