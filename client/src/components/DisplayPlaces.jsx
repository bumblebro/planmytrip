import StarRatings from "react-star-ratings";
import ImageRender from "./ImageRender";
import Scroll from "react-scroll";
import svg from "/src/images/Google_Bard_logo.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AiWindow from "./AiWindow";
import {
  addAdded,
  addList,
  addRemoved,
  addnewList,
  addwaypoint,
} from "../features/mapSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AiWindowMain from "./AiWindowMain";
import ThingsToCarry from "./ThingsToCarry";
import FinalRoute from "./FinalRoute";
import Emergency from "./Emergency";

function DisplayPlaces({ SetDistinctMarker }) {
  // const [uniquePlaces, setUniquePlaces] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMain, setIsOpenMain] = useState(false);
  const [placename, SetPlaceName] = useState("");
  const [location, SetLocation] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [latlng, setLatLng] = useState();
  const [data, setData] = useState();
  const ScrollLink = Scroll.Link;
  const dispatch = useDispatch();
  const [askQuestion, SetAskQuestion] = useState("");
  const [question, setQuestion] = useState();
  const [time1, setTime1] = useState("08:00");
  const [time2, setTime2] = useState("20:00");
  const [showDesc, setShowDesc] = useState(false);
  const [emerWindow, setEmerWindow] = useState(false);

  const nearbyPlaces = useSelector((state) => {
    console.log(state.nearbyPlaces);
    return state.nearbyPlaces;
  });

  const selectedPlaces = useSelector((state) => {
    return state.selectedList;
  });

  const orderedPlaces = useSelector((state) => state.orderedPlaces);

  return (
    <>
      <div className="w-full my-8">
        {selectedPlaces.length > 0 && (
          <div className="w-11/12 px-4 py-4 mx-auto my-10 border-2 border-white border-solid lg:w-6/12 rounded-xl bg-[#ffffff]">
            <h1 className="pb-2 flex justify-center lg:text-xl text-[#34333a] font-medium">
              Your Places
            </h1>
            <div className="flex flex-col   text-start text-sm lg:text-lg font-medium text-[#fefce1]  mx-auto gap-2 py-2 bg-[#f6f5fa] px-2 rounded-lg">
              {selectedPlaces.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <h1 className="text-[#34333a]" key={index}>
                      {item.placeName}
                    </h1>
                    <button
                      className="       lg:w-auto 
                      
                      relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white  focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                      onClick={() => {
                        setShowDesc(false);
                        let filtered = selectedPlaces.filter((items) => {
                          return items.placeId !== item.placeId;
                        });
                        dispatch(addnewList(filtered));
                        dispatch(addRemoved(item.placeId));
                      }}
                    >
                      <span className="relative px-2 py-0.5  transition-all ease-in duration-75 bg-white dark:text-gray-900 rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                        Remove
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
            {isOpenMain && question.type == "ask" ? (
              <AiWindowMain
                setIsOpenMain={setIsOpenMain}
                selectedPlaces={selectedPlaces}
                question={question.question}
                header={question.header}
              />
            ) : (
              <form
                className="flex gap-4 mt-4 "
                onSubmit={() => {
                  setQuestion({
                    question: askQuestion,
                    type: "ask",
                    header: "Answer for your queries",
                  });
                  setIsOpenMain(true);
                }}
              >
                <input
                  type="text"
                  className="w-full py-2 rounded-md bg-[#f6f5fa] text-[#333239] px-2 text-sm border border-solid  border-slate-400 focus:border-blue-600 "
                  placeholder="Ask question about above places"
                  onChange={(e) => {
                    SetAskQuestion(e.target.value);
                  }}
                  required
                />
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-6 py-1 mx-auto text-sm font-medium text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 me-2"
                  onClick={() => {
                    setQuestion({
                      question: askQuestion,
                      type: "ask",
                      header: "Answer for your queries",
                    });
                    setIsOpenMain(true);
                  }}
                >
                  <h1>Ask</h1>{" "}
                  <img className="w-4 text-white" src={svg} alt="" />
                </button>
              </form>
            )}
            {isOpenMain && question.type == "suggest" ? (
              <AiWindowMain
                setIsOpenMain={setIsOpenMain}
                selectedPlaces={selectedPlaces}
                question={question.question}
                header={question.header}
              />
            ) : (
              <button
                className="
               rounded-lg    
               flex  items-center justify-center p-0.5   overflow-hidden text-sm font-medium
                text-gray-900  group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600
                 group-hover:to-blue-500 hover:text-white dark:text-white  focus:outline-none focus:ring-blue-300
                  dark:focus:ring-blue-800 
                  
                    gap-2  mx-auto  mt-4"
                onClick={() => {
                  setQuestion({
                    question: "Which is the good places to visit amoung this ?",
                    type: "suggest",
                    header: "The Places to Visit among the selected",
                  });
                  setIsOpenMain(true);
                }}
              >
                <span className="relative flex items-center w-full gap-2 px-2 py-2 text-gray-900 transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white ">
                  <h1>Suggest me the good places</h1>
                  <img className="w-4 text-white" src={svg} alt="" />
                </span>
              </button>
            )}
            <ThingsToCarry selectedPlaces={selectedPlaces} />

            <div className="px-1 my-4 border border-solid rounded-lg border-slate-400 ">
              <div className="flex justify-around gap-4 py-4 mx-2 md:gap-6 sm:justify-start">
                {" "}
                <div className="flex flex-col items-center justify-around md:items-start">
                  {" "}
                  <h1 className="text-sm font-medium md:text-base">
                    Choose time to plan the Visit
                  </h1>
                  <button
                    className=" 
                        relative inline-flex w-[80%] items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white  focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    onClick={() => {
                      setShowDesc(true);
                    }}
                  >
                    <span className="relative flex items-center justify-center w-full gap-4 px-2 py-1 text-black transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                      <h1 className="">Build Your Trip</h1>
                      <img className="w-4 text-white" src={svg} alt="" />
                    </span>
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 text-sm ">
                  <input
                    className="border border-solid  border-slate-400 rounded-[4px] px-1  "
                    type="time"
                    name=""
                    id=""
                    value={time1}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setShowDesc(false);
                      setTime1(e.target.value);
                    }}
                  />{" "}
                  <h1 className="text-center">To</h1>
                  <input
                    className="border border-solid  border-slate-400 rounded-[4px] px-1 "
                    type="time"
                    name=""
                    id=""
                    value={time2}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setShowDesc(false);
                      setTime2(e.target.value);
                    }}
                  />
                </div>
              </div>
              {showDesc && (
                <FinalRoute
                  selectedPlaces={orderedPlaces}
                  time1={time1}
                  time2={time2}
                />
              )}
            </div>
          </div>
        )}{" "}
        <h2 className="pb-2 pl-8 text-xl font-medium text-[#34333a]">
          Search Results ({nearbyPlaces.length})
        </h2>
        <ul className="grid grid-cols-1 gap-4 mx-4 overflow-scroll overflow-x-hidden h-96 md:grid-cols-2 scrollbar-thin md:h-screen md:gap-3">
          {nearbyPlaces.map((place, index) => (
            <div
              key={index}
              className="flex flex-row items-start justify-between pb-4  px-[4%]  lg:px-[3%] py-4 rounded-md  gap-2 w-full   mx-auto bg-[#ffffff] shadow-md  transition-all duration-10 "
            >
              <div className="flex flex-col justify-center w-full">
                <a
                  href={`https://www.google.com/maps/place/?q=place_id:${place.data.place_id}`}
                  className="text-xl font-medium text-[#34333a] hover:text-blue-800 "
                  target="_blank"
                >
                  {place.place}
                </a>
                {place.data.rating ? (
                  <div className="flex items-center justify-start gap-1">
                    <h1 className="text-sm text-slate-500">
                      {place.data.rating || "0.0"}
                    </h1>
                    <div className="pb-0.5">
                      <StarRatings
                        rating={place.data.rating}
                        starRatedColor="#fbbc04"
                        numberOfStars={5}
                        name="rating"
                        starDimension="15px"
                        starSpacing="1px"
                      />
                    </div>
                    <span className="text-sm text-slate-500">
                      ({place.data.user_ratings_total || 0})
                    </span>{" "}
                  </div>
                ) : (
                  <div className="flex items-center justify-start gap-1">
                    <h1 className="text-sm text-slate-500">No reviews</h1>
                  </div>
                )}

                <h1 className="text-sm text-slate-500">
                  {place.data.vicinity}
                </h1>
                <h2 className="text-sm text-slate-500">
                  {place.data.business_status === "OPERATIONAL" && (
                    <span className="text-green-600">Open</span>
                  )}
                  {place.data.business_status === "CLOSED_TEMPORARILY" && (
                    <span className="text-[#dd3d3d]">Temporarily closed</span>
                  )}
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1 lg:gap-4 lg:flex-row lg:justify-between lg:w-[99%]">
                    {" "}
                    <ScrollLink
                      to="footer"
                      offset={-50}
                      smooth={true}
                      duration={500}
                    >
                      <button
                        className="
                        rounded-lg    
                        relative inline-flex items-center justify-center p-0.5   overflow-hidden text-sm font-medium text-gray-900  group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 "
                        onClick={() => {
                          console.log(place.data.geometry.location.lat());
                          console.log(place.data.place_id);
                          SetDistinctMarker({
                            lat: place.data.geometry.location.lat(),
                            lng: place.data.geometry.location.lng(),
                            place: place.place,
                          });
                        }}
                      >
                        <span className="relative w-full px-2 py-1 text-black transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                          Show in above map
                        </span>
                      </button>
                    </ScrollLink>
                    <button
                      className=" 
                        relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white  focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                      onClick={() => {
                        SetPlaceName(place.place);
                        SetLocation(place.data.vicinity);
                        setPlaceId(place.placeid);
                        setData(place.data);
                        setIsOpen(true);
                      }}
                    >
                      <span className="relative flex items-center justify-around w-full gap-1 px-2 py-1 text-black transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                        <h1 className="">AI Description</h1>
                        <img className="w-4 text-white" src={svg} alt="" />
                      </span>
                    </button>
                    <div className="w-full lg:w-auto">
                      {place.added == true ? (
                        <button
                          className=" 
                                      relative inline-flex items-center justify-center p-0.5  overflow-hidden 
                                      text-sm font-medium  rounded-lg  bg-gradient-to-br from-green-400 to-blue-600 text-white   outline-none "
                        >
                          <span className="relative w-full px-2 py-1 text-white transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white bg-gradient-to-br from-green-400 to-blue-600">
                            Added ✓
                          </span>
                        </button>
                      ) : (
                        <div className="flex justify-between">
                          <button
                            className=" 
                                        relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg  bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white  focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                            onClick={() => {
                              setShowDesc(false);
                              let con = false;
                              selectedPlaces.map((item) => {
                                if (item.placeId == place.placeid) {
                                  con = true;
                                }
                              });
                              if (con == false) {
                                dispatch(
                                  addList({
                                    placeId: place.placeid,
                                    placeName: place.place,
                                    location: place.data.vicinity,
                                    lat: place.lat,
                                    lng: place.lng,
                                    data: place.data,
                                  })
                                );
                                dispatch(addAdded(place.placeid));
                                dispatch(
                                  addwaypoint({
                                    lat: place.lat,
                                    lng: place.lng,
                                  })
                                );
                              } else {
                                alert("Already Selected!");
                              }
                            }}
                          >
                            <span className="relative w-full px-2 py-1 text-black transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              Add Place +
                            </span>
                          </button>
                          <button
                            className=" 
                        relative lg:hidden inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white  focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                            onClick={() => {
                              setLatLng({
                                lat: place.waypoint.lat,
                                lng: place.waypoint.lng,
                              });
                              SetPlaceName(place.place);
                              SetLocation(place.data.vicinity);
                              setPlaceId(place.placeid);
                              console.log(latlng);
                              setData(place.data);
                              setEmerWindow(true);
                            }}
                          >
                            <span className="relative flex items-center justify-around w-full gap-1 px-2 py-1 text-black transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                              <h1 className="">🆘</h1>
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      className=" 
                        relative hidden lg:inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white  focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                      onClick={() => {
                        setLatLng({
                          lat: place.waypoint.lat,
                          lng: place.waypoint.lng,
                        });
                        SetPlaceName(place.place);
                        SetLocation(place.data.vicinity);
                        setPlaceId(place.placeid);
                        console.log(latlng);
                        setData(place.data);
                        setEmerWindow(true);
                      }}
                    >
                      <span className="relative flex items-center justify-around w-full gap-1 px-2 py-1 text-black transition-all duration-75 ease-in bg-white rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                        <h1 className="">🆘</h1>
                      </span>
                    </button>
                  </div>{" "}
                  <div className="sm:hidden">
                    {" "}
                    <ImageRender place={place} />
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex">
                {" "}
                <ImageRender place={place} />
              </div>
            </div>
          ))}
        </ul>{" "}
        {isOpen && (
          <AiWindow
            setIsOpen={setIsOpen}
            placename={placename}
            location={location}
          />
        )}
        {emerWindow && (
          <Emergency
            setEmerWindow={setEmerWindow}
            placename={placename}
            location={location}
            placeid={placeId}
            data={data}
            latlng={latlng}
          />
        )}
      </div>{" "}
    </>
  );
}

export default DisplayPlaces;
