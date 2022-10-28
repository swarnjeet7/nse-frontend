import { useState, useEffect } from "react";
import FormSelect from "src/components/formSelect";
import Toaster from "src/atoms/toaster";
import axios from "axios";

function PortfolioDropdown({ selected, onChange, id = "Portfolio" }) {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const [toasterType, setToasterType] = useState(null);
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
      {message && <Toaster type={toasterType} message={message} />}
    </>
  );
}

export default PortfolioDropdown;
