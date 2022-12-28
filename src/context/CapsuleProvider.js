import React, { useContext, useState, useEffect, createContext } from "react";
import getCapsuleData from "../api/api";

const APIContext = createContext();

const makeQuery = (params) => {
  let query = "?";
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      query =
        query === "?"
          ? query.concat(key, "=", params[key])
          : query.concat("&", key, "=", params[key]);
    }
  });
  return query.length > 1 ? query : "";
};

function CapsuleProvider({ children }) {
  // Initialize state
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    status: null,
    type: null,
    launchDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstTime, setFirstTime] = useState(true);

  // Fetch data
  useEffect(() => {
    setIsLoading(true);
    getCapsuleData(makeQuery(filter))
      .then(function (response) {
        setData(response.data);
        setIsLoading(false);
        setFirstTime(false);
      })
      .catch((error) => console.log(error));
  }, [filter]);

  return (
    <APIContext.Provider
      value={{
        data,
        isLoading,
        isFirstTime,
        filter,
        setFilter,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export default CapsuleProvider;

// Create a hook to use the APIContext
export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
