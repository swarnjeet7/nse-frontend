import _ from "lodash";
import MultiCheckbox from "../multiCheckbox";
import { useState, useEffect } from "react";
import axios from "axios";
import Toaster from "src/atoms/toaster";
import "./searchBox.scss";
import { ToasterTypes } from "src/atoms/toaster/toaster";

export default function SearchBox({
  searchValue,
  onAddScript,
  onRemoveScript,
  selectedScripts,
}: {
  searchValue: string | Date;
  onAddScript: (value: string) => void;
  onRemoveScript: (value: string) => void;
  selectedScripts: string[];
}) {
  const [originSymbols, setOriginSymbols] = useState([]);
  const [symbolList, setSymbolList] = useState(originSymbols);
  const [symbols, setSymbols] = useState(selectedScripts.join(","));
  const [type, setType] = useState<ToasterTypes>("info");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSymbols(selectedScripts.join(","));
  }, [selectedScripts]);

  useEffect(() => {
    if (!searchValue) return setSymbolList(originSymbols);
    const newSybmolList = originSymbols.filter((symbolObj: any) => {
      const symbol = _.toLower(symbolObj.name);
      return symbol.includes(String(searchValue));
    });
    setSymbolList(newSybmolList);
  }, [searchValue]);

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
        onRemoveScript(symbol);
        return arr.join(",");
      }
      onAddScript(symbol);
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
