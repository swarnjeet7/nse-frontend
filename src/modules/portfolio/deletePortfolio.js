import Dialog, { dialogSizes } from "src/components/dialog";
import WhiteBoard from "src/components/whiteBoard";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import Form from "src/components/form/form";
import axios from "axios";

export default function DeleteDialog({ onHide, portfolio, getData }) {
  console.log("delete");
  function handleFormSubmit() {
    axios
      .delete("/portfolio", {
        data: portfolio,
      })
      .then((response) => {
        const res = response.data;
        alert(res.message);
        onHide();
        getData();
      })
      .catch((error) => {
        alert(error.message);
        onHide();
      });
  }

  return (
    <Dialog size={dialogSizes.LARGE} onHide={onHide} showUnderlay>
      <WhiteBoard>
        <Title divider>Update Portfolio</Title>
        <Form onSubmit={handleFormSubmit} isVertical>
          <Form.Body>
            <p>Do you want to delete this profile? </p>
          </Form.Body>
          <Form.Actions>
            <Button isInline>Delete Profile</Button>
          </Form.Actions>
        </Form>
      </WhiteBoard>
    </Dialog>
  );
}
