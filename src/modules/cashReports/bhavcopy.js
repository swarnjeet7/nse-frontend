import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import WhiteBoard from "src/components/whiteBoard";
import Table from "src/components/table";
import PortfolioDropdown from "src/components/portfolioDropdown";
import DateRangePicker from "src/components/dateRangePicker";
import SymbolDropdown from "src/components/symbolDropdown";
import { Tabs, Tab } from "src/components/tabs";
import Toaster from "src/atoms/toaster";
import axios from "axios";

function Bhavcopy() {
  const DEFAULT_FORM = {
    from: "05/23/2022",
    to: "05/25/2022",
    Portfolio: "",
    Symbol: "",
  };
  const [key, setKey] = useState("form1");
  const [data, setData] = useState([]);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

  function handleFormSubmit() {
    let validForm = _.pick(form, ["from", "to", "Symbol"]);
    if (key === "form1") {
      validForm = _.pick(validForm, ["from", "Portfolio"]);
    }
    setLoading(true);
    axios
      .get("/cash-reports/bhavcopy", {
        params: {
          ..._.pickBy(validForm, _.identity),
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
      value = moment(val).at("MM/DD/YYYY");
    }
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  }

  return (
    <>
      <div>
        <WhiteBoard>
          <Tabs
            activeKey={key}
            onSelect={(key) => {
              setKey(key);
              setData([]);
              setForm(DEFAULT_FORM);
            }}
          >
            <Tab eventKey="form1" title="Specific Date" activeKey={key}>
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
            </Tab>
            <Tab eventKey="form2" title="Date Range" activeKey={key}>
              <Form onSubmit={handleFormSubmit}>
                <Form.Body>
                  <DateRangePicker
                    onChange={handleInputChange}
                    startDate={form.from}
                    endDate={form.to}
                    isRequired
                  />
                  <SymbolDropdown
                    id="Symbol"
                    selected={form.Symbol}
                    onChange={handleInputChange}
                  />
                </Form.Body>
                <Form.Actions>
                  <Button isWaiting={loading}>Submit</Button>
                </Form.Actions>
              </Form>
            </Tab>
          </Tabs>
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
                    <div>{Timestamp}</div>
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

export default Bhavcopy;
