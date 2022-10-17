import _ from "lodash";
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
import axios from "axios";

function Dashboard(props) {
  const [topPortfolio, setTopPortl] = useState({
    Portfoilo: "Swarnjeet",
    FullName: "Swarnjeet Singh",
    Scripts: ["20MICRONS", "3MINDIA", "3IINFOLTD"],
    Address: "F80A, GF, Jeewan Park, Uttam Nagar, New Delhi - 110059",
  });
  const [topGainers, setTopGainers] = useState([]);
  const [topLoosers, setTopLoosers] = useState([]);
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
  const toppers = [
    { id: 1, name: "TATAAIG", gain: 12 },
    { id: 2, name: "AXISBANK", gain: 9 },
    { id: 3, name: "ICICPROCU", gain: 8.7 },
  ];

  const loosers = [
    { id: 1, name: "TATAAIG", gain: 12 },
    { id: 2, name: "AXISBANK", gain: 9 },
    { id: 3, name: "ICICPROCU", gain: 8.7 },
  ];

  useEffect(() => {
    setTopGainers(toppers);
    setTopLoosers(loosers);
    axios
      .get("/portfolio/top")
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
        } else {
          // alert(res.message);
        }
      })
      .catch((err) => {
        //alert(err.message)
      });
  }, []);

  return (
    <Grid className="justify-content-between">
      <GridCell col="8">
        <WhiteBoard>
          <Title divider>
            Top portfolio scripts with graph :- {topPortfolio.Portfoilo}
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
            <Line
              type="monotone"
              dataKey={topPortfolio.Scripts[0]}
              stroke="#f5e5bf"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey={topPortfolio.Scripts[1]}
              stroke="#998a66"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey={topPortfolio.Scripts[2]}
              stroke="#d12a35"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </WhiteBoard>
      </GridCell>
      <GridCell col="4">
        <WhiteBoard>
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

        <WhiteBoard>
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
  );
}

export default Dashboard;
