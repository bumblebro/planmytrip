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
  addnewList,
  addselected1,
  addselected2,
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
  const radius = useSelector((state) => {
    return state.radius;
  });

  const active = useSelector((state) => {
    return state.active;
  });
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [searchType, setSearchType] = useState("tourist_attraction");
  const [km, SetKm] = useState(null);
  const [distinctMarker, SetDistinctMarker] = useState(null);

  useEffect(() => {
    if (km !== null && km > 50000) {
      alert("Please select the locations with the distance less than 50KM");
    }
  }, [km]);

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-4 mx-6 sm:h-[480px]  sm:flex-row h-full">
        <div className="flex flex-col items-center gap-4">
          <form
            className="flex flex-col items-center w-6/12 gap-2 mx-auto sm:mt-11"
            action="#"
            onSubmit={async (e) => {
              e.preventDefault();
              dispatch(addnewList([]));
              dispatch(addPlace([]));
              dispatch(addPositions([]));
              dispatch(addselected1(selected1));
              dispatch(addselected2(selected2));
              console.log(selected1);
              SetDistinctMarker(null);
              dispatch(addActive(true));
            }}
          >
            <PlacesAutocomplete
              setSelected={setSelected1}
              placeholder={"📍 Where are you starting your trip?"}
              required
            />
            <PlacesAutocomplete
              setSelected={setSelected2}
              placeholder={"🎯 What's your destination of choice?"}
            />
            {/* IMPORTANT */}
            {/* ----------------------------------------------------------------------------------------------------- */}
            {/* <div className="flex flex-col mb-2">
              <h2 className="mb-1 text-sm font-medium text-slate-800">
                🏖️ What's the type of place?
              </h2>
              <select
                className="border border-solid rounded-[4px]  border-slate-400 text-[.875rem] w-[15.5rem] px-2 py-1 border-1 outline-none    focus:border-blue-600 focus:border-2 bg-[#ffffff] text-[#333239] appearance-none"
                placeholder="Type"
                onClick={(e) => {
                  let val = e.target.value;
                  setSearchType(val);
                  // setRange(selRange);
                  dispatch(addActive(false));
                }}
                name="Types"
                id=""
                required
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
            </div> */}
            {/* <h1 className="text-[.875rem] w-full text-center">Select the Range👇</h1> */}
            <div className="flex items-center gap-2 text-[#3c573c] font-medium w-full justify-center">
              <div className="flex items-center gap-1">
                <h1>🔁</h1>
                <h1 className="text-sm font-medium text-slate-700">Range</h1>
              </div>
              <input
                required
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
            <button className="flex items-center justify-center gap-2 px-3 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:px-4 md:py-2 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Submit Trip
            </button>{" "}
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
          <div className="w-full h-96 sm:h-auto">
            <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
              <Map
                fullscreenControl={false}
                zoomControl={true}
                center={{ lat: 12.5580735, lng: 75.3907667 }}
                zoom={10}
                mapTypeId="roadmap"
                mapId="d6266d464c671dbf"
              ></Map>
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
