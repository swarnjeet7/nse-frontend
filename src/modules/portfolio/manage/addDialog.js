import { useState } from "react";
import Dialog, { dialogSizes } from "src/components/dialog";
import WhiteBoard from "src/components/whiteBoard";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import Form from "src/components/form/form";
import SearchBox from "src/components/searchBox";
import Toaster from "src/atoms/toaster";
import axios from "axios";

export default function AddDialog({ onHide, portfolio }) {
  const [form] = useState(portfolio);
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFormSubmit() {
    setLoading(true);

    axios
      .patch("/portfolio", {
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

  return (
    <>
      <Dialog size={dialogSizes.LARGE} onHide={onHide} showUnderlay>
        <WhiteBoard>
          <Title divider>Add Symbols</Title>
          <Form onSubmit={handleFormSubmit} isVertical>
            <Form.Body>
              <Form.Input
                id="Symbol"
                value={searchValue}
                onChange={(value) => setSearchValue(value)}
                placeholder="Search symbol"
              />
              <SearchBox />
            </Form.Body>
            <Form.Actions>
              <Button isInline isWaiting={loading}>
                Submit
              </Button>
            </Form.Actions>
          </Form>
        </WhiteBoard>
      </Dialog>
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}
