import MultiCheckbox from "../multiCheckbox";
import { useState, useEffect } from "react";
import axios from "axios";
import Toaster from "src/atoms/toaster";

import "./searchBox.scss";

export default function SearchBox({ onTextChange }) {
  const [originSymbols, setOriginSymbols] = useState([]);
  const [symbolList, setSymbolList] = useState(originSymbols);
  const [symbols, setSymbols] = useState([]);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios
      .get("/symbols")
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setOriginSymbols(res.data);
          setSymbolList(res.data);
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

  function handleClick(symbol) {
    setSymbols((prevState) => {
      const isExisted = prevState.some((obj) => obj.name === symbol.name);
      if (isExisted) {
        return prevState.filter((obj) => obj.name !== symbol.name);
      }
      return [...prevState, symbol];
    });
  }

  return (
    <>
      <div className="search-box">
        <MultiCheckbox
          Multiple
          list={symbolList}
          label="name"
          value={symbols}
          onSelect={handleClick}
        />
      </div>
      <Toaster type={type} message={message} />
    </>
  );
}
