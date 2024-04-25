"use client";

import img1 from "/src/images/map-pin-fill (6).svg";
import { useCallback, useEffect, useMemo } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import Direction from "./Direction";
import PlacesAutocomplete from "./PlacesAutocomplete";
import NearbyPlaces from "./NearbyPlaces";
import ImageRender from "./ImageRender";

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
            setShowMap(true);
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
          <div className="flex flex-row ">
            {" "}
            <select
              className="border border-solid rounded-md text-[.875rem] w-64 px-2 py-1 border-1 outline-none   border-black focus:border-blue-600 focus:border-2 "
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
          </button>
        </form>

        {showMap ? (
          <div className="w-full">
            <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
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
                      console.log(nearbyPlaces);
                    }}
                  ></Marker>
                ))}
              </Map>
            </APIProvider>
          </div>
        ) : (
          <div className="w-full">
            <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
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
        searchType={searchType}
      />
      {showMap && (
        <div className="mx-4 my-8">
          <h2 className="pb-2 pl-8 text-xl text-slate-800">
            Results ({nearbyPlaces.length})
          </h2>
          <ul className="grid grid-cols-2 gap-4">
            {nearbyPlaces.map((place, index) => (
              <div
                key={index}
                className="flex flex-row items-start justify-between pb-4 border-solid border-1black border-[1px] px-8 py-4"
              >
                <div className="flex flex-col justify-center">
                  <li className="text-xl font-medium">{place.place}</li>
                  {place.data.rating ? (
                    <div className="flex items-center justify-start gap-1">
                      <h1 className="text-sm text-slate-500">
                        {place.data.rating || "0.0"}
                      </h1>
                      <div className="pb-0.5">
                        <StarRatings
                          rating={place.data.rating}
                          starRatedColor="#fbbc04"
                          // changeRating={this.changeRating}
                          numberOfStars={5}
                          name="rating"
                          starDimension="15px"
                          starSpacing="1px"
                        />
                      </div>
                      <span className="text-sm text-slate-500">
                        ({place.data.user_ratings_total || 0})
                      </span>{" "}
                    </div>
                  ) : (
                    <div className="flex items-center justify-start gap-1">
                      <h1 className="text-sm text-slate-500">No reviews</h1>
                    </div>
                  )}

                  <h1 className="text-sm text-slate-500">
                    {place.data.vicinity}
                  </h1>
                  <h2 className="text-sm text-slate-500">
                    {place.data.business_status === "OPERATIONAL" && (
                      <span className="text-green-600">Open</span>
                    )}
                    {place.data.business_status === "CLOSED_TEMPORARILY" && (
                      <span className="text-[#dd3d3d]">Temporarily closed</span>
                    )}
                  </h2>
                </div>

                <ImageRender place={place} />

                {/* <button
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
              </button> */}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
