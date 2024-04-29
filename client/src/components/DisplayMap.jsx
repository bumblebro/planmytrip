import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "@reach/combobox/styles.css";
import Direction from "./Direction";
import img from "/src/images/image.png";
import img1 from "/src/images/location.png";

function DisplayMap({
  nearbyPlaces,
  selected1,
  selected2,
  setPositions,
  SetKm,
  setNearbyPlaces,
  distinctMarker,
}) {
  return (
    <div className="w-full" id="footer">
      <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
        <Map
          fullscreenControl={false}
          zoomControl={true}
          // {{distinctMarker& zoom={30}}}
          position={selected1}
          // mapTypeId="hybrid"
          // mapId="8e0a97af9386fef"
        >
          <Direction
            selected1={selected1}
            selected2={selected2}
            setPositions={setPositions}
            SetKm={SetKm}
          />
          {distinctMarker ? (
            <Marker
              position={distinctMarker}
              label={{
                text: distinctMarker.place,
                fontSize: new window.google.maps.Size(40, 40),
                color: "red",
              }}
              title={distinctMarker.place}
              icon={{
                url: img1,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            ></Marker>
          ) : (
            nearbyPlaces.map((position, index) => (
              <Marker
                key={index}
                position={position}
                // label={{
                //   text: "hdddd efvdcds vreve",
                //   fontSize: `${new window.google.maps.Size(20, 20)}`,
                //   color: "black",
                // }}
                title={position.place}
                icon={{
                  url: img1,
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
                onClick={(e) => {
                  let data = [];
                  nearbyPlaces.map((places) => {
                    if (e.latLng.lat() !== places.lat) {
                      data.push(places);
                    }
                  });
                  setNearbyPlaces(data);
                  console.log(nearbyPlaces);
                }}
              ></Marker>
            ))
          )}
        </Map>
      </APIProvider>
    </div>
  );
}

export default DisplayMap;
