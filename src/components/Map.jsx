import PropTypes from "prop-types";

import { useSearchParams } from "react-router-dom";

import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContexts";

const Map = function () {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  // const center =
  //   mapLat && mapLng ? [parseFloat(mapLat), parseFloat(mapLng)] : [40, 0];

  mapPosition, useSearchParams, setMapPosition, setSearchParams;

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={[mapLat || 40, mapLng || 0]} />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = function ({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
};

ChangeCenter.propTypes = {
  position: PropTypes.array,
};

export default Map;
