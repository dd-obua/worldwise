import { createContext, useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
const CitiesContext = createContext();

const baseUrl = 'http://localhost:8000';

const CitiesProvider = function ({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = function () {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
};

CitiesProvider.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export { CitiesProvider, useCities };
