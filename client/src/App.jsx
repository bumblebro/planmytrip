import { useState } from "react";
import NavBar from "./components/NavBar";
import Places from "./components/Places";
import Footer from "./components/Footer";
import TagLineBody from "./components/TagLineBody";

function App() {
  return (
    <div className="flex flex-col justify-between h-[100vh]">
      <NavBar />
      {/* <TagLineBody /> */}
      <Places />
      {/* <NearbyPlace waypoint={{lat:12.5581, lng:75.3908 }} radius={10000}/> */}
      <Footer />
    </div>
  );
}

export default App;
