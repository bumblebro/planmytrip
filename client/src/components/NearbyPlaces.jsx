// import { useState, useEffect } from "react";
// import { useLoadScript } from "@react-google-maps/api";
// import { useDispatch, useSelector } from "react-redux";
// import { addPlace, addPositions } from "../features/mapSlice";

// const libraries = ["places"]; // Include the Places library

// const NearbyPlaces = ({ searchType }) => {
//   const dispatch = useDispatch();
//   const waypoints = useSelector((state) => {
//     console.log(state.positions);
//     return state.positions;
//   });

//   const radius = useSelector((state) => {
//     return state.radius;
//   });

//   const [nearbyPlaces, setNearbyPlaces] = useState([]);
//   const [result, SetResult] = useState([]);
//   const apiKey = import.meta.env.VITE_API_KEY; // Replace with your Google Maps API key

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: apiKey,
//     libraries,
//   });

//   const loadPlacesForWaypoint = (waypoint) => {
//     if (!isLoaded) return; // Skip if Google Maps API is not loaded

//     const service = new google.maps.places.PlacesService(
//       document.createElement("div")
//     );
//     const request = {
//       location: waypoint,
//       radius: radius,
//       type: [searchType], // Change type for different categories
//     };

//     service.nearbySearch(request, async (results, status) => {
//       if (status === google.maps.places.PlacesServiceStatus.OK) {
//         setNearbyPlaces((prevPlaces) => [
//           ...prevPlaces,
//           ...results.map((place) => {
//             return {
//               data: place,
//               place: place.name,
//               lat: place.geometry.location.lat(),
//               lng: place.geometry.location.lng(),
//               waypoint, // Add waypoint information for clarity
//               photo: place.photos,
//               placeid: place.place_id,
//               added: false,
//             };
//           }),
//         ]);
//         console.log(nearbyPlaces);
//       }
//     });
//   };

//   useEffect(() => {
//     const uniquelist = nearbyPlaces.filter(
//       (obj, index, self) =>
//         index === self.findIndex((t) => t.placeid === obj.placeid)
//     );
//     dispatch(addPlace(uniquelist));
//   }, [nearbyPlaces]);

//   useEffect(() => {
//     {
//       waypoints && waypoints.map((waypoint) => loadPlacesForWaypoint(waypoint));
//     }
//   }, [waypoints, radius, isLoaded]); // Dependencies include all waypoints
// };

// export default NearbyPlaces;

import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { addPlace, addPositions } from "../features/mapSlice";

const libraries = ["places"]; // Include the Places library

const NearbyPlaces = ({ searchType }) => {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_API_KEY; // Replace with your Google Maps API key

  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  const waypoints = useSelector((state) => {
    console.log(state.positions);
    return state.positions;
  });


  const radius = useSelector((state) => {
    return state.radius;
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const loadPlacesForWaypoint = (waypoint) => {
    if (!isLoaded) return; // Skip if Google Maps API is not loaded

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      location: waypoint,
      radius: radius,
      type: [searchType], // Change type for different categories
    };

    service.nearbySearch(request, async (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setNearbyPlaces((prevPlaces) => [
          ...prevPlaces,
          ...results.map((place) => {
            return {
              data: place,
              place: place.name,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              waypoint, // Add waypoint information for clarity
              photo: place.photos,
              placeid: place.place_id,
              added: false,
            };
          }),
        ]);

        console.log(nearbyPlaces);
      }
    });
  };

  useEffect(() => {
    const uniquelist = nearbyPlaces.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.placeid === obj.placeid)
    );
    dispatch(addPlace(uniquelist));
  }, [nearbyPlaces]);

  useEffect(() => {
    {
      waypoints && waypoints.map((waypoint) => loadPlacesForWaypoint(waypoint));
    }
  }, [waypoints, radius, isLoaded]); // Dependencies include all waypoints
};

export default NearbyPlaces;
