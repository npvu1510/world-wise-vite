// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

// core
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom hooks
import useUrlLocation from '../hooks/useUrlLocation';
import useReverseGeocode from '../hooks/useReverseGeocode';

// My Components
import Button from './Button';
import ButtonBack from './ButtonBack';
import Spinner from './Spinner';
import Message from './Message';

import DatePicker from 'react-datepicker';

// Styles
import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from '../contexts/CitiesContext';

function Form() {
  console.log('Render Form');
  const navigate = useNavigate();

  const { createCity, isLoading } = useCities();

  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  const { lat, lng } = useUrlLocation();
  const {
    isLoading: isReversing,
    error: reverseError,
    countryName,
    cityName,
    setCityName,
    flag,
  } = useReverseGeocode(lat, lng);

  async function handleSubmit(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country: countryName,
      emoji: flag,
      date,
      notes,
      position: { lat, lng },
      id: Math.trunc(Math.random() * 10000000) + 1000000,
    };

    await createCity(newCity);
    navigate('/app/cities', { replace: true });
  }

  if (isReversing) return <Spinner />;

  if (reverseError) return <Message message={reverseError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{flag}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
