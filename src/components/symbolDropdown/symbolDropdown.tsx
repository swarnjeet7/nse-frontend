import { useState, useEffect } from "react";
import FormSelect from "src/components/formSelect";
import Toaster from "src/atoms/toaster";
import axios from "axios";

interface SymbolDropdownProps {
  selected?: string;
  onChange: (value: string, id: string) => void;
}

function SymbolDropdown({ selected, onChange }: SymbolDropdownProps) {
  const DEFAULT_VALUE = "Select Symbol";
  const [data, setData] = useState([]);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"error" | "success" | "warning" | "info">(
    "info"
  );

  useEffect(() => {
    axios
      .get("/symbols")
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
        id="Symbol"
        value={selected}
        label="Select Symbol"
        onChange={handleDropdownChange}
      >
        <option>{DEFAULT_VALUE}</option>
        {data.map((item: any) => (
          <option value={item.name} key={item._id}>
            {item.name}
          </option>
        ))}
      </FormSelect>
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}

export default SymbolDropdown;
