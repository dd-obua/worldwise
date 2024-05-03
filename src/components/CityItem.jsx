import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import styles from './CityItem.module.css';
import { useCities } from '../contexts/CitiesContexts';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

const CityItem = function ({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity } = useCities();

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id && styles['cityItem--active']
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
};

export default CityItem;
