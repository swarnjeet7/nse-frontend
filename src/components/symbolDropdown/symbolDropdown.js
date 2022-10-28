import { useState, useEffect } from "react";
import FormSelect from "src/components/formSelect";
import Toaster from "src/atoms/toaster";
import axios from "axios";

function SymbolDropdown({ selected, onChange, id = "Symbol" }) {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const [toasterType, setToasterType] = useState(null);
  const DEFAULT_VALUE = "Select Symbol";

  useEffect(() => {
    axios
      .get("/symbols")
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setData(res.data);
        } else {
          setMessage(res.message);
          setToasterType("info");
        }
      })
      .catch((error) => {
        setMessage(error.message);
        setToasterType("error");
      });
  }, []);

  function handleDropdownChange(value, id) {
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
        {data.map((item) => (
          <option value={item.name} key={item._id}>
            {item.name}
          </option>
        ))}
      </FormSelect>
      {message && (
        <Toaster type={toasterType} message={message} onHide={setMessage} />
      )}
    </>
  );
}

export default SymbolDropdown;
