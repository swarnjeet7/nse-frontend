import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import WhiteBoard from "src/components/whiteBoard";
import SymbolDropdown from "src/components/symbolDropdown";
import DateRangePicker from "src/components/dateRangePicker";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

function Graph(props) {
  const [form, setForm] = useState({
    Symbol: "",
    from: "05/23/2022",
    to: "05/27/2022",
  });
  const [data, setData] = useState([]);

  const handleSubmit = () => {
    if (!form.Symbol) {
      return alert("Please select Symbol");
    }

    axios
      .get("/cash-reports/bhavcopy", {
        params: form,
      })
      .then((response) => {
        console.log(response);
        const res = response.data;
        const data = res.data.map((row) => {
          const momentDate = moment(new Date(row.Timestamp));
          const year = momentDate.year();
          const month = momentDate.month();
          const day = momentDate.day();
          return {
            date: `${day}-${month}-${year}`,
            [form.Symbol]: row.High,
          };
        });
        setData(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  function handleChange(val, id) {
    setForm((prevForm) => ({ ...prevForm, [id]: val }));
  }

  function handleDateChange(date, id) {
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
            <SymbolDropdown id="Symbol" onChange={handleChange} />
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

      <WhiteBoard>
        <LineChart
          className="mt-4 m-auto"
          width={1100}
          height={500}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={form.Symbol}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </WhiteBoard>
    </div>
  );
}

export default Graph;
