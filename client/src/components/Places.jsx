"use client";

import { useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import Direction from "./Direction";
import PlacesAutocomplete from "./PlacesAutocomplete";
import NearbyPlaces from "./NearbyPlaces";

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
  const [selRange, setSelRange] = useState(null);
  const [range, setRange] = useState(null);
  const [location, setLocation] = useState({});
  const [positions, setPositions] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

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
    <div>
      <form
        className="flex flex-col items-center"
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          setShowMap(true);
          setRange(selRange);
        }}
      >
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
        <div className="flex flex-row">
          {" "}
          <input
            type="text"
            placeholder="Range"
            onChange={(e) => {
              let val = e.target.value * 1000;
              setSelRange(val);
            }}
          />{" "}
          <h1>km</h1>
        </div>
        <button>Submit</button>
      </form>
      {showMap && (
        <div style={{ height: "80vh", width: "80%" }}>
          <APIProvider apiKey="AIzaSyD_xecbv6K1U2uuCNfvwWhq_svY3PgP5Bs">
            <Map fullscreenControl={false} zoomControl={true}>
              <Direction
                selected1={selected1}
                selected2={selected2}
                setPositions={setPositions}
              />

              {nearbyPlaces.map((position) => (
                <Marker
                  key={position.lat + "," + position.lng}
                  position={position}
                  label={"x"}
                  title={"Helloo"}
                />
              ))}
            </Map>
          </APIProvider>
        </div>
      )}
      <NearbyPlaces
        waypoints={positions}
        radius={range}
        setNearbyPlaces={setNearbyPlaces}
      />
    </div>
  );
}
