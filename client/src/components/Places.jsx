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
      <div className="flex h-svh">
        <form
          className="flex flex-col items-center w-6/12 gap-2 mx-auto mt-11"
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
          <PlacesAutocomplete
            setSelected={setSelected1}
            setShowMap={setShowMap}
            placeholder={"Choose starting point"}
          />
          <PlacesAutocomplete
            setSelected={setSelected2}
            setShowMap={setShowMap}
            placeholder={"Choose destination"}
          />
          <div className="flex flex-row">
            {" "}
            <input
              className="border border-solid rounded-md text-[.875rem] pr-20 pl-2 py-1.5 border-1 outline-none  border-black focus:border-blue-600 focus:border-2 "
              type="text"
              placeholder="Range in km"
              onChange={(e) => {
                let val = e.target.value * 1000;
                setSelRange(val);
              }}
            />{" "}
          </div>
          <button className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent">
            Submit
          </button>
        </form>

        {showMap ? (
          <div className="w-full">
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
        ) : (
          <div className="w-full">
            <APIProvider apiKey="AIzaSyD_xecbv6K1U2uuCNfvwWhq_svY3PgP5Bs">
              <Map
                fullscreenControl={false}
                zoomControl={true}
                position={{ lat: 12.8060661, lng: 74.9461935 }}
                mapTypeId="hybrid"
                // mapId="8e0a97af9386fef"
              ></Map>
            </APIProvider>
          </div>
        )}
      </div>
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
