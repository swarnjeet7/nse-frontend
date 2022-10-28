import moment from "moment";
import { useState } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import WhiteBoard from "src/components/whiteBoard";
import Table from "src/components/table";
import Toaster from "src/atoms/toaster";
import axios from "axios";

function GainersLoosers() {
  const DEFAULT_FORM = {
    date: "05/25/2022",
    type: "Gainers",
    count: 10,
  };
  const [data, setData] = useState([]);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

  function handleFormSubmit() {
    axios
      .get("/cash-reports/top", {
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
      });
  }

  function handleChange(val, id) {
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
                id="date"
                isRequired
                isDatePicker
                value={form.date}
                label="Select Date"
                onChange={handleChange}
              />
              <Form.Select
                id="type"
                isRequired
                value={form.type}
                label="Select Type"
                onSelect={handleChange}
              >
                <option value="gainers">Gainers</option>
                <option value="loosers">Loosers</option>
              </Form.Select>

              <Form.Input
                id="count"
                isRequired
                value={form.count}
                label="Enter Count"
                onChange={handleChange}
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
              <div>Open</div>
              <div>High</div>
              <div>Low</div>
              <div>Close</div>
              <div>Last</div>
              <div>PrevClose</div>
              <div>TotalTradeQty</div>
              <div>TotalTradeVal</div>
              <div>Timestamp</div>
              <div>TotalTrades</div>
              <div>ISIN</div>
              <div>Growth</div>
            </Table.Header>
            <Table.Body>
              {data.map((item, i) => {
                const {
                  Symbol,
                  Series,
                  Open,
                  High,
                  Low,
                  Close,
                  Last,
                  PrevClose,
                  Profit,
                  TotalTradeQuantity,
                  TotalTradeValue,
                  TotalTrades,
                  Timestamp,
                  ISIN,
                } = item;
                return (
                  <Table.BodyItem key={`${Symbol}${i}`}>
                    <div>{Symbol}</div>
                    <div>{Series}</div>
                    <div>{Open}</div>
                    <div>{High}</div>
                    <div>{Low}</div>
                    <div>{Close}</div>
                    <div>{Last}</div>
                    <div>{PrevClose}</div>
                    <div>{TotalTradeQuantity}</div>
                    <div>{TotalTradeValue}</div>
                    <div>{moment(Timestamp).format("MM/DD/YYYY")}</div>
                    <div>{TotalTrades}</div>
                    <div>{ISIN}</div>
                    <div>{Number(Profit).toFixed(2) + "%"}</div>
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

export default GainersLoosers;
