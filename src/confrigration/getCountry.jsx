import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Country } from "../services/constants";
const Get_Country = () => {
  const dispatch = useDispatch();

  // country Data api start
    let Headers = {
      headers: {
        Authorization:
          "Basic aW5mb0Blc2VhcmNobG9naXguY29tOmZmOWZiMjY4NDZhMTYwZGI=",
      },
    };

    axios.get(Country(), Headers).then((res) => {
      const country = res.data;
      dispatch({ type: "GETCOUNTRY", payload: country });
    });
  // country Data api end //
};
export default Get_Country;
