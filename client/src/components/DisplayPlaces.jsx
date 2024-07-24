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
} from "../features/mapSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AiWindowMain from "./AiWindowMain";
import ThingsToCarry from "./ThingsToCarry";

function DisplayPlaces({ SetDistinctMarker }) {
  // const [uniquePlaces, setUniquePlaces] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMain, setIsOpenMain] = useState(false);
  const [placename, SetPlaceName] = useState("");
  const [location, SetLocation] = useState("");
  const ScrollLink = Scroll.Link;
  const dispatch = useDispatch();
  const [askQuestion, SetAskQuestion] = useState("");
  const [question, setQuestion] = useState();

  const nearbyPlaces = useSelector((state) => {
    console.log(state.nearbyPlaces);
    return state.nearbyPlaces;
  });

  const selectedPlaces = useSelector((state) => {
    return state.selectedList;
  });

  return (
    <>
      <div className="w-full my-8">
        {selectedPlaces.length > 0 && (
          <div className="w-11/12 px-4 py-4 mx-auto my-10 border-2 border-white border-solid lg:w-6/12 rounded-xl bg-[#ffffff]">
            <h1 className="pb-2 flex justify-center lg:text-xl text-[#34333a] font-medium">
              Your Places
            </h1>
            <div className="flex flex-col   text-start text-sm lg:text-lg font-medium text-[#fefce1]  mx-auto gap-2 py-4">
              {selectedPlaces.map((item, index) => {
                return (
                  <div key={index} className="flex justify-between ">
                    <h1 className="text-[#34333a]" key={index}>
                      {item.placeName}
                    </h1>
                    <button
                      className="flex gap-2 justify-center bg-[#e34133] px-2 py-1 text-sm text-[#fefce1] rounded-md h-6 lg:w-auto font-light "
                      onClick={() => {
                        let filtered = selectedPlaces.filter((items) => {
                          return items.placeId !== item.placeId;
                        });
                        dispatch(addnewList(filtered));
                        dispatch(addRemoved(item.placeId));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {isOpenMain && question.type == "suggest" ? (
              <AiWindowMain
                setIsOpenMain={setIsOpenMain}
                selectedPlaces={selectedPlaces}
                question={question.question}
                header={question.header}
              />
            ) : (
              <button
                className="flex justify-center gap-2 px-4 py-1 py-2 mx-auto text-sm bg-[#f6f5fa] rounded-md text-slate-500 hover:bg-[#edecf2] hover:text-slate-600"
                onClick={() => {
                  setQuestion({
                    question: "Which is the good places to visit amoung this ?",
                    type: "suggest",
                    header: "The Places to Visit among the selected",
                  });
                  setIsOpenMain(true);
                }}
              >
                <h1>Suggest me the good places</h1>
                <img className="w-4 text-white" src={svg} alt="" />
              </button>
            )}

            <ThingsToCarry selectedPlaces={selectedPlaces} />
            {isOpenMain && question.type == "ask" ? (
              <AiWindowMain
                setIsOpenMain={setIsOpenMain}
                selectedPlaces={selectedPlaces}
                question={question.question}
                header={question.header}
              />
            ) : (
              <form
                className="flex gap-4 mt-8"
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
                  className="w-full py-2 rounded-md bg-[#f6f5fa] text-[#333239] px-2 text-sm lg:text-base"
                  placeholder="Ask question about above places"
                  onChange={(e) => {
                    SetAskQuestion(e.target.value);
                  }}
                />

                <button className="flex items-center justify-center gap-2 px-6 py-1 mx-auto text-sm text-black bg-green-300 rounded-md">
                  {" "}
                  <h1>Ask</h1>
                  <img className="w-4 text-white" src={svg} alt="" />
                </button>
              </form>
            )}

            {selectedPlaces.map((item) => {
              <h1>{item.location}</h1>;
            })}
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
                <li className="text-xl font-medium text-[#34333a] ">
                  {place.place}
                </li>
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
                  <div className="flex flex-col gap-1 lg:gap-4 lg:flex-row">
                    {" "}
                    <ScrollLink
                      to="footer"
                      offset={-50}
                      smooth={true}
                      duration={500}
                    >
                      <button
                        className=" rounded-md bg-[#1a73e8] text-[#fefce1] px-2 py-1 text-sm w-full"
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
                        Show in above map
                      </button>
                    </ScrollLink>
                    <a
                      // href={`https://www.google.com/maps/place/?q=place_id:${place.data.place_id}`}
                      target="_blank"
                      className="flex flex-row justify-center w-full gap-2 px-2 py-1 text-sm rounded-md bg-[#f6f5fa] text-slate-500 lg:w-auto hover:bg-[#edecf2] hover:text-slate-600"
                      onClick={() => {
                        SetPlaceName(place.place);
                        SetLocation(place.data.vicinity);
                        setIsOpen(true);
                      }}
                    >
                      <button className="">AI Description</button>
                      <img className="w-4 text-white" src={svg} alt="" />
                    </a>{" "}
                    {/* <button
                      className="flex gap-2 justify-center bg-[#e34133] px-2 py-1 text-sm text-[#fefce1] rounded-md w-full lg:w-auto "
                      onClick={async () => {
                        // console.log(place.photo[0].getUrl());
                        console.log(place.data.place_id);
                        console.log(nearbyPlaces);

                        const matchingPlace = await nearbyPlaces.find(
                          (pla) => pla.placeid === place.data.place_id
                        );

                        if (matchingPlace) {
                          const newPlaces = nearbyPlaces.filter(
                            (pla) => pla !== matchingPlace
                          );
                          // setNearbyPlaces(newPlaces);
                        }
                      }}
                    >
                      Remove
                    </button> */}
                    <div className="w-full lg:w-auto">
                      {place.added == true ? (
                        <button className="flex flex-row items-center justify-center gap-2 px-2 py-1 text-sm text-center text-white bg-green-500 rounded-md ">
                          Added ✓
                        </button>
                      ) : (
                        <button
                          className="flex flex-row justify-center  gap-2 px-2 py-1 text-sm rounded-md bg-[#f6f5fa] text-slate-500  hover:bg-[#edecf2] hover:text-slate-600 text-center items-center"
                          onClick={() => {
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
                                })
                              );
                              dispatch(addAdded(place.placeid));
                            } else {
                              alert("Already Selected!");
                            }
                          }}
                        >
                          Add Place +
                        </button>
                      )}
                    </div>
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
      </div>{" "}
    </>
  );
}

export default DisplayPlaces;
