import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import WhiteBoard from "src/components/whiteBoard";
import Table from "src/components/table";
import axios from "axios";

function Bhavcopy() {
  const DEFAULT_FORM = {
    from: "05/23/2022",
    ExpireDate: "10/30/2022",
  };
  const [data, setData] = useState([]);
  const [form, setForm] = useState(DEFAULT_FORM);

  function handleFormSubmit() {
    axios
      .get("/fo-reports/bhavcopy", {
        params: {
          ..._.pickBy(form, _.identity),
        },
      })
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setData(res.data);
        } else {
          alert(res.message);
        }
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
          <Form.FormBody>
            <Form.FormInput
              id="from"
              isRequired
              isDatePicker
              value={form.from}
              label="Select Date"
              onChange={handleInputChange}
            />

            <Form.FormInput
              id="ExpireDate"
              isRequired
              isDatePicker
              value={form.ExpireDate}
              label="Select Expire Date"
              onChange={handleInputChange}
            />
          </Form.FormBody>
          <Form.FormActions>
            <Button>Submit</Button>
          </Form.FormActions>
        </Form>
      </WhiteBoard>

      <WhiteBoard>
        <Table>
          <Table.Header>
            <div>Instrument</div>
            <div>Symbol</div>
            <div>ExpireDate</div>
            <div>StrikePR</div>
            <div>OptionType</div>
            <div>Open</div>
            <div>High</div>
            <div>Low</div>
            <div>Close</div>
            <div>SettlePR</div>
            <div>Contracts</div>
            <div>ValueInLakh</div>
            <div>OpenInt</div>
            <div>ChangeInOI</div>
            <div>Timestamp</div>
          </Table.Header>
          <Table.Body>
            {data.map((item, i) => {
              const {
                Instrument,
                Symbol,
                ExpireDate,
                StrikePR,
                OptionType,
                Open,
                High,
                Low,
                Close,
                SettlePR,
                Contracts,
                ValueInLakh,
                OpenInt,
                ChangeInOI,
                Timestamp,
              } = item;
              return (
                <Table.BodyItem key={`${Symbol}${i}`}>
                  <div>{Instrument}</div>
                  <div>{Symbol}</div>
                  <div>{ExpireDate}</div>
                  <div>{StrikePR}</div>
                  <div>{OptionType}</div>
                  <div>{Open}</div>
                  <div>{High}</div>
                  <div>{Low}</div>
                  <div>{Close}</div>
                  <div>{SettlePR}</div>
                  <div>{Contracts}</div>
                  <div>{ValueInLakh}</div>
                  <div>{OpenInt}</div>
                  <div>{ChangeInOI}</div>
                  <div>{Timestamp}</div>
                </Table.BodyItem>
              );
            })}
          </Table.Body>
        </Table>
      </WhiteBoard>
    </div>
  );
}

export default Bhavcopy;
