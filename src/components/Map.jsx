import { useSearchParams } from 'react-router-dom';

import styles from './Map.module.css';

const Map = function () {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  setSearchParams;

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h2>
        Position: {lat} {lng}
      </h2>
    </div>
  );
};

export default Map;
