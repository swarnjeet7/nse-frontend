import _ from "lodash";
import { useState, useEffect } from "react";
import { Grid, GridCell } from "src/atoms/grid";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import Title from "src/atoms/title";
import MultiCheckbox from "src/components/multiCheckbox";
import WhiteBoard from "src/components/whiteBoard";
import { BadgeList } from "src/components/badge";
import Toaster from "src/atoms/toaster";
import AddDialog from "./addDialog";
import axios from "axios";

function Manage() {
  const [profileList, setProfileList] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState({});
  const [addDialogStatus, setAddDialogStatus] = useState(false);
  const [portfolioScripts, setPortfolioScripts] = useState([]);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

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
          setMessage(res.message);
          setType("info");
        }
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
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
          setMessage(res.message);
          setType("info");
        }
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
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
            <Title divider justify="between">
              <span>Portfolio Script</span>
              {selectedPortfolio.Portfolio && (
                <Button onClick={() => setAddDialogStatus(true)} isInline>
                  {_.isEmpty(selectedPortfolio.Scripts) ? "Add" : "Add More"}
                </Button>
              )}
            </Title>

            {_.isEmpty(selectedPortfolio) ? (
              "Select portfolio from left side portfolio map"
            ) : _.isEmpty(portfolioScripts) ? (
              "There is no script added yet, please add some"
            ) : (
              <BadgeList list={portfolioScripts} />
            )}
          </WhiteBoard>
        </GridCell>
      </Grid>
      {addDialogStatus && (
        <AddDialog
          portfolio={selectedPortfolio}
          onHide={() => setAddDialogStatus(false)}
        />
      )}
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}

export default Manage;
