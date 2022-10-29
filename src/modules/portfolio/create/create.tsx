import _ from "lodash";
import { useState, useEffect } from "react";
import Form from "src/components/form/form";
import Button from "src/components/button/button";
import Title from "src/atoms/title";
import MultiCheckbox from "src/components/multiCheckbox";
import WhiteBoard from "src/components/whiteBoard";
import EditDialog from "./editDialog";
import DeleteDialog from "./deleteDialog";
import { Grid, GridCell } from "src/atoms/grid";
import axios from "axios";
import Toaster from "src/atoms/toaster";

function Create() {
  const [selectedPortfolio, setSelectedPortfolio] = useState({
    Portfolio: "",
  });
  const DEFAULT_FORM = {
    Portfolio: "",
    FullName: "",
    Address: "",
  };

  const [form, setForm] = useState(DEFAULT_FORM);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [profileList, setProfileList] = useState([]);
  const [type, setType] = useState<"error" | "success" | "warning" | "info">(
    "info"
  );
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllPortfolio();
  }, []);

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

  function handleFormSubmit() {
    setLoading(true);

    axios
      .post("/portfolio", {
        ...form,
      })
      .then((response) => {
        const res = response.data;
        setForm(DEFAULT_FORM);
        getAllPortfolio();
        setMessage(res.message);
        setType(res.status === 200 ? "success" : "info");
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
      })
      .finally(() => setLoading(false));
  }

  function handleChange(value: string | Date, id: string) {
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  }

  function handleCloseEditDialog() {
    setShowEditDialog(false);
  }

  function handleCloseDeleteDialog() {
    setShowDeleteDialog(false);
  }

  function handleClick(value: any) {
    setSelectedPortfolio(value);
  }

  return (
    <>
      <Grid col="2">
        <GridCell>
          <WhiteBoard fullHeight>
            <Title divider>Create Portfolio</Title>
            <Form onSubmit={handleFormSubmit} isVertical>
              <Form.Body>
                <Form.Input
                  id="Portfolio"
                  isRequired
                  value={form.Portfolio}
                  label="Portfolio Name"
                  onChange={handleChange}
                />

                <Form.Input
                  id="FullName"
                  isRequired
                  value={form.FullName}
                  label="Full Name"
                  onChange={handleChange}
                />

                <Form.Textarea
                  id="Address"
                  isRequired
                  value={form.Address}
                  label="Full Address"
                  onChange={handleChange}
                />
              </Form.Body>
              <Form.Actions>
                <Button isInline isWaiting={loading}>
                  Create Portfolio
                </Button>
              </Form.Actions>
            </Form>
          </WhiteBoard>
        </GridCell>

        <GridCell>
          <WhiteBoard fullHeight>
            <Title divider>Created Portfolio Map</Title>
            <Form isVertical onSubmit={_.noop}>
              <Form.Body>
                <MultiCheckbox
                  list={profileList}
                  label="Portfolio"
                  value={selectedPortfolio?.Portfolio}
                  onSelect={handleClick}
                />
              </Form.Body>
              <Form.Actions>
                <Button
                  onClick={() => setShowEditDialog(true)}
                  isInline
                  isDisabled={!selectedPortfolio.Portfolio}
                >
                  Edit Portfolio
                </Button>

                <Button
                  onClick={() => setShowDeleteDialog(true)}
                  isInline
                  isDisabled={!selectedPortfolio.Portfolio}
                >
                  Delete Portfolio
                </Button>
              </Form.Actions>
            </Form>
          </WhiteBoard>
        </GridCell>
      </Grid>
      {showEditDialog && (
        <EditDialog
          onHide={handleCloseEditDialog}
          portfolio={selectedPortfolio}
          getData={getAllPortfolio}
        />
      )}
      {showDeleteDialog && (
        <DeleteDialog
          onHide={handleCloseDeleteDialog}
          portfolio={selectedPortfolio}
          getData={getAllPortfolio}
        />
      )}
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}

export default Create;
