import _ from "lodash";
import { useState, useEffect } from "react";
import { Grid, GridCell } from "src/atoms/grid";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import Title from "src/atoms/title";
import SingleCheckbox from "src/components/singleCheckbox";
import WhiteBoard from "src/components/whiteBoard";
import { BadgeList } from "src/components/badge";
import Toaster from "src/atoms/toaster";
import AddDialog from "./addDialog";
import axios from "axios";

function Manage() {
  const [profileList, setProfileList] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState({
    Portfolio: "",
    Scripts: [],
  });
  const [addDialogStatus, setAddDialogStatus] = useState(false);
  const [portfolioScripts, setPortfolioScripts] = useState([]);
  const [type, setType] = useState<"error" | "success" | "warning" | "info">(
    "info"
  );
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    getAllPortfolio();
  }, []);

  function getPortfolioScript(portfolio: any) {
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

  function handleClick(value: any) {
    setSelectedPortfolio(value);
    getPortfolioScript(value);
  }

  return (
    <>
      <Grid col="2">
        <GridCell>
          <WhiteBoard fullHeight>
            <Title divider>Created Portfolio Map</Title>
            <Form isVertical onSubmit={_.noop}>
              <Form.Body>
                <SingleCheckbox
                  list={profileList}
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
                  {_.isEmpty(portfolioScripts) ? "Add" : "Edit"}
                </Button>
              )}
            </Title>

            {_.isEmpty(selectedPortfolio) ? (
              "Select portfolio from left side portfolio map"
            ) : _.isEmpty(portfolioScripts) ? (
              "There is no script added yet, please add some"
            ) : (
              <BadgeList list={portfolioScripts} isClickAble={false} />
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
