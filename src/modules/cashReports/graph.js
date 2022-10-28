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
import Toaster from "src/atoms/toaster";
import axios from "axios";

function Graph() {
  const [form, setForm] = useState({
    Symbol: "",
    from: "05/23/2022",
    to: "05/27/2022",
  });
  const [data, setData] = useState([]);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = () => {
    if (!form.Symbol) {
      setMessage("Please select Symbol");
      setType("error");
      return;
    }

    axios
      .get("/cash-reports/bhavcopy", {
        params: form,
      })
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          const filterData = res.data.filter((row, i) => {
            if (
              i > 0 &&
              new Date(res.data[i - 1].Timestamp) < new Date(row.Timestamp)
            ) {
              return row;
            }
            return null;
          });

          const data = filterData.map((row, i) => {
            return {
              date: moment(new Date(row.Timestamp)).format("DD-MM-YYYY"),
              [form.Symbol]: row.High,
            };
          });
          setData(data);
        } else {
          setMessage(res.message);
          setType("info");
        }
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
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
    <>
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
      {message && <Toaster type={type} message={message} />}
    </>
  );
}

export default Graph;
