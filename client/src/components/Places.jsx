"use client";

import img1 from "/src/images/map-pin-fill (6).svg";
import { useCallback, useEffect, useMemo } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import Direction from "./Direction";
import PlacesAutocomplete from "./PlacesAutocomplete";
import NearbyPlaces from "./NearbyPlaces";
import ImageRender from "./ImageRender";

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
          setNearbyPlaces([]);
          console.log(nearbyPlaces[0]);
          // console.log(nearbyPlaces[0].photo[0].getUrl());
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
        <div className="mx-auto" style={{ height: "50vh", width: "50%" }}>
          <APIProvider apiKey="AIzaSyD_xecbv6K1U2uuCNfvwWhq_svY3PgP5Bs">
            <Map
              fullscreenControl={false}
              zoomControl={true}
              position={selected1}
              mapTypeId="hybrid"
              // mapId="8e0a97af9386fef"
            >
              <Direction
                selected1={selected1}
                selected2={selected2}
                setPositions={setPositions}
              />

              {nearbyPlaces.map((position, index) => (
                <Marker
                  key={index}
                  position={position}
                  // label={{
                  //   text: "hdddd efvdcds vreve",
                  //   fontSize: `${new window.google.maps.Size(20, 20)}`,
                  //   color: "black",
                  // }}
                  title={position.place}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                    scaledSize: new window.google.maps.Size(25, 25),
                  }}
                  onClick={(e) => {
                    let data = [];
                    nearbyPlaces.map((places) => {
                      if (e.latLng.lat() !== places.lat) {
                        data.push(places);
                      }
                    });
                    setNearbyPlaces(data);
                  }}
                ></Marker>
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
      <div>
        <h2>Tourist Places</h2>
        <ul>
          {nearbyPlaces.map((place, index) => (
            <div key={index} className="flex flex-row justify-between">
              <div>
                {" "}
                <li>{place.place}</li>
                <h1>Rating: {place.data.rating}</h1>
                <h2>Status: {place.data.business_status}</h2>
                <h3>Total Ratings: {place.data.user_ratings_total}</h3>
              </div>
              <ImageRender place={place} />
              <button
                onClick={() => {
                  console.log(place.photo[0].getUrl());
                  let data = [];
                  nearbyPlaces.map((places) => {
                    if (place.place !== places.place) {
                      data.push(places);
                    }
                  });

                  setNearbyPlaces(data);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
