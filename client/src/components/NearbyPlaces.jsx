import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"]; // Include the Places library

const NearbyPlaces = ({ waypoints, radius, setNearbyPlaces }) => {
  // State to store all tourist places for multiple waypoints
  const [touristPlaces, setTouristPlaces] = useState([]);
  const apiKey = "AIzaSyD_xecbv6K1U2uuCNfvwWhq_svY3PgP5Bs"; // Replace with your Google Maps API key

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
      type: ["tourist_attraction"], // Change type for different categories
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // console.log(results);
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
          })),
        ]);
      }
    });
  };

  useEffect(() => {
    // Call loadPlacesForWaypoint for each waypoint
    waypoints.map((waypoint) => loadPlacesForWaypoint(waypoint));
  }, [waypoints, radius, isLoaded]); // Dependencies include all waypoints

  return (
    <></>
    // <div>
    //   <h2>Tourist Places Nearby:</h2>
    //   <ul>
    //     {touristPlaces.map((place) => (
    //       <li key={place.lat}>
    //         {/* Include waypoint information in the display */}
    //         {place.place} ({place.waypoint.lat}, {place.waypoint.lng})
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default NearbyPlaces;
