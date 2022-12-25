import _ from "lodash";
import React, { useState } from "react";
import axios from "axios";

interface BadgeProps {
  children: string;
  isClickAble?: boolean;
  loading?: boolean;
  onClick?: (value: string) => void;
}

export default function Badge({
  children,
  isClickAble = false,
  loading = false,
  onClick = _.noop,
}: BadgeProps) {
  function handleClick() {
    onClick(children);
    // axios
    //   .get("/fo-reports/bhavcopy", {
    //     params: {
    //       ..._.pickBy(form, _.identity),
    //     },
    //   })
    //   .then((response) => {
    //     const res = response.data;
    //     if (res.status === 200) {
    //       setForm(res.data);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => setLoading(false));
  }

  return (
    <li className="badge-item">
      {children}
      {isClickAble ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="close"
          onClick={handleClick}
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
        </svg>
      ) : null}

      {loading && "loading"}
    </li>
  );
}
