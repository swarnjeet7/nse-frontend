import moment from "moment";
import { useState } from "react";
import Form from "src/components/form/form";
import PortfolioDropdown from "src/components/portfolioDropdown";
import Button from "src/components/button/button";
import WhiteBoard from "src/components/whiteBoard";
import Table from "src/components/table";
import axios from "axios";

function ShowPivots() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    from: "05/23/2022",
    Portfolio: "",
  });

  function handleFormSubmit() {
    axios
      .get("/pivots", {
        params: {
          ...form,
        },
      })
      .then((res) => {
        const { data = {} } = res;
        setData(data.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function handleInputChange(val, id) {
    let value = val;
    if (typeof value === "object") {
      value = moment(val).format("MM/DD/YYYY");
    }
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

      <WhiteBoard>
        <Table>
          <Table.Header>
            <div>Symbol</div>
            <div>Series</div>
            <div>R3</div>
            <div>R2</div>
            <div>R1</div>
            <div>Pivots</div>
            <div>S1</div>
            <div>S2</div>
            <div>S3</div>
          </Table.Header>
          <Table.Body>
            {data.map((item, i) => {
              const { Symbol, Series, R3, R2, R1, P, S1, S2, S3 } = item;
              return (
                <Table.BodyItem key={`${Symbol}${i}`}>
                  <div>{Symbol}</div>
                  <div>{Series}</div>
                  <div>{R3}</div>
                  <div>{R2}</div>
                  <div>{R1}</div>
                  <div>{P}</div>
                  <div>{S1}</div>
                  <div>{S2}</div>
                  <div>{S3}</div>
                </Table.BodyItem>
              );
            })}
          </Table.Body>
        </Table>
      </WhiteBoard>
    </div>
  );
}

export default ShowPivots;
