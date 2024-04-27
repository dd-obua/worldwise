import PropTypes from 'prop-types';
import styles from './CountryList.module.css';

import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';

const CountryList = function ({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking on a city on the map" />;

  const countries = cities.reduce((arr, city) => {
    return !arr.map((el) => el.country).includes(city.country)
      ? [...arr, { country: city.country, emoji: city.emoji }]
      : arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries &&
        countries.map((country, index) => <CountryItem country={country} key={index} />)}
    </ul>
  );
};

CountryList.propTypes = {
  cities: PropTypes.array,
  country: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

export default CountryList;
