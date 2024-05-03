import { useState } from "react";
import NavBar from "./components/NavBar";
import Places from "./components/Places";

function App() {
  return (
    <div>
      <NavBar />
     
      <Places />
      {/* <NearbyPlace waypoint={{lat:12.5581, lng:75.3908 }} radius={10000}/> */}
    </div>
  );
}

export default App;
