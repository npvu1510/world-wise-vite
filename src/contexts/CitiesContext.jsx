/* eslint-disable */
import { createContext, useContext, useState, useEffect } from 'react';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // console.log('render CitiesProvider');
  // console.log(currentCity, cities, isLoading);
  // console.log(`isLoading: ${isLoading}`);

  useEffect(function () {
    const fetchCities = async function () {
      try {
        setError('');
        setIsLoading(true);

        const res = await fetch('http://localhost:8000/cities');

        if (res.status !== 200)
          throw new Error('Something went wrong when fetching');

        const data = await res.json();
        setCities(data);
      } catch (err) {
        // console.log(`⚠️⚠️⚠️`, err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const fetchCity = async function (id) {
    try {
      setError('');
      setIsLoading(true);

      const res = await fetch(`http://localhost:8000/cities/${id}`);

      if (res.status !== 200)
        throw new Error('Something went wrong when fetching');

      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      // console.log(`⚠️⚠️⚠️`, err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createCity = async function (newCity) {
    try {
      setError('');
      setIsLoading(true);

      const res = await fetch(`http://localhost:8000/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'content-type': 'application/json' },
      });

      if (!res.ok) throw new Error('Something went wrong when fetching');

      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (err) {
      console.log(`⚠️⚠️⚠️`, err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async function (id) {
    try {
      setError('');
      setIsLoading(true);

      const res = await fetch(`http://localhost:8000/cities/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      });

      if (!res.ok) throw new Error('Something went wrong when fetching');

      const newCityList = [...cities].filter((city) => city.id !== id);
      setCities(newCityList);
    } catch (err) {
      console.log(`⚠️⚠️⚠️`, err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        fetchCity,
        deleteCity,
        isLoading,
        error,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('Please use this context within this context component');

  return context;
}

export { CitiesProvider, useCities };
