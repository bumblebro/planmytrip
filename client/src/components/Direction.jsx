"use client";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPositions, addlink, addorderedPlaces } from "../features/mapSlice";

function Direction({ selected1, selected2, SetKm }) {
  const dispatch = useDispatch();
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [first, setFirst] = useState(true);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  const [reWayPoint, setreWayPoint] = useState([]);

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

  function createGoogleMapsLinkLatLng(selected1, selected2, reWayPoint) {
    const waypointsString = reWayPoint
      .map((waypoint) => `${waypoint.lat},${waypoint.lng}`)
      .join("/");
    const url = `https://www.google.com/maps/dir/${selected1.lat},${selected1.lng}/${waypointsString}/${selected2.lat},${selected2.lng}`;
    return url;
  }

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    const waypoints = waypoint.map((point) => ({
      location: { lat: point.lat, lng: point.lng },
      stopover: true,
    }));

    directionsService
      .route({
        origin: selected1,
        destination: selected2,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);

        const newWaypoints = response.routes[0].legs[0].steps.map((step) => {
          console.log(step.end_location);
          return step.end_location;
        });
        if (first == true) {
          dispatch(addPositions(newWaypoints));
          setFirst(false);
        }
        SetKm(response.routes[0].legs[0].distance.value);
        console.log("Routes", response.routes[0].waypoint_order);
        const reorderedWaypoints = response.routes[0].waypoint_order.map(
          (index) => waypoint[index]
        );
        setreWayPoint(reorderedWaypoints);
        // Now you have the reordered waypoints in the reorderedWaypoints array
        console.log(reorderedWaypoints);
        dispatch(addorderedPlaces(reorderedWaypoints));
        console.log(
          createGoogleMapsLinkLatLng(selected1, selected2, reWayPoint)
        );
        dispatch(
          addlink(createGoogleMapsLinkLatLng(selected1, selected2, reWayPoint))
        );
      })
      .catch((error) => {
        console.error("Error fetching directions:", error);
      });
  }, [
    directionsService,
    directionsRenderer,
    selected1,
    selected2,
    dispatch,
    SetKm,
    waypoint,
  ]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    // Your JSX for rendering directions or other components
    // <div className="directions">
    //   <h2>{selected.summary}</h2>
    //   <p>
    //     {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
    //   </p>
    //   <p>Distance: {leg.distance?.text}</p>
    //   <p>Duration: {leg.duration?.text}</p>

    //   <h2>Other Routes</h2>
    //   <ul>
    //     {routes.map((route, index) => (
    //       <li key={index}>
    //         <button onClick={() => setRouteIndex(index)}>
    //           {route.summary}
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <></>
  );
}

export default Direction;
