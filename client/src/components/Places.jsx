"use client";
import img1 from "/src/images/map-pin-fill (6).svg";

import { useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import ContentLoader, { Code } from "react-content-loader";

import "@reach/combobox/styles.css";
import Direction from "./Direction";
import PlacesAutocomplete from "./PlacesAutocomplete";
import NearbyPlaces from "./NearbyPlaces";
import DisplayPlaces from "./DisplayPlaces";
import DisplayMap from "./DisplayMap";
import { useDispatch, useSelector } from "react-redux";
import {
  addActive,
  addPlace,
  addPositions,
  addRadius,
} from "../features/mapSlice";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded)
    return (
      <div className="w-9/12 mx-auto mt-10">
        <Code />
      </div>
    );
  return (
    <>
      <Maps />
    </>
  );
}

function Maps() {
  const dispatch = useDispatch();
  // const maps = useSelector((state) => {
  //   return state;
  // });
  const radius = useSelector((state) => {
    return state.radius;
  });

  const active = useSelector((state) => {
    return state.active;
  });
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  // const [showMap, setShowMap] = useState(false);
  // const [selRange, setSelRange] = useState(5000);
  const [selRangeinkm, setSelRangeInKm] = useState(5);
  // const [range, setRange] = useState(null);
  // const [location, setLocation] = useState({});
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
      <div className="flex flex-col gap-4 mx-6 h-svh lg:flex-row">
        <div className="flex flex-col items-center gap-4">
          <form
            className="flex flex-col items-center w-6/12 gap-2 mx-auto mt-11"
            action="#"
            onSubmit={async (e) => {
              e.preventDefault();
              dispatch(addPlace([]));
              dispatch(addPositions([]));

              // setRange(selRange);
              console.log(selected1);
              SetDistinctMarker(null);
              dispatch(addActive(true));
            }}
          >
            {" "}
            <PlacesAutocomplete
              setSelected={setSelected1}
              // setShowMap={setShowMap}
              placeholder={"Choose starting point"}
            />
            <PlacesAutocomplete
              setSelected={setSelected2}
              // setShowMap={setShowMap}
              placeholder={"Choose destination"}
            />
            <div className="flex flex-row">
              {" "}
              <select
                className="border border-solid rounded-md text-[.875rem] w-[15.5rem] px-2 py-1 border-1 outline-none   border-black focus:border-blue-600 focus:border-2 bg-[#374151] text-[#8690a2]"
                placeholder="Type"
                onClick={(e) => {
                  let val = e.target.value;
                  setSearchType(val);
                  // setRange(selRange);
                  dispatch(addActive(false));
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
            {/* <div className="flex items-center gap-2 text-[#3c573c] font-medium">
              <input
                className="w-50"
                type="range"
                min={0}
                max={25}
                step={1}
                value={radius / 1000}
                onChange={(e) => {
                  console.log(e.target.value);
                  // setSelRangeInKm(e.target.value);
                  let val = e.target.value * 1000;
                  dispatch(addRadius(val));
                  // setSelRange(val);
                  dispatch(addActive(false));
                }}
              />{" "}
              <div className="flex gap-1">
                <h1>{radius / 1000}</h1>
                <h1>Km</h1>
              </div>
            </div> */}
            <div className="flex items-center gap-2 text-[#3c573c] font-medium w-full justify-center">
              <input
                id="default-range"
                type="range"
                min={0}
                max={25}
                step={5}
                value={radius / 1000}
                onChange={(e) => {
                  console.log(e.target.value);
                  // setSelRangeInKm(e.target.value);
                  let val = e.target.value * 1000;
                  dispatch(addRadius(val));
                  // setSelRange(val);
                  dispatch(addActive(false));
                }}
                className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />{" "}
              <div className="flex gap-1">
                <h1>{radius / 1000}</h1>
                <h1>Km</h1>
              </div>
            </div>
            <button className="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-[#fefce1] hover:border-transparent">
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
              className="w-48 rounded-md bg-[#3b82f6] text-[#fefce1]"
              onClick={() => {
                SetDistinctMarker(null);
              }}
            >
              Show All Places on map
            </button>
          )}
        </div>

        {active ? (
          <DisplayMap
            selected1={selected1}
            selected2={selected2}
            SetKm={SetKm}
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
              <Map
                zoom={10}
                center={{ lat: 12.5580735, lng: 75.3907667 }}
                mapTypeId={"hybrid"}
              />{" "}
            </APIProvider>
          </div>
        )}
      </div>

      {km < 50000 && (
        <div>
          {active && <NearbyPlaces searchType={searchType} />}
          {active && <DisplayPlaces SetDistinctMarker={SetDistinctMarker} />}
        </div>
      )}
    </div>
  );
}
