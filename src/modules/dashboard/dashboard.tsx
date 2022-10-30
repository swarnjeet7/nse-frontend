import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import WhiteBoard from "src/components/whiteBoard";
import { Grid, GridCell } from "src/atoms/grid";
import Title from "src/atoms/title";
import List from "src/components/list";
import Toaster from "src/atoms/toaster";
import axios from "axios";

function Dashboard() {
  const strokesColorArr = ["#f5e5bf", "#998a66", "#d12a35"];
  const [topPortfolio, setTopPortfolio] = useState({
    Portfolio: "",
    Scripts: [],
  });
  const [topGainers, setTopGainers] = useState([]);
  const [topLoosers, setTopLoosers] = useState([]);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"error" | "success" | "warning" | "info">(
    "info"
  );
  const data = [
    {
      date: "23-05-2022",
      "20MICRONS": 86.4,
      "3MINDIA": 121.55,
      "3IINFOLTD": 49.5,
    },
    {
      date: "24-05-2022",
      "20MICRONS": 83.5,
      "3MINDIA": 115.8,
      "3IINFOLTD": 94.25,
    },
    {
      date: "25-05-2022",
      "20MICRONS": 91.2,
      "3MINDIA": 132.75,
      "3IINFOLTD": 59,
    },
    {
      date: "26-05-2022",
      "20MICRONS": 95.4,
      "3MINDIA": 137.7,
      "3IINFOLTD": 65.8,
    },
    {
      date: "27-05-2022",
      "20MICRONS": 99.8,
      "3MINDIA": 149.05,
      "3IINFOLTD": 78.9,
    },
  ];

  useEffect(() => {
    axios
      .get("/cash-reports/top?date=05%2F25%2F2022&type=Gainers&count=3")
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setTopGainers(res.data);
        } else {
          setMessage(res.message);
          setType("info");
        }
      })
      .catch((err) => {
        setMessage(err.message);
        setType("error");
      });
    axios
      .get("/cash-reports/top?date=05%2F25%2F2022&type=Loosers&count=3")
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setTopLoosers(res.data);
        } else {
          setMessage(res.message);
          setType("info");
        }
      })
      .catch((err) => {
        setMessage(err.message);
        setType("error");
      });
    axios
      .get("/portfolioScript/top")
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setTopPortfolio(res.data?.[0]);
        } else {
          setMessage(res.message);
          setType("info");
        }
      })
      .catch((err) => {
        setMessage(err.message);
        setType("error");
      });
  }, []);

  return (
    <>
      <Grid className="justify-content-between">
        <GridCell col="8">
          <WhiteBoard>
            <Title divider>
              Top portfolio scripts with graph :- {topPortfolio.Portfolio}
            </Title>
            <LineChart
              className="mt-4 m-auto"
              width={700}
              height={400}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {topPortfolio.Scripts.map((symbol: string, i: number) => {
                const strokeColor = strokesColorArr[i];
                return (
                  <Line
                    key={symbol}
                    type="monotone"
                    dataKey={symbol}
                    stroke={strokeColor}
                    activeDot={{ r: 8 }}
                  />
                );
              })}
            </LineChart>
          </WhiteBoard>
        </GridCell>
        <GridCell
          col="4"
          className="flex flex-direction-column justify-content-between"
        >
          <WhiteBoard isSideboard>
            <Title divider className="justify-content-between">
              <span>Top 3 Gainers</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={{ width: 30, height: 30, fill: "#1aaf1a" }}
              >
                <path d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" />
              </svg>
            </Title>
            <List data={topGainers} isSuccess></List>
          </WhiteBoard>

          <WhiteBoard isSideboard>
            <Title divider className="justify-content-between">
              <span>Top 3 Loosers</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={{ width: 30, height: 30, fill: "#da1818" }}
              >
                <path d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z" />
              </svg>
            </Title>
            <List data={topLoosers} isLoosers></List>
          </WhiteBoard>
        </GridCell>
      </Grid>
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}

export default Dashboard;
