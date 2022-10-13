import { useState, useEffect } from "react";
import _ from "lodash";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import Title from "src/atoms/title";
import PortfolioDropdown from "src/components/portfolioDropdown";
import WhiteBoard from "src/components/whiteBoard";
import { Grid, GridCell } from "src/atoms/grid";
import axios from "axios";

function Create() {
  const DEFAULT_FORM = {
    Portfolio: "",
    FullName: "",
    Address: "",
  };
  const [createForm, setCreateForm] = useState(DEFAULT_FORM);
  const [isChecked, setIsChecked] = useState(false);

  function handleFormSubmit() {}

  function handleChange(value, id) {
    setCreateForm((prevForm) => ({ ...prevForm, [id]: value }));
  }

  function handleClick() {
    setIsChecked((preState) => !preState);
  }

  return (
    <Grid col="2">
      <GridCell>
        <WhiteBoard>
          <Title divider>Create Portfolio</Title>
          <Form onSubmit={handleFormSubmit} isVertical>
            <Form.Body>
              <Form.Input
                id="Portfolio"
                isRequired
                value={createForm.Portfolio}
                label="Portfolio Name"
                onChange={handleChange}
              />

              <Form.Input
                id="FullName"
                isRequired
                value={createForm.FullName}
                label="Full Name"
                onChange={handleChange}
              />

              <Form.Textarea
                id="Address"
                isRequired
                value={createForm.Address}
                label="Full Address"
                onChange={handleChange}
              />
            </Form.Body>
            <Form.Actions>
              <Button isInline>Create Portfolio</Button>
            </Form.Actions>
          </Form>
        </WhiteBoard>
      </GridCell>

      <GridCell>
        <WhiteBoard>
          <Title divider>Created Portfolio Map</Title>
          <Form onSubmit={handleFormSubmit} isVertical>
            <Form.Body>
              <Form.Checkbox
                label="Swarnjeet"
                onChange={handleClick}
                isChecked={isChecked}
              />

              <Form.Checkbox
                label="Manjeet"
                onChange={handleClick}
                isChecked={isChecked}
              />
            </Form.Body>
            <Form.Actions>
              <Button isInline>Edit Portfolio</Button>
            </Form.Actions>
          </Form>
        </WhiteBoard>
      </GridCell>
    </Grid>
  );
}

export default Create;
