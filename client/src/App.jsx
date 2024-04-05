import NearbyPlace from "./components/NearbyPlace";
import NearbyPlaces from "./components/NearbyPlaces";
import Places from "./components/Places";

function App() {
  return (
    <div>
      <Places />
      {/* <NearbyPlace waypoint={{lat:12.5581, lng:75.3908 }} radius={10000}/> */}
    </div>
  );
}

export default App;
