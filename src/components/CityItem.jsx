/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import styles from './CityItem.module.css';
import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

function CityItem({ city }) {
  const {
    cityName: name,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;

  const { currentCity, deleteCity } = useCities();

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{name}</h3>
        <time className={styles.date}>{formatDate(date)}</time>

        <button
          className={styles.deleteBtn}
          onClick={async (e) => {
            e.preventDefault();

            console.log(id);
            deleteCity(id);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
