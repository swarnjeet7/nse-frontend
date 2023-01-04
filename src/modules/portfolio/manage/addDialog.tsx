import { useState } from "react";
import Dialog, { dialogSizes } from "src/components/dialog";
import WhiteBoard from "src/components/whiteBoard";
import Title from "src/atoms/title";
import Button from "src/components/button/button";
import Form from "src/components/form/form";
import SearchBox from "src/components/searchBox";
import Toaster from "src/atoms/toaster";
import axios from "axios";

interface AddDialogProps {
  scripts: any;
  onHide: () => void;
  portfolio: any;
}

export default function AddDialog({
  onHide,
  portfolio,
  scripts,
}: AddDialogProps) {
  // const [form] = useState(portfolio);
  const [scriptsForm, setScriptsForm] = useState(scripts);
  const [searchValue, setSearchValue] = useState<string | Date>("");
  const [type, setType] = useState<"error" | "success" | "warning" | "info">(
    "info"
  );
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleFormSubmit() {
    setLoading(true);

    axios
      .patch("/portfolioScript", {
        Portfolio: portfolio,
        Scripts: scriptsForm,
      })
      .then((response) => {
        const res = response.data;
        setMessage(res.message);
        setType(res.status === 200 ? "success" : "info");
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
      })
      .finally(() => setLoading(false));
  }

  function handleRemoveScript(selectedScript: string) {
    setScriptsForm((prevScripts: string[]) =>
      prevScripts.filter((script: string) => script !== selectedScript)
    );
  }

  function handleAddScript(selectedScript: string) {
    setScriptsForm(scriptsForm.concat(selectedScript));
  }

  return (
    <>
      <Dialog size={dialogSizes.LARGE} onHide={onHide} showUnderlay>
        <WhiteBoard>
          <Title divider>Add Symbols</Title>
          <ul className="badge-list badge-list--medium mb-20">
            {scriptsForm.map((script: string) => {
              return (
                <li className="badge-item" key={script}>
                  {script}
                  <button
                    className="btn-close"
                    onClick={() => handleRemoveScript(script)}
                  >
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>
          <Form onSubmit={handleFormSubmit} isVertical>
            <Form.Body>
              <Form.Input
                id="Symbol"
                label=""
                value={searchValue}
                onChange={(value: string | Date) => setSearchValue(value)}
                placeholder="Search symbol"
              />
              <SearchBox
                selectedScripts={scriptsForm}
                searchValue={searchValue}
                onAddScript={handleAddScript}
                onRemoveScript={handleRemoveScript}
              />
            </Form.Body>
            <Form.Actions>
              <Button isInline isWaiting={loading}>
                Submit
              </Button>
            </Form.Actions>
          </Form>
        </WhiteBoard>
      </Dialog>
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}
