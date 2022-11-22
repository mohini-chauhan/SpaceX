import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const APIContext = createContext();

function CapsuleProvider({children}) {
    // Initialize state
    const [data, setData] = useState([]);
    const [filterData,setFilterData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data
    useEffect(()=>{
        let url = "https://api.spacexdata.com/v3/capsules";
        axios
            .get(url)
            .then(function (response) {
                setData(response.data);
                setFilterData(response.data)
                setIsLoading(false);                
            })
            .catch((error) => console.log(error));
    },[])

  return (
    <APIContext.Provider value={{ data, isLoading,filterData,setFilterData }}>
        {children}
    </APIContext.Provider>
  )
}

export default CapsuleProvider;

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPI() {
    const context = useContext(APIContext);
    if (context === undefined) {
      throw new Error("Context must be used within a Provider");
    }
    return context;
  }