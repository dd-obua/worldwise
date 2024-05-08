import { createContext, useContext, useEffect, useReducer } from "react";

import PropTypes from "prop-types";

const CitiesContext = createContext();

const baseUrl = "http://localhost:8000";
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const reducer = function (state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "cities/created":
      return {};

    case "cities/deleted":
      return {};

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type.");
  }
};

const CitiesProvider = function ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity } = state;

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${baseUrl}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
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

  const createCity = async function (newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error creating city...");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async function (id) {
    try {
      setIsLoading(true);
      await fetch(`${baseUrl}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting city...");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
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
