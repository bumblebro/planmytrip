import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "@reach/combobox/styles.css";
import Direction from "./Direction";
import img1 from "/src/images/location.png";
import { useSelector } from "react-redux";

function DisplayMap({ selected1, selected2, SetKm, distinctMarker }) {
  const nearbyPlaces = useSelector((state) => {
    return state.nearbyPlaces;
  });
  const selectedList = useSelector((state) => {
    return state.selectedList;
  });
  const waypoint = useSelector((state) => {
    return state.nearbyPlaces;
  });

  return (
    <div
      className="w-full overflow-hidden h-96 sm:h-auto rounded-xl"
      id="footer"
    >
      <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
        <Map
          fullscreenControl={false}
          zoomControl={true}
          position={selected1}
          mapTypeId="roadmap"
          mapId="d6266d464c671dbf"
          gestureHandling="greedy"
          zoomAnimationDuration={500}
          zoomEasing="easeInOut"
        >
          <Direction
            selected1={selected1}
            selected2={selected2}
            SetKm={SetKm}
            waypoint={waypoint}
          />
          {distinctMarker ? (
            <Marker
              position={distinctMarker}
              label={{
                text: distinctMarker.place,
                fontSize: "12px",
                color: "black",
                className: "custom-label",
              }}
              title={distinctMarker.place}
              icon={{
                url: img1,
                scaledSize: new window.google.maps.Size(50, 50),
                labelOrigin: new window.google.maps.Point(25, -10),
              }}
            ></Marker>
          ) : (
            nearbyPlaces.map((position, index) => (
              <Marker
                key={index}
                position={position}
                // label={{
                //   text: position.place,
                //   fontSize: "12px",
                //   color: "black",
                //   className: "custom-label",
                // }}
                title={position.place}
                icon={{
                  url: img1,
                  scaledSize: new window.google.maps.Size(30, 30),
                  labelOrigin: new window.google.maps.Point(40, -10),
                }}
                onClick={(e) => {
                  let data = [];
                  nearbyPlaces.map((places) => {
                    if (e.latLng.lat() !== places.lat) {
                      data.push(places);
                    }
                  });
                  console.log(nearbyPlaces);
                }}
              ></Marker>
            ))
          )}
          {selectedList.map((position, index) => (
            <Marker
              key={index}
              position={position}
              label={{
                text: position.placeName,
                fontSize: "10px",
                color: "black",
                className: "custom-label",
              }}
              title={position.placeName}
              icon={{
                url: img1,
                scaledSize: new window.google.maps.Size(30, 30),
                labelOrigin: new window.google.maps.Point(10, -10),
              }}
            ></Marker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}

export default DisplayMap;
