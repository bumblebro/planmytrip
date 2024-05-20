import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { addPlace, addPositions } from "../features/mapSlice";

const libraries = ["places"]; // Include the Places library

const NearbyPlaces = ({ searchType }) => {
  // State to store all tourist places for multiple waypoints
  const dispatch = useDispatch();
  const waypoints = useSelector((state) => {
    console.log(state.positions);
    return state.positions;
  });

  const radius = useSelector((state) => {
    return state.radius;
  });

  const [touristPlaces, setTouristPlaces] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY; // Replace with your Google Maps API key

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
        // Update touristPlaces with results for this waypoint
        setTouristPlaces((prevPlaces) => [
          ...prevPlaces,
          ...results.map((place) => ({
            place: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            waypoint, // Add waypoint information for clarity
          })),
        ]);
        setNearbyPlaces((prevPlaces) => [
          ...prevPlaces,
          ...results.map((place) => ({
            data: place,
            place: place.name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            waypoint, // Add waypoint information for clarity
            photo: place.photos,
            placeid: place.place_id,
          })),
        ]);
        console.log(nearbyPlaces);
        console.log(touristPlaces);
      }
    });
  };

  useEffect(() => {
    dispatch(addPlace(nearbyPlaces));
  }, [nearbyPlaces]);

  useEffect(() => {
    {
      waypoints && waypoints.map((waypoint) => loadPlacesForWaypoint(waypoint));
    }
  }, [waypoints, radius, isLoaded]); // Dependencies include all waypoints
};

export default NearbyPlaces;
