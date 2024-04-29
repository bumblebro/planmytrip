import { useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import Direction from "./Direction";
import PlacesAutocomplete from "./PlacesAutocomplete";
import NearbyPlaces from "./NearbyPlaces";
import DisplayPlaces from "./DisplayPlaces";
function DisplayMap({
  nearbyPlaces,
  selected1,
  selected2,
  setPositions,
  SetKm,
  setNearbyPlaces,
}) {
  return (
    <div className="w-full">
      <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
        <Map
          fullscreenControl={false}
          zoomControl={true}
          position={selected1}
          // mapTypeId="hybrid"
          // mapId="8e0a97af9386fef"
        >
          <Direction
            selected1={selected1}
            selected2={selected2}
            setPositions={setPositions}
            SetKm={SetKm}
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
  );
}

export default DisplayMap;
