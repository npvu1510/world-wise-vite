/* eslint-disable react/prop-types */
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';

import styles from './CountryList.module.css';

import { useCities } from '../contexts/CitiesContext';

function CountryList() {
  const { cities, isLoading, error } = useCities();

  if (error) return <Message message={error} />;
  if (isLoading) return <Spinner />;

  console.log(cities);
  const countries = cities.reduce((arr, city) => {
    console.log(arr);
    if (!arr.map((c) => c.country).includes(city.country)) {
      return [...arr, city];
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
