import { useState } from "react";
import Dialog, { dialogSizes } from "src/components/dialog";
import WhiteBoard from "src/components/whiteBoard";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import Form from "src/components/form/form";
import SearchBox from "src/components/searchBox";
import axios from "axios";

export default function AddDialog({ onHide, portfolio }) {
  const [form, setForm] = useState(portfolio);
  const [searchValue, setSearchValue] = useState("");

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
            <Button isInline>Submit</Button>
          </Form.Actions>
        </Form>
      </WhiteBoard>
    </Dialog>
  );
}
