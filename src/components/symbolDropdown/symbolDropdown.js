import { useState, useEffect } from "react";
import FormSelect from "src/components/formSelect";
import axios from "axios";

function SymbolDropdown({ selected, onChange, id = "Symbol" }) {
  const [data, setData] = useState([]);
  const DEFAULT_VALUE = "Select Symbol";

  useEffect(() => {
    axios
      .get("/symbols")
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setData(res.data);
        } else {
          alert(res.message);
        }
      })
      .catch((error) => alert(error.message));
  }, []);

  function handleDropdownChange(value, id) {
    onChange(value, id);
  }

  return (
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
  );
}

export default SymbolDropdown;
