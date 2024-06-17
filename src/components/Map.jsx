/* eslint-disable */
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { useGeolocation } from '../hooks/useGeolocation';

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  useMapEvents,
} from 'react-leaflet';

import { useCities } from '../contexts/CitiesContext';

import Spinner from './Spinner';
import Button from './Button';

import { useEffect, useState } from 'react';
import useUrlLocation from '../hooks/useUrlLocation';

import styles from './Map.module.css';

function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([55.751244, 37.618423]);

  const {
    isLoading: isLoadingGeoLocation,
    position: geoLocation,
    getPosition: getGeoLocation,
    setPosition: setGeoLocation,
  } = useGeolocation();

  // const { id } = useParams();
  const { lat, lng } = useUrlLocation();

  // console.log(`render Map: ${currentCity}`);

  useEffect(
    function () {
      if (!lat || !lng) return;
      setMapPosition([lat, lng]);
      setGeoLocation(null);
    },
    [lat, lng]
  );
  // console.log(`geoLocation: ${JSON.stringify(geoLocation)}`);
  useEffect(
    function () {
      if (!geoLocation) return;
      setMapPosition([geoLocation.lat, geoLocation.lng]);
      // navigate(`form?lat=${geoLocation.lat}&lng=${geoLocation.lng}`, {
      //   replace: true,
      // });
    },
    [geoLocation]
  );

  // console.log('Rerender Map');
  return (
    <div className={styles.mapContainer}>
      {!geoLocation && (
        <Button
          type="position"
          onClick={(e) => {
            getGeoLocation();
          }}
        >
          {isLoadingGeoLocation && 'Loading...'}
          {!isLoadingGeoLocation && !geoLocation && 'Use my location'}
        </Button>
      )}
      {/* {isLoading && <Spinner />} */}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              {city.emoji}
              {city.cityName}
              <br /> {`(${city.position.lat}, ${city.position.lng})`}
            </Popup>
          </Marker>
        ))}
        <ChangePosition position={mapPosition} />
        <OnMapClick />
      </MapContainer>
      {/* <button
                type="submit"
                onClick={() => {
                    setSearchParams({ lat: 69, lng: 96 });
                }}
            ></button> */}
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function OnMapClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`, { replace: true });
    },
  });

  return null;
}

export default Map;
