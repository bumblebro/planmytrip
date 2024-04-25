import { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"]; // Include the Places library

const NearbyPlace = ({ waypoint, radius }) => {
  const [touristPlaces, setTouristPlaces] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY; // Replace with your Google Maps API key

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const center = { lat: waypoint.lat, lng: waypoint.lng };

  const loadPlaces = () => {
    if (!isLoaded) return; // Skip if Google Maps API is not loaded

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      location: center,
      radius: radius,
      type: ["tourist_attraction"], // Change type for different categories
    };
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        setTouristPlaces(
          results.map((place) => {
            return {
              place: place.name,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
          })
        );
      }
    });
  };

  useEffect(() => {
    loadPlaces();
  }, [waypoint, radius, isLoaded]); // Add isLoaded as a dependency

  return (
    <div>
      <h2>Tourist Places Nearby:</h2>
      <ul>
        {touristPlaces.map((place, index) => (
          <li key={index}>
            {place.place} {place.lat} {place.lng}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default NearbyPlace;
