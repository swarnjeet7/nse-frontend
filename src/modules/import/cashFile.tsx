import { useState, useRef } from "react";
import { Grid, GridCell } from "src/atoms/grid";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import WhiteBoard from "src/components/whiteBoard";
import Toaster from "src/atoms/toaster";
import { CsvFile } from "src/atoms/icons";
import axios from "axios";
import { ToasterTypes } from "src/atoms/toaster/toaster";
import "./file.scss";

function CashFile() {
  const inputRef = useRef(null);
  const [file, setFile] = useState<File | "">("");
  const [type, setType] = useState<ToasterTypes>("info");
  const [message, setMessage] = useState<string>("");

  const handleFormSubmit = () => {
    if (!file) {
      setType("error");
      setMessage("Please upload a valid xls file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("cash-reports/bhavcopy", formData)
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setFile("");
          (inputRef.current as unknown as HTMLInputElement).value = "";
        } else {
          setMessage(res.message);
          setType("info");
        }
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
      });
  };

  const handleFileChange = (event: React.SyntheticEvent) => {
    const file = (event.target as unknown as HTMLInputElement).files?.["0"];
    if (!file || file.type !== "text/csv") {
      setType("error");
      setMessage("Please select valid csv file");
      return;
    }
    setFile(file);
  };

  const handleRemoveFile = () => {
    setFile("");
    (inputRef.current as unknown as HTMLInputElement).value = "";
  };

  return (
    <>
      <WhiteBoard>
        <Grid className="justify-content-between">
          <GridCell col="6">
            <Form
              onSubmit={handleFormSubmit}
              className="form--file-upload"
              isVertical
            >
              <Form.Body>
                <Form.FileInput
                  ref={inputRef}
                  id="file"
                  label="Drop your file here or click"
                  onChange={handleFileChange}
                >
                  <svg
                    className="file-input-icon"
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
          </GridCell>
          <GridCell col="6">
            {file && (
              <div className="file-icon">
                <CsvFile />
                {file?.name}
                <button className="btn-close" onClick={handleRemoveFile}>
                  ✕
                </button>
              </div>
            )}
          </GridCell>
        </Grid>
      </WhiteBoard>
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}

export default CashFile;
