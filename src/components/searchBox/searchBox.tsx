import MultiCheckbox from "../multiCheckbox";
import { useState, useEffect } from "react";
import axios from "axios";
import Toaster from "src/atoms/toaster";
import "./searchBox.scss";
import { ToasterTypes } from "src/atoms/toaster/toaster";

export default function SearchBox({
  searchValue,
}: {
  searchValue: string | Date;
}) {
  const [originSymbols, setOriginSymbols] = useState([]);
  const [symbolList, setSymbolList] = useState(originSymbols);
  const [symbols, setSymbols] = useState("");
  const [type, setType] = useState<ToasterTypes>("info");
  const [message, setMessage] = useState("");

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

  function handleClick(symbol: string) {
    setSymbols((prevSymbols) => {
      const symbolArr = prevSymbols.split(",");
      if (symbolArr.includes(symbol)) {
        const arr = symbolArr.filter((symbolName) => symbolName !== symbol);
        return arr.join(",");
      }
      return prevSymbols.concat(`,${symbol}`);
    });
  }

  return (
    <>
      <div className="search-box">
        <MultiCheckbox
          list={symbolList}
          values={symbols}
          onSelect={handleClick}
        />
      </div>
      {message && <Toaster type={type} message={message} onHide={setMessage} />}
    </>
  );
}
