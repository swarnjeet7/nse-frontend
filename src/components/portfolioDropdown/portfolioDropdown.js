import { useState, useEffect } from "react";
import FormSelect from "src/components/formSelect";
import axios from "axios";

function PortfolioDropdown({ selected, onChange, id = "Portfolio" }) {
  const [data, setData] = useState([]);
  const DEFAULT_VALUE = "Select portfolio";

  useEffect(() => {
    axios
      .get("/portfolio")
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
      id="Portfolio"
      value={selected}
      label="Select Portfolio"
      onChange={handleDropdownChange}
    >
      <option value={null}>{DEFAULT_VALUE}</option>
      {data.map((item) => (
        <option value={item.Portfolio} key={item._id}>
          {item.Portfolio}
        </option>
      ))}
    </FormSelect>
  );
}

export default PortfolioDropdown;
