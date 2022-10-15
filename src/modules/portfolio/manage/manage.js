import { useState, useEffect } from "react";
import { Grid, GridCell } from "src/atoms/grid";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import Title from "src/atoms/title";
import MultiCheckbox from "src/components/multiCheckbox";
import WhiteBoard from "src/components/whiteBoard";
import { Badge, BadgeList } from "src/components/badge";
import AddDialog from "./addDialog";

import axios from "axios";

function Manage() {
  const [profileList, setProfileList] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState({});
  const [addDialogStatus, setAddDialogStatus] = useState(false);
  const [portfolioScripts, setPortfolioScripts] = useState([]);

  useEffect(() => {
    getAllPortfolio();
  }, []);

  function getPortfolioScript(portfolio) {
    axios
      .get(`/portfolioScript?Portfolio=${portfolio.Portfolio}`)
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setPortfolioScripts(res.data.Scripts);
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function getAllPortfolio() {
    axios
      .get("/portfolio")
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setProfileList(res.data);
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function handleClick(value) {
    setSelectedPortfolio(value);
    getPortfolioScript(value);
  }

  return (
    <>
      <Grid col="2">
        <GridCell>
          <WhiteBoard fullHeight>
            <Title divider>Created Portfolio Map</Title>
            <Form isVertical>
              <Form.Body>
                <MultiCheckbox
                  list={profileList}
                  label="Portfolio"
                  value={selectedPortfolio.Portfolio}
                  onSelect={handleClick}
                />
              </Form.Body>
            </Form>
          </WhiteBoard>
        </GridCell>

        <GridCell>
          <WhiteBoard fullHeight>
            <Title divider>Portfolio Script</Title>
            <Form isVertical>
              <Form.Body>
                <BadgeList list={portfolioScripts} />
              </Form.Body>
              <Form.Actions>
                <Button
                  onClick={() => setAddDialogStatus(true)}
                  isInline
                  isDisabled={!selectedPortfolio.Portfolio}
                >
                  Add More
                </Button>
              </Form.Actions>
            </Form>
          </WhiteBoard>
        </GridCell>
      </Grid>
      {addDialogStatus && <AddDialog />}
    </>
  );
}

export default Manage;
