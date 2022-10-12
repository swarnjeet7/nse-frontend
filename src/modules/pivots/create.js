import { useState } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import PortfolioDropdown from "src/components/portfolioDropdown";
import WhiteBoard from "src/components/whiteBoard";
import axios from "axios";

function CreatePivots(props) {
  const [form, setForm] = useState({
    from: new Date(),
    Portfolio: "",
  });

  function handleFormSubmit() {
    axios
      .post("/pivots", {
        ...form,
      })
      .then((res) => {
        const { data = {} } = res;
        alert(data.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function handleInputChange(value, id) {
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  }

  return (
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
  );
}

export default CreatePivots;
