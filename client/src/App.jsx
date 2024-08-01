import { useState } from "react";
import NavBar from "./components/NavBar";
import Places from "./components/Places";
import Footer from "./components/Footer";
import TagLineBody from "./components/TagLineBody";
import ImageDesc from "./components/ImageDesc";
import { useSelector } from "react-redux";

function App() {
  const imgsearch = useSelector((state) => state.searchImage);

  return (
    <div className="flex flex-col justify-between h-[100vh]">
      <NavBar />
      {imgsearch == true ? <ImageDesc /> : <Places />}
      <Footer />
    </div>
  );
}

export default App;
