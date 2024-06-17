/* eslint-disable react/prop-types */
import CityItem from './CityItem';
import Spinner from './Spinner';
import Message from './Message';

import styles from './CityList.module.css';
import { useCities } from '../contexts/CitiesContext';

function CityList() {
  const { cities, isLoading, error } = useCities();

  if (error) return <Message message={error} />;
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Please add your first city" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
