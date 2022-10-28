import moment from "moment";
import { useState } from "react";
import Form from "src/components/form/form";
import PortfolioDropdown from "src/components/portfolioDropdown";
import Button from "src/components/button/button";
import WhiteBoard from "src/components/whiteBoard";
import Table from "src/components/table";
import Toaster from "src/atoms/toaster";
import axios from "axios";

function Show() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    from: "05/23/2022",
    Portfolio: "",
  });
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFormSubmit() {
    setLoading(true);
    axios
      .get("/pivots", {
        params: {
          ...form,
        },
      })
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setData(res.data);
        } else {
          setMessage(res.message);
          setType("info");
        }
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
      })
      .finally(() => setLoading(false));
  }

  function handleInputChange(val, id) {
    let value = val;
    if (typeof value === "object") {
      value = moment(val).format("MM/DD/YYYY");
    }
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
              <Button isWaiting={loading}>Submit</Button>
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
      {message && <Toaster type={type} message={message} />}
    </>
  );
}

export default Show;
