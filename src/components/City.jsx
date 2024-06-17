/* eslint-disable */

import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import { useCities } from '../contexts/CitiesContext';

import Spinner from './Spinner';
import ButtonBack from './ButtonBack';

import styles from './City.module.css';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

function City() {
  // console.log('render City');
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentCity, fetchCity, isLoading } = useCities();

  //   console.log('city hiện tại: ', currentCity.cityName);
  useEffect(
    function () {
      fetchCity(id);
    },
    [id]
  );

  // DERIVED STATE
  const { cityName, emoji, date, notes } = currentCity;
  // console.log(currentCity);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
}

export default City;
