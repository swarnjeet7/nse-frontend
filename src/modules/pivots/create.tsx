import { useState } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import PortfolioDropdown from "src/components/portfolioDropdown";
import WhiteBoard from "src/components/whiteBoard";
import Toaster from "src/atoms/toaster";
import axios from "axios";

function Create() {
  const [form, setForm] = useState({
    from: new Date(),
    Portfolio: "",
  });
  const [type, setType] = useState<"error" | "success" | "warning" | "info">(
    "info"
  );
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleFormSubmit() {
    setLoading(true);

    axios
      .post("/pivots", {
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
      .finally(() => setLoading(false));
  }

  function handleInputChange(value: Date | string, id: string) {
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  }

  return (
    <>
      <div>
        <WhiteBoard>
          <Form onSubmit={handleFormSubmit}>
            <Form.Body>
              <Form.Input
                id="from"
                isRequired
                isDatePicker
                value={form.from}
                label="Select Date"
                onChange={handleInputChange}
              />
              <PortfolioDropdown
                selected={form.Portfolio}
                onChange={handleInputChange}
              />
            </Form.Body>
            <Form.Actions>
              <Button isWaiting={loading}>Submit</Button>
            </Form.Actions>
          </Form>
        </WhiteBoard>
      </div>
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}

export default Create;
