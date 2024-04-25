"use client";

import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

function MapView() {
  const position = { lat: 43.6532, lng: -79.3832 };

  return (
    <div style={{ height: "50vh", width: "50%" }}>
      <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
        <Map
          center={position}
          zoom={9}
          fullscreenControl={false}
          zoomControl={true}
        >
          \{" "}
        </Map>
      </APIProvider>
    </div>
  );
}

export default MapView;
