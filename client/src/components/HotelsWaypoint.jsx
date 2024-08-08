// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addorderedHotelPlaces } from "../features/mapSlice";
// import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
// import { useState } from "react";

// function HotelsWaypoint() {
//   const dispatch = useDispatch();
//   const routesLibrary = useMapsLibrary("routes");
//   const [directionsService, setDirectionsService] = useState();

//   const origin = useSelector((state) => state.selected1);
//   const destination = useSelector((state) => state.selected2);
//   const waypoints = useSelector((state) => state.nearbyHotels);
//   const service = new routesLibrary.directionsService();
//   setDirectionsService(service);

//   useEffect(() => {
//     if (!directionsService) return;
//     console.log("**********************************");
//     const directionsService = new google.maps.directionsService();
//     const request = {
//       origin: origin, // Starting point
//       destination: destination, // End point
//       waypoints: waypoints, // Array of waypoints
//       optimizeWaypoints: true, // This will optimize the order of waypoints
//       travelMode: google.maps.TravelMode.DRIVING,
//     };

//     directionsService.route(request, (result, status) => {
//       if (status == "OK") {
//         // Handle the optimized route
//         console.log(result.routes[0].waypoint_order); // This gives the order of waypoints
//         dispatch(addorderedHotelPlaces(result.routes[0].waypoint_order));
//         // dispatch(addorderedHotelPlaces(1));
//       }
//     });
//   }, [waypoints, directionsService]);

//   return <div></div>;
// }

// export default HotelsWaypoint;
