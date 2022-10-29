import { useState, useEffect } from "react";
import FormSelect from "src/components/formSelect";
import Toaster from "src/atoms/toaster";
import axios from "axios";

interface PortfolioDropdownProps {
  selected: string;
  onChange: (value: string, id: string) => void;
}

function PortfolioDropdown({ selected, onChange }: PortfolioDropdownProps) {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"error" | "success" | "warning" | "info">(
    "info"
  );
  const DEFAULT_VALUE = "Select portfolio";

  useEffect(() => {
    axios
      .get("/portfolio")
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setData(res.data);
        } else {
          setMessage(res.message);
          setType("info");
        }
      })
      .catch((error) => {
        setMessage(error.message);
        setType("error");
      });
  }, []);

  function handleDropdownChange(value: string, id: string) {
    onChange(value, id);
  }

  return (
    <>
      <FormSelect
        id="Portfolio"
        value={selected}
        label="Select Portfolio"
        onChange={handleDropdownChange}
      >
        <option value="">{DEFAULT_VALUE}</option>
        {data.map((item: any) => (
          <option value={item.Portfolio} key={item._id}>
            {item.Portfolio}
          </option>
        ))}
      </FormSelect>
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}

export default PortfolioDropdown;
