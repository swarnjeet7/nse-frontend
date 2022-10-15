import MultiCheckbox from "../multiCheckbox";
import { useState, useEffect } from "react";
import axios from "axios";

import "./searchBox.scss";

export default function SearchBox({ onTextChange }) {
  const [originSymbols, setOriginSymbols] = useState([]);
  const [symbolList, setSymbolList] = useState(originSymbols);
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    axios
      .get("/symbols")
      .then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setOriginSymbols(res.data);
          setSymbolList(res.data);
        } else {
          alert(res.message);
        }
      })
      .catch((error) => alert(error.message));
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
    <div className="search-box">
      <MultiCheckbox
        Multiple
        list={symbolList}
        label="name"
        value={symbols}
        onSelect={handleClick}
      />
    </div>
  );
}
