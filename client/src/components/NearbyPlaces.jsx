import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { addHotel, addPlace, addPositions } from "../features/mapSlice";

const libraries = ["places"]; // Include the Places library

const NearbyPlaces = ({ searchType }) => {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_API_KEY; // Replace with your Google Maps API key

  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [nearbyHotels, setNearbyHotels] = useState([]);

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

  const loadHotelsForWaypoint = (waypoint) => {
    if (!isLoaded) return; // Skip if Google Maps API is not loaded

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      location: waypoint,
      radius: radius,
      type: "restaurant", // Change type for different categories
    };

    service.nearbySearch(request, async (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setNearbyHotels((prevPlaces) => [
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

        console.log(nearbyHotels);
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
    const uniquelist = nearbyHotels.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.placeid === obj.placeid)
    );
    dispatch(addHotel(uniquelist));
  }, [nearbyHotels]);

  useEffect(() => {
    {
      waypoints &&
        waypoints.map((waypoint) => {
          loadPlacesForWaypoint(waypoint);
          loadHotelsForWaypoint(waypoint);
        });
    }
  }, [waypoints, radius, isLoaded]); // Dependencies include all waypoints
};

export default NearbyPlaces;
