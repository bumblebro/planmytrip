import { useState } from "react";
import NavBar from "./components/NavBar";
import Places from "./components/Places";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [link, setLink] = useState(null);

  return (
    <div>
      <NavBar />
      <Places setLink={setLink} setIsOpen={setIsOpen} />
      {/* <NearbyPlace waypoint={{lat:12.5581, lng:75.3908 }} radius={10000}/> */}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <iframe src={props.link} title="External Webpage" />
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
