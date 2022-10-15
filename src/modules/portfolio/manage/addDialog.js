import { useState } from "react";
import Dialog, { dialogSizes } from "src/components/dialog";
import WhiteBoard from "src/components/whiteBoard";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import Form from "src/components/form/form";
import axios from "axios";

export default function AddDialog({ onHide, portfolio }) {
  const [form, setForm] = useState(portfolio);

  console.log("edit");
  function handleFormSubmit() {
    axios
      .patch("/portfolio", {
        ...form,
      })
      .then((response) => {
        const res = response.data;
        alert(res.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function handleChange(value, id) {
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
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
            <Button isInline>Update Portfolio</Button>
          </Form.Actions>
        </Form>
      </WhiteBoard>
    </Dialog>
  );
}
