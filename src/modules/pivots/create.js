import { useState } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
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
          <Form.FormBody>
            <Form.FormInput
              id="from"
              isRequired
              isDatePicker
              value={form.from}
              label="Select Date"
              onChange={handleInputChange}
            />
            <Form.FormInput
              id="Portfolio"
              value={form.Portfolio}
              label="Select Portfolio"
              onChange={handleInputChange}
            />
          </Form.FormBody>
          <Form.FormActions>
            <Button>Submit</Button>
          </Form.FormActions>
        </Form>
      </WhiteBoard>
    </div>
  );
}

export default CreatePivots;
