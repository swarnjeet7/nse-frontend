import { useState } from "react";
import Dialog, { dialogSizes } from "src/components/dialog";
import WhiteBoard from "src/components/whiteBoard";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import Form from "src/components/form/form";
import Toaster from "src/atoms/toaster";
import axios from "axios";

import { ToasterTypes } from "src/atoms/toaster/toaster";

interface DeleteDialogProps {
  onHide: () => void;
  portfolio: any;
  getData: () => void;
  setMessage: (value: string) => void;
  setType: (value: ToasterTypes) => void;
  setSelectedPortfolio: (value: any) => void;
}

export default function DeleteDialog({
  onHide,
  portfolio,
  getData,
  setType,
  setMessage,
  setSelectedPortfolio,
}: DeleteDialogProps) {
  const [loading, setLoading] = useState<boolean>(false);

  function handleFormSubmit() {
    setLoading(true);

    axios
      .delete("/portfolio", {
        data: portfolio,
      })
      .then((response) => {
        const res = response.data;
        onHide();
        getData();
        setMessage(res.message);
        setType(res.status === 200 ? "success" : "info");
        setSelectedPortfolio({ Portfolio: "" });
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
        onHide();
      })
      .finally(() => setLoading(false));
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
            <Button isInline isWaiting={loading}>
              Delete Profile
            </Button>
          </Form.Actions>
        </Form>
      </WhiteBoard>
    </Dialog>
  );
}
