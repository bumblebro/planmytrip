"use client";

import { useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import Direction from "./Direction";
import PlacesAutocomplete from "./PlacesAutocomplete";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD_xecbv6K1U2uuCNfvwWhq_svY3PgP5Bs",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Maps />
    </>
  );
}

function Maps() {
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ latitude, longitude });
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <form action="#">
        {" "}
        <div className="places-container">
          <PlacesAutocomplete
            setSelected={setSelected1}
            setShowMap={setShowMap}
          />
        </div>
        <div className="places-container">
          <PlacesAutocomplete
            setSelected={setSelected2}
            setShowMap={setShowMap}
          />
        </div>
        <button
          onClick={() => {
            setShowMap(true);
          }}
        >
          Submit
        </button>
      </form>
      {showMap ? (
        <div style={{ height: "50vh", width: "50%" }}>
          <APIProvider apiKey="AIzaSyD_xecbv6K1U2uuCNfvwWhq_svY3PgP5Bs">
            <Map fullscreenControl={false} zoomControl={true}>
              {" "}
              <Marker
                key={"Marker"} // Use a unique key for each marker
                position={{ lat: 12.5581, lng: 75.3908 }}
                title={"Namma Sullia"}
              />
              <Direction selected1={selected1} selected2={selected2} />
            </Map>
          </APIProvider>
        </div>
      ) : (
        <div style={{ height: "50vh", width: "50%" }}>
          <APIProvider apiKey="AIzaSyD_xecbv6K1U2uuCNfvwWhq_svY3PgP5Bs">
            <Map
              // center={location}
              zoom={9}
              fullscreenControl={false}
              zoomControl={true}
            >
              \{" "}
            </Map>
          </APIProvider>
        </div>
      )}
    </div>
  );
}
