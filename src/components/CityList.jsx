import { useCities } from '../contexts/CitiesContexts';

import PropTypes from 'prop-types';

import styles from './CityList.module.css';

import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';

const CityList = function () {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking on a city on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities && cities.map((city) => <CityItem city={city} key={city.id} />)}
    </ul>
  );
};

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CityList;
