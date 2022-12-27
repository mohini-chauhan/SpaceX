import React, { useContext, useState, useEffect, createContext } from "react";
import getCapsuleData from "../api/api";

const APIContext = createContext();

function CapsuleProvider({ children }) {
  // Initialize state
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    getCapsuleData()
      .then(function (response) {
        setData(response.data);
        setFilterData(response.data);
        setIsLoading(false);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <APIContext.Provider value={{ data, isLoading, filterData, setFilterData }}>
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
