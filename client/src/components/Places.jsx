"use client";
import img1 from "/src/images/map-pin-fill (6).svg";

import { useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import Direction from "./Direction";
import PlacesAutocomplete from "./PlacesAutocomplete";
import NearbyPlaces from "./NearbyPlaces";
import DisplayPlaces from "./DisplayPlaces";
import DisplayMap from "./DisplayMap";
import { useSelector } from "react-redux";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
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
  const maps = useSelector((state) => {
    return state;
  });
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [selRange, setSelRange] = useState(5000);
  const [selRangeinkm, setSelRangeInKm] = useState(5);
  const [range, setRange] = useState(null);
  const [location, setLocation] = useState({});
  const [positions, setPositions] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [searchType, setSearchType] = useState("tourist_attraction");
  const [km, SetKm] = useState(null);
  const [distinctMarker, SetDistinctMarker] = useState(null);

  useEffect(() => {
    if (km !== null && km > 50000) {
      alert("Please select the locations with the distance less than 50KM");
    }
  }, [km]);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(success, error);
  //   } else {
  //     console.log("Geolocation not supported");
  //   }
  //   function success(position) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;
  //     setLocation({ latitude, longitude });
  //     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  //   }
  //   function error() {
  //     console.log("Unable to retrieve your location");
  //   }
  // }, []);

  return (
    <div>
      <div className="flex flex-col h-svh lg:flex-row gap-4 mx-6">
        <div className="flex flex-col  items-center gap-4">
          <form
            className="flex flex-col items-center w-6/12 gap-2 mx-auto mt-11"
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              setShowMap(true);
              setRange(selRange);
              setShowMap(true);
              console.log(selected1);
              SetDistinctMarker(null);
              setNearbyPlaces([]);
              console.log(maps);
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
              <select
                className="border border-solid rounded-md text-[.875rem] w-[15.5rem] px-2 py-1 border-1 outline-none   border-black focus:border-blue-600 focus:border-2 "
                placeholder="Type"
                onClick={(e) => {
                  let val = e.target.value;
                  setSearchType(val);
                  setRange(selRange);
                  setShowMap(false);
                }}
                name="Types"
                id=""
              >
                <option value="tourist_attraction">Tourist attractions</option>
                <option value="restaurant">restaurant</option>
                <option value="atm">atm</option>
                <option value="gas_station">gas station</option>
                <option value="museum">museum</option>
                <option value="park">park</option>
                <option value="hotel">hotel</option>
                <option value="pharmacy">pharmacy</option>
                <option value="grocery_store">grocery store</option>
                <option value="shopping_mall">shopping mall</option>
              </select>
            </div>{" "}
            {/* <div className="flex flex-row">
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
          </div> */}{" "}
            <div className="flex items-center gap-2">
              <input
                className="w-48"
                type="range"
                min={0}
                max={25}
                step={5}
                value={selRangeinkm}
                onChange={(e) => {
                  console.log(e.target.value);
                  setSelRangeInKm(e.target.value);
                  let val = selRangeinkm * 1000;
                  setSelRange(val);
                  setShowMap(false);
                }}
              />
              <span>{selRangeinkm} Km</span>
            </div>
            <button className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent">
              Submit
            </button>{" "}
            {/* {km > 50000 && (
              <h1>
                The Distance between the current locations is{" "}
                <span className="text-red-500">{km / 1000}kms</span>. It must be
                less than <span className="text-red-500">50kms</span>
              </h1>
            )} */}
          </form>
          {distinctMarker && (
            <button
              className="w-48 rounded-md bg-[#3b82f6] text-white"
              onClick={() => {
                SetDistinctMarker(null);
              }}
            >
              Show All Places on map
            </button>
          )}
        </div>

        {showMap ? (
          <DisplayMap
            nearbyPlaces={nearbyPlaces}
            selected1={selected1}
            selected2={selected2}
            setPositions={setPositions}
            SetKm={SetKm}
            setNearbyPlaces={setNearbyPlaces}
            distinctMarker={distinctMarker}
          />
        ) : (
          <div className="w-full">
            {/* <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
              <Map
                fullscreenControl={false}
                zoomControl={true}
                position={{ lat: 12.5580735, lng: 75.3907667 }}
                // mapTypeId="hybrid"
                // mapId="8e0a97af9386fef"
              ></Map>
            </APIProvider> */}
            <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
              <Map zoom={10} center={{ lat: 12.5580735, lng: 75.3907667 }} />{" "}
            </APIProvider>
          </div>
        )}
      </div>

      {km < 50000 && (
        <div>
          <NearbyPlaces
            waypoints={positions}
            radius={range}
            searchType={searchType}
          />
          {showMap && (
            <DisplayPlaces
              nearbyPlaces={nearbyPlaces}
              SetDistinctMarker={SetDistinctMarker}
              setNearbyPlaces={setNearbyPlaces}
            />
          )}{" "}
        </div>
      )}
    </div>
  );
}
