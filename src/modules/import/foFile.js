import { useState, useRef } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import WhiteBoard from "src/components/whiteBoard";
import axios from "axios";

function FoFile() {
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
      .post("fo-reports/bhavcopy", formData)
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
      <Form
        onSubmit={handleFormSubmit}
        isVertical
        className="form--file-upload"
      >
        <Form.Body>
          <Form.FileInput
            id="file"
            label="Drop your file here or click"
            onChange={handleFileChange}
          >
            <svg
              class="file-input-icon"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path>
            </svg>
          </Form.FileInput>
        </Form.Body>
        <Form.Actions>
          <Button>Submit</Button>
        </Form.Actions>
      </Form>
    </WhiteBoard>
  );
}

export default FoFile;
