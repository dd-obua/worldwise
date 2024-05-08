// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import styles from "./Form.module.css";

import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContexts";

import { convertToEmoji } from "../supportFiles/convertToEmoji";

import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity } = useCities();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");

  isLoadingGeocoding, emoji, country;

  const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  useEffect(
    function () {
      if (!lat || !lng) return;

      const fetchCityData = async function () {
        try {
          setIsLoadingGeocoding(false);
          setGeocodingError("");

          const res = await fetch(
            `${baseUrl}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else."
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      };

      fetchCityData();
    },
    [lat, lng]
  );

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    createCity(newCity);
  };

  if (isLoadingGeocoding) return <Spinner />;
  if (!lat || !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </p>

      <p className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </p>

      <p className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </p>

      {/* <Button>Clever</Button> */}
      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        {/* <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button> */}
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
