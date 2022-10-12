import _ from "lodash";
import moment from "moment";
import { useState, useEffect } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import WhiteBoard from "src/components/whiteBoard";
import Table from "src/components/table";
import DateRangePicker from "src/components/dateRangePicker";
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

  function handleDateChange(date, id) {
    // console.log(date, id);
    // const [from, to] = dates;

    setForm((prevForm) => ({
      ...prevForm,
      [id]: moment(date).format("MM/DD/YYYY"),
    }));
  }

  return (
    <div>
      <WhiteBoard>
        <Form onSubmit={handleSubmit}>
          <Form.Body>
            <Form.Select
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
            </Form.Select>

            <DateRangePicker
              onChange={handleDateChange}
              startDate={form.from}
              endDate={form.to}
              isRequired
            />
          </Form.Body>
          <Form.Actions>
            <Button>Submit</Button>
          </Form.Actions>
        </Form>
      </WhiteBoard>
    </div>
  );
}

export default Graph;
