"use client";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPositions } from "../features/mapSlice";

function Direction({ selected1, selected2, SetKm }) {
  const dispatch = useDispatch();
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  const waypoint = useSelector((state) => state.selectedList);

  useEffect(() => {
    if (!routesLibrary || !map) return;

    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer({ map });

    setDirectionsService(service);
    setDirectionsRenderer(renderer);

    return () => {
      renderer.setMap(null);
    };
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    // const waypoints = waypoint.map((point) => ({
    //   location: { lat: point.lat, lng: point.lng },
    //   stopover: true,
    // }));

    directionsService
      .route({
        origin: selected1,
        destination: selected2,
        // waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);

        const newWaypoints = response.routes[0].legs[0].steps.map(
          (step) => step.end_location
        );
        dispatch(addPositions(newWaypoints));
        SetKm(response.routes[0].legs[0].distance.value);
      })
      .catch((error) => {
        console.error("Error fetching directions:", error);
      });
  }, [
    directionsService,
    directionsRenderer,
    waypoint,
    selected1,
    selected2,
    dispatch,
    SetKm,
  ]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    // Your JSX for rendering directions or other components
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Direction;
