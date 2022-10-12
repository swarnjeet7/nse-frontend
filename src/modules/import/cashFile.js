import { useState, useRef } from "react";
import _ from "lodash";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import WhiteBoard from "src/components/whiteBoard";
import axios from "axios";

function CashFile() {
  const inputRef = useRef(null);
  const [file, setFiles] = useState("");

  const handleFormSubmit = (event) => {
    if (!file) {
      alert("Please upload a valid xls file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("cash-reports/bhavcopy", formData)
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setFiles("");
          inputRef.current.value = "";
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target?.files[0];
    if (!file) {
      alert("Please select valid excel file");
      return;
    }
    setFiles(file);
  };

  return (
    <WhiteBoard>
      <Form onSubmit={handleFormSubmit}>
        <Form.Body>
          <Form.FileInput
            id="file"
            isRequired
            label="Select Cash File"
            onChange={handleFileChange}
          />
        </Form.Body>
        <Form.Actions>
          <Button>Submit</Button>
        </Form.Actions>
      </Form>
    </WhiteBoard>
  );
}

export default CashFile;
