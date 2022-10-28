import { useState } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import PortfolioDropdown from "src/components/portfolioDropdown";
import WhiteBoard from "src/components/whiteBoard";
import Toaster from "src/atoms/toaster";
import axios from "axios";

function Create(props) {
  const [form, setForm] = useState({
    from: new Date(),
    Portfolio: "",
  });
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

  function handleFormSubmit() {
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
      });
  }

  function handleInputChange(value, id) {
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
                id="Portfolio"
                selected={form.Portfolio}
                onChange={handleInputChange}
              />
            </Form.Body>
            <Form.Actions>
              <Button>Submit</Button>
            </Form.Actions>
          </Form>
        </WhiteBoard>
      </div>
      {message && <Toaster type={type} message={message} />}
    </>
  );
}

export default Create;
