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
import { DEFAULT_FORM } from "./constant";

function Manage() {
  const [selectedUser, setSelectedUser] = useState({});
  const [form, setForm] = useState(DEFAULT_FORM);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    axios
      .get("/user/all")
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setUsers(res.data);
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
    axios
      .post("/users/create", {
        ...form,
      })
      .then((response) => {
        const res = response.data;
        setForm(DEFAULT_FORM);
        getAllUsers();
        setMessage(res.message);
        setType(res.status === 200 ? "success" : "info");
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
      });
  }

  function handleChange(value, id) {
    setForm((prevForm) => ({ ...prevForm, [id]: value }));
  }

  function handleCloseEditDialog() {
    setShowEditDialog(false);
  }

  function handleCloseDeleteDialog() {
    setShowDeleteDialog(false);
  }

  function handleClick(value) {
    setSelectedUser(value);
  }

  return (
    <>
      <Grid col="2">
        <GridCell>
          <WhiteBoard fullHeight>
            <Title divider>Create User</Title>
            <Form onSubmit={handleFormSubmit} isVertical>
              <Form.Body>
                <Form.Input
                  id="UserName"
                  isRequired
                  value={form.UserName}
                  label="Enter username"
                  onChange={handleChange}
                />

                <Form.Select
                  id="UserType"
                  isRequired
                  value={form.UserType}
                  label="Enter usertype"
                  onChange={handleChange}
                >
                  <option value="Manager">Manager</option>
                  <option value="Executive">Executive</option>
                  <option value="Admin">Admin</option>
                </Form.Select>

                <Form.Input
                  id="FullName"
                  isRequired
                  value={form.FullName}
                  label="Enter full name"
                  onChange={handleChange}
                />

                <Form.Input
                  type="password"
                  id="Password"
                  isRequired
                  value={form.Password}
                  label="Enter password"
                  onChange={handleChange}
                />

                <Form.Input
                  id="ConfirmPassword"
                  isRequired
                  value={form.ConfirmPassword}
                  label="Enter confirm password"
                  onChange={handleChange}
                />
              </Form.Body>
              <Form.Actions>
                <Button isInline>Create User</Button>
              </Form.Actions>
            </Form>
          </WhiteBoard>
        </GridCell>

        <GridCell>
          <WhiteBoard fullHeight>
            <Title divider>Managed Users Map</Title>
            <Form isVertical>
              <Form.Body>
                <MultiCheckbox
                  list={users}
                  label="UserName"
                  value={selectedUser.UserName}
                  onSelect={handleClick}
                />
              </Form.Body>
              <Form.Actions>
                <Button
                  onClick={() => setShowEditDialog(true)}
                  isInline
                  isDisabled={!selectedUser.UserName}
                >
                  Edit User
                </Button>

                <Button
                  onClick={() => setShowDeleteDialog(true)}
                  isInline
                  isDisabled={!selectedUser.UserName}
                >
                  Delete User
                </Button>
              </Form.Actions>
            </Form>
          </WhiteBoard>
        </GridCell>
      </Grid>
      {showEditDialog && (
        <EditDialog
          onHide={handleCloseEditDialog}
          user={selectedUser}
          getUsers={getAllUsers}
        />
      )}
      {showDeleteDialog && (
        <DeleteDialog
          onHide={handleCloseDeleteDialog}
          user={selectedUser}
          getUsers={getAllUsers}
        />
      )}
      {message && <Toaster type={type} message={message} />}
    </>
  );
}

export default Manage;
