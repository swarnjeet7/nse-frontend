import _ from "lodash";
import moment from "moment";
import { useState, useEffect } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import WhiteBoard from "src/components/whiteBoard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "src/components/table";
import axios from "axios";

function Graph(props) {
  const [form, setForm] = useState({
    Symbol: "",
    from: new Date(),
    to: null,
  });
  const [data, setData] = useState([]);
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    axios
      .get("/symbols")
      .then((response) => {
        const res = response.data;
        setSymbols(res.data);
        setForm((prevForm) => {
          return {
            ...prevForm,
            Symbol: res.data[0].name,
          };
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function handleChange(val, id) {
    setForm((prevForm) => ({ ...prevForm, [id]: val }));
  }

  function handleDateChange(dates) {
    const [from, to] = dates;
    if (to === null) {
      return;
    }
    setForm((prevForm) => ({
      ...prevForm,
      from,
      to,
    }));
  }

  return (
    <div>
      <WhiteBoard>
        <Form onSubmit={handleSubmit}>
          <Form.FormBody>
            <Form.FormSelect
              id="Symbol"
              isRequired
              value={form.Symbol}
              label="Select Symbol"
              onSelect={handleChange}
            >
              {symbols.map((symbol) => (
                <option value={symbol.name} key={symbol._id}>
                  {symbol.name}
                </option>
              ))}
            </Form.FormSelect>

            <DatePicker
              selected={form.from}
              onChange={handleDateChange}
              startDate={form.from}
              endDate={form.to}
              selectsRange
              inline
            />

            {/* <Form.FormInput
              id="from"
              isRequired
              isDatePicker
              value={form.from}
              startDate={form.from}
              endDate={form.to}
              label="Select Date Range"
              onChange={handleDateChange}
            /> */}
          </Form.FormBody>
          <Form.FormActions>
            <Button>Submit</Button>
          </Form.FormActions>
        </Form>
      </WhiteBoard>
    </div>
  );
}

export default Graph;
