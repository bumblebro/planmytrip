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
  const waypoints = [];

  const waypoint = useSelector((state) => {
    return state.waypoint;
  });

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    console.log({ selected1, selected2, SetKm, waypoint });
  }, [routesLibrary, map, waypoint]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: selected1,
        destination: selected2,
        waypoints: waypoint,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);

        response.routes[0].legs[0].steps.forEach((step) => {
          waypoints.push(step.end_location);
        });
        console.log(waypoints);
        dispatch(addPositions(waypoints));
        console.log("waypoint:", waypoints);
        SetKm(response.routes[0].legs[0].distance.value);
        console.log(response.routes[0].legs[0].distance.value);

        // console.log(selected);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
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
