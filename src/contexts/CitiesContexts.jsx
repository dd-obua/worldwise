import { createContext, useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";

const CitiesContext = createContext();

const baseUrl = "http://localhost:8000";

const CitiesProvider = function ({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  const getCity = async function (id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = function () {
  const value = useContext(CitiesContext);
  if (value === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return value;
};

CitiesProvider.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export { CitiesProvider, useCities };
